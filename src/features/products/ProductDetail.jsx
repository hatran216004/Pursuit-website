import styles from './ProductDetail.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import { getProductsSimilar } from '../../services/apiProduct';
import { useUser } from '../Auth/useUser';
import useProduct from './useProduct';
import Spinner from '../../ui/Spinner';
import InputNumber from '../../ui/InputNumber';
import Button from '../../ui/Button';
import TextExpander from '../../ui/TextExpander';
import Review from './Review';
import ReviewCardList from './ReviewCardList';
import Product from './Product';
import toast from 'react-hot-toast';
import useCreateCart from '../cart/useCreateCart';
import SpinnerMini from '../../ui/SpinnerMini';
import { formatCurrency } from '../../utils/helper';

const cx = classNames.bind(styles);

function ProductDetail() {
  const { product = {}, isLoading } = useProduct();
  const { user } = useUser();
  const { createCart, isCreating } = useCreateCart();

  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectSize, setSelectSize] = useState('L');

  const { data: productSimilar } = useQuery({
    queryKey: ['product-similar', product?.id],
    queryFn: () => getProductsSimilar(product?.category?.id),
    enabled: Boolean(product)
  });

  if (isLoading)
    return (
      <div className="loading-screen">
        <Spinner />
      </div>
    );

  const {
    name,
    description,
    regularPrice,
    discountPrice,
    images,
    category,
    // ratingAverage,
    size,
    stock,
    id: productId
  } = product;

  function handleQuantityChange(value) {
    if (value > stock) setQuantity(stock);
    else setQuantity(Number(value));
  }

  function handleQuantity(type) {
    if (type === 'increase') {
      if (quantity >= stock) return;
      setQuantity((qty) => qty + 1);
    }
    if (type === 'decrease') {
      if (quantity <= 1) return;
      setQuantity((qty) => qty - 1);
    }
  }

  function handleAddToCart() {
    if (!user) {
      toast.error('Please login to purchase');
      return;
    }

    const cartData = {
      user_id: user.id,
      productId,
      quantity,
      size: selectSize
    };

    createCart(cartData, {
      onSuccess: () => {
        setQuantity(1);
      }
    });
  }

  return (
    <div className={cx('wrapper')}>
      <div className="container">
        <div className="row">
          <div className="col col-5">
            <div>
              <div className={cx('image-wrapper')}>
                <Swiper
                  loop={true}
                  navigation={true}
                  modules={[Navigation, Thumbs]}
                  grabCursor={true}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className={cx('image-inner')}>
                        <img src={image} alt="" className={cx('image')} />
                      </div>
                    </SwiperSlide>
                  ))}
                  <SliderNavigation />
                </Swiper>
              </div>
              <div className={cx('image-thumbs')}>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={8}
                  slidesPerView={images?.length}
                  loop={true}
                  navigation={true}
                  modules={[Navigation, Thumbs]}
                  grabCursor={true}
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt=""
                        className={cx('image-thumb', {
                          active: activeIndex === index
                        })}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col col-6 offset-1">
            <div className={cx('info')}>
              <h4 className={cx('category')}>
                {category.name.split('-').join(' ')}
              </h4>
              <h1 className={cx('name')}>{name}</h1>
              <div className={cx('row')}>
                <span
                  className={cx('', {
                    'with-discount': discountPrice,
                    'no-discount': !discountPrice
                  })}
                >
                  {formatCurrency(regularPrice)}đ
                </span>
                {!!discountPrice && (
                  <span className={cx('exstra-price')}>
                    {formatCurrency(regularPrice - discountPrice)}đ
                  </span>
                )}
              </div>
              <div className={cx('row')}>
                <div className={cx('rating-star')}>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <MdOutlineStarPurple500 color="#FFD44D" key={index} />
                    ))}
                </div>
                <span>(3 Customer reviews)</span>
              </div>
              <div className={cx('row')}>
                <span className={cx('label')}>Stock:</span>
                <span className={cx('label')}>{stock}</span>
              </div>
              {!stock ? (
                <p className={cx('out-stock')}>Out of stock</p>
              ) : (
                <>
                  {size && (
                    <div className={cx('row')}>
                      <span className={cx('label')}>Size:</span>
                      <div className={cx('options-list')}>
                        {size.split(', ').map((ele) => (
                          <button
                            key={ele}
                            className={cx('options-item', {
                              active: ele === selectSize
                            })}
                            onClick={() => setSelectSize(ele)}
                          >
                            {ele}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className={cx('row')}>
                    <span className={cx('label')}>Quantity:</span>
                    <div className={cx('options-list')}>
                      <button
                        className={cx('options-item')}
                        onClick={() => handleQuantity('decrease')}
                      >
                        <FaMinus />
                      </button>
                      <InputNumber
                        onChange={handleQuantityChange}
                        value={quantity}
                      />
                      <button
                        className={cx('options-item')}
                        onClick={() => handleQuantity('increase')}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className={cx('description')}>
                    <span className={cx('label')}>Description:</span>
                    <TextExpander>{description}</TextExpander>
                  </div>
                  <div className={cx('purchase')}>
                    <Button className="w-full" onClick={handleAddToCart}>
                      {isCreating ? <SpinnerMini /> : 'Add to cart'}
                    </Button>
                    <Button className="w-full">Check out</Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Review />
        <ReviewCardList />
        <div className={cx('similar')}>
          <h4 className={cx('similar-heading')}>Similar products</h4>
          <p className={cx('similar-desc')}>
            Browse our most popular products and make your day more beautiful
            and glorious.
          </p>
          {productSimilar && (
            <div className="row row-cols-4">
              {productSimilar.map((product) => {
                return <Product product={product} key={product.id} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <div className={cx('btn-slide')}>
      <button onClick={() => swiper.slidePrev()}>
        <GrPrevious className={cx('icon')} />
      </button>
      <button onClick={() => swiper.slideNext()}>
        <GrNext className={cx('icon')} />
      </button>
    </div>
  );
}

export default ProductDetail;
