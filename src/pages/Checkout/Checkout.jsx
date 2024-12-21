import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import toast from 'react-hot-toast';
import styles from './Checkout.module.scss';
import classNames from 'classnames/bind';

import { schema } from '../../utils/rules';
import { useUser } from '../../features/Auth/useUser';
import {
  createSignature,
  fetchCities,
  fetchDistricts,
  fetchWards,
  formatCurrency
} from '../../utils/helper';
import { useCart } from '../../features/cart/useCart';
import { createPaymentLink, updatePayment } from '../../services/apiPayment';
import { useCreatePayment } from '../../features/payment/useCreatePayment';
import { useCreateOrder } from '../../features/order/useCreateOrder';
import { useDeleteCart } from '../../features/cart/useDeleteCart';
import { updateStockAfterOrder } from '../../services/apiProduct';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectStyles } from '../../ui/Sortby/Sortby';
import { updateOrder } from '../../services/apiOrder';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

const cx = classNames.bind(styles);
const cancelUrl = 'https://pursuit-website.vercel.app/checkout';
const returnUrl = 'https://pursuit-website.vercel.app/thankyou';
const checkOutSchema = schema.pick([
  'email',
  'address',
  'city',
  'district',
  'ward',
  'phone'
]);

function Checkout() {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const { user } = useUser();
  const { cart } = useCart();
  const { createPayment } = useCreatePayment();
  const { createOrder, isLoading } = useCreateOrder();
  const { deleteCart } = useDeleteCart();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const cancel = searchParams.get('cancel'); // true
  const cancelStatus = searchParams.get('status');
  const orderIdCancel = searchParams.get('orderId');
  const paymentLinkId = searchParams.get('id');

  const { data: cities } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCities
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(checkOutSchema),
    defaultValues: {
      email: user?.email,
      address: user?.user_metadata?.address
    }
  });

  useEffect(() => {
    if (cancel && cancelStatus === 'CANCELLED') {
      updatePayment({
        orderId: orderIdCancel,
        paymentLinkId,
        status: 'cancelled'
      });
      updateOrder({ orderId: orderIdCancel, status: 'cancelled' });
    }
  }, [cancel, cancelStatus, orderIdCancel, paymentLinkId]);

  const originalPrice = cart?.reduce(
    (result, curr) => (result += curr.productId.regularPrice * curr.quantity),
    0
  );

  const savingsPrice = cart?.reduce(
    (result, curr) => (result += curr.productId.discountPrice * curr.quantity),
    0
  );

  const amount = originalPrice - savingsPrice;

  async function handleSelect(option, field, value) {
    try {
      if (value === 'city') {
        const data = await fetchDistricts(option.value);
        setDistricts(data.districts);
      }
      if (value === 'district') {
        const data = await fetchWards(option.value);
        setWards(data.wards);
      }
      field.onChange(option);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createPaymentLinkHandle(orderId) {
    try {
      createPayment(
        {
          orderId,
          amount,
          status: 'pending',
          user_id: user.id
        },
        {
          onSuccess: async ([data]) => {
            const paymentInfo = {
              orderCode: data.id + 200,
              amount,
              description: `Thanh toán đơn hàng ${data.id + 200}`,
              cancelUrl: `${cancelUrl}?orderId=${orderId}`,
              returnUrl: `${returnUrl}?orderId=${orderId}`
            };
            const body = {
              ...paymentInfo,
              signature: createSignature(
                paymentInfo,
                import.meta.env.VITE_CHECKSUM_KEY
              )
            };
            const res = await createPaymentLink(body);
            window.location.href = res.data.checkoutUrl;
          }
        }
      );
    } catch (error) {
      toast.error('Có lỗi xảy ra');
    }
  }

  function onSubmit(data) {
    const dataOrder = {
      status: 'pending',
      user_id: user.id,
      address: `${data.address} ${data.ward.label} ${data.district.label} ${data.city.label}`,
      amount,
      note: data.note
    };

    if (data.paymentMethod === 'online') {
      createOrder(dataOrder, {
        onSuccess: ([data]) => {
          createPaymentLinkHandle(data.id);
        }
      });
    } else {
      createOrder(dataOrder, {
        onSuccess: async () => {
          toast.success('Order successfully');
          await updateStockAfterOrder(user.id);
          deleteCart(user.id);
          navigate('/thankyou');
        }
      });
    }
  }

  return (
    <div className="container">
      <div className={cx('checkout-wrapper')}>
        <div className="row">
          <div className="col-5">
            <div>
              <h4 className={cx('checkout-heading')}>Billing details</h4>
              <form className={cx('checkout-form')}>
                <Input
                  error={errors?.email?.message}
                  register={register}
                  label="Email"
                  name="email"
                  placeholder="Your email address"
                  labelClass={cx('checkout-form-label')}
                  formInputClass={cx('checkout-form-input')}
                />
                <Input
                  error={errors?.address?.message}
                  register={register}
                  label="Your address"
                  name="address"
                  placeholder="Address"
                  labelClass={cx('checkout-form-label')}
                  formInputClass={cx('checkout-form-input')}
                />
                <Input
                  error={errors?.name?.message}
                  register={register}
                  label="Your name"
                  name="name"
                  placeholder="Full name"
                  labelClass={cx('checkout-form-label')}
                  formInputClass={cx('checkout-form-input')}
                />
                <Input
                  error={errors?.phone?.message}
                  register={register}
                  label="Phone number"
                  name="phone"
                  placeholder="Your phone number"
                  labelClass={cx('checkout-form-label')}
                  formInputClass={cx('checkout-form-input')}
                />
                <div className={cx('checkout-form-group')}>
                  <label htmlFor="" className={cx('checkout-form-label')}>
                    City
                  </label>
                  <div>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <div className={cx('select-wrapper')}>
                          <Select
                            styles={selectStyles}
                            placeholder="City"
                            className={cx('checkout-form-select')}
                            options={cities?.map((item) => ({
                              value: item.code,
                              label: item.name
                            }))}
                            {...field}
                            onChange={(option) =>
                              handleSelect(option, field, 'city')
                            }
                          />
                          {errors && (
                            <span className={cx('select-error')}>
                              {errors?.city?.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className={cx('checkout-form-group')}>
                  <label htmlFor="" className={cx('checkout-form-label')}>
                    District & Ward
                  </label>
                  <div>
                    <Controller
                      name="district"
                      control={control}
                      render={({ field }) => (
                        <div className={cx('select-wrapper')}>
                          <Select
                            styles={selectStyles}
                            {...field}
                            onChange={(option) =>
                              handleSelect(option, field, 'district')
                            }
                            placeholder="District"
                            className={cx('checkout-form-select')}
                            options={districts?.map((item) => ({
                              value: item.code,
                              label: item.name
                            }))}
                          />
                          {errors && (
                            <span className={cx('select-error')}>
                              {errors?.city?.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                    <Controller
                      name="ward"
                      control={control}
                      render={({ field }) => (
                        <div className={cx('select-wrapper')}>
                          <Select
                            styles={selectStyles}
                            {...field}
                            onChange={(option) =>
                              handleSelect(option, field, 'ward')
                            }
                            placeholder="Ward"
                            className={cx('checkout-form-select')}
                            options={wards?.map((item) => ({
                              value: item.code,
                              label: item.name
                            }))}
                          />
                          {errors && (
                            <span className={cx('select-error')}>
                              {errors?.city?.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className={cx('checkout-form-group')}>
                  <label htmlFor="" className={cx('checkout-form-label')}>
                    Order note (optional)
                  </label>
                  <textarea
                    {...register('note')}
                    placeholder="Tell us what do you think"
                  ></textarea>
                </div>
              </form>
            </div>
          </div>

          <div className="col-5 offset-2">
            <h4 className={cx('checkout-heading')}>Your order</h4>
            <div className={cx('cart-order')}>
              <div className={cx('cart-order-row')}>
                <span>Original Price</span>
                <span>{formatCurrency(originalPrice)}đ</span>
              </div>
              <div className={cx('cart-order-row')}>
                <span>Savings</span>
                <span>{formatCurrency(savingsPrice)}đ</span>
              </div>
              <div className={cx('cart-order-row')}>
                <span>Shipping</span>
                <span>FREE</span>
              </div>
            </div>
            <div className={cx('cart-order-bottom')}>
              <span>Total</span>
              <span>{formatCurrency(amount)}đ</span>
            </div>
            <div className={cx('checkout-methods')}>
              <h5>Payment method</h5>
              <div>
                <div className={cx('checkout-methods-group')}>
                  <label htmlFor="online">Online</label>
                  <input
                    defaultChecked
                    id="online"
                    type="radio"
                    {...register('paymentMethod')}
                    value="online"
                  />
                </div>
                <div className={cx('checkout-methods-group')}>
                  <label htmlFor="cod">COD</label>
                  <input
                    id="cod"
                    type="radio"
                    {...register('paymentMethod')}
                    value="cod"
                  />
                </div>
              </div>
            </div>
            <Button
              className={cx('cart-order-btn')}
              secondary
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? <SpinnerMini /> : 'Place order'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
