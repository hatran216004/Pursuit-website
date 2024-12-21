import { supabaseUrl } from '../services/supabase';

const imageUrl = `${supabaseUrl}/storage/v1/object/public/products/`;

export const products = [
  {
    name: 'Mid Century Modern T-Shirt',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 110,
    discountPrice: 0,
    stock: 10,
    size: 'L, XL, XXL',
    categoryId: 1,
    ratingAverage: 4.8,
    image: imageUrl + 'product-1.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Mid Century Modern T-Shirt',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 139,
    discountPrice: 0,
    stock: 20,
    size: 'L, XL, XXL',
    categoryId: 1,
    ratingAverage: 4.2,
    image: imageUrl + 'product-2.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Corporate Office Shoes',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 399,
    discountPrice: 0,
    stock: 30,
    size: 'L, XL, XXL',
    categoryId: 1,
    ratingAverage: 4.8,
    image: imageUrl + 'product-3.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Modern Black T-Shirt',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 59,
    discountPrice: 0,
    stock: 0,
    size: 'L, XL, XXL',
    categoryId: 1,
    ratingAverage: 5,
    image: imageUrl + 'product-4.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Modern Stylish Shoes',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 199,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 2,
    ratingAverage: 4.8,
    image: imageUrl + 'product-5.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Women Hand Bags',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 123,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 2,
    ratingAverage: 4.8,
    image: imageUrl + 'product-6.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Apple Watch Series 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 110,
    discountPrice: 0,
    stock: 100,
    size: null,
    categoryId: 3,
    ratingAverage: 4.8,
    image: imageUrl + 'product-7.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Modern Headphones',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 180,
    discountPrice: 90,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 3,
    ratingAverage: 4.8,
    image: imageUrl + 'product-8.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Modern Purse Bag',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 210,
    discountPrice: 105,
    stock: 30,
    size: 'L, XL, XXL',
    categoryId: 2,
    ratingAverage: 4.8,
    image: imageUrl + 'product-9.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'iPhone 14 Max Pro',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 500,
    discountPrice: 0,
    stock: 100,
    size: null,
    categoryId: 3,
    ratingAverage: 4.8,
    image: imageUrl + 'product-10.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Alarm Clock',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 150,
    discountPrice: 0,
    stock: 100,
    size: null,
    categoryId: 3,
    ratingAverage: 4.8,
    image: imageUrl + 'product-11.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Apple Watch Series 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 110,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 3,
    ratingAverage: 4.8,
    image: imageUrl + 'product-12.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Normal Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 210,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 3,
    ratingAverage: 4.8,
    image: imageUrl + 'product-13.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Headphone',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 450,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 3,
    ratingAverage: 4.8,
    image: imageUrl + 'product-14.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Apple Watch Series 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 110,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 3,
    ratingAverage: 4.8,
    image: imageUrl + 'product-15.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Modern Fashion Shoes',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 500,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 3,
    ratingAverage: 4.8,
    image: imageUrl + 'product-16.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Alarm Clock',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 150,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 1,
    ratingAverage: 4.8,
    image: imageUrl + 'product-17.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Mid Century Modern Shirt',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 110,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 2,
    ratingAverage: 4.8,
    image: imageUrl + 'product-18.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Mid Century Modern T-Shirt',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 520,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 2,
    ratingAverage: 4.8,
    image: imageUrl + 'product-19.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Modern Shoes',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 420,
    discountPrice: 0,
    stock: 100,
    size: 'L, XL, XXL',
    categoryId: 1,
    ratingAverage: 4.8,
    image: imageUrl + 'product-20.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  },
  {
    name: 'Mid Century Modern T-Shirt',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do.',
    regularPrice: 120,
    discountPrice: 0,
    stock: 0,
    size: 'L, XL, XXL',
    categoryId: 2,
    ratingAverage: 4.8,
    image: imageUrl + 'product-21.png',
    images: [
      imageUrl + 'product-22-thumnail-1.svg',
      imageUrl + 'product-22-thumnail-2.svg',
      imageUrl + 'product-22-thumnail-3.svg',
      imageUrl + 'product-22-thumnail-4.svg'
    ]
  }
];
