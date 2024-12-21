import * as yup from 'yup';

function testPriceMinMax() {
  const { price_min, price_max } = this.parent;

  // Cả hai đều không rỗng
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min);
  }

  // Ít nhất một phải tồn tại
  return price_min !== '' || price_max !== '';
}

export const schema = yup.object({
  email: yup
    .string()
    .required('This field is required')
    .email('Must be a valid email'),
  password: yup
    .string()
    .required('This field is required')
    .min(8, 'Must be at least 8 characters long'),
  confirm_password: yup
    .string()
    .required('This field is required')
    .min(8, 'Must be at least 8 characters long')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  username: yup.string().required('This field is required'),
  phone: yup.string().required('This field is required'),
  address: yup.string().required('This field is required'),
  city: yup.object().required('This field is required'),
  ward: yup.object().required('This field is required'),
  district: yup.object().required('This field is required'),
  price_min: yup.string().ensure().test({
    name: 'price-not-allowed',
    message: 'Price min must be less than price max',
    test: testPriceMinMax
  }),
  price_max: yup.string().ensure().test({
    name: 'price-not-allowed',
    message: 'Price max must be greater than price min',
    test: testPriceMinMax
  }),
  searchValue: yup.string().required('This field is required').trim()
});
