import CryptoJS from 'crypto-js';

export function cutStringUntil(char, str) {
  return str.split(char)[0];
}
export async function fetchCities() {
  const res = await fetch(`https://provinces.open-api.vn/api/p`);
  const data = await res.json();
  return data;
}

export async function fetchDistricts(provinceCode) {
  const res = await fetch(
    `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
  );
  const data = await res.json();
  return data;
}

export async function fetchWards(districtCode) {
  const res = await fetch(
    `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
  );
  const data = await res.json();
  return data;
}

export const formatCurrency = (currency) => {
  return new Intl.NumberFormat('de-DE').format(currency);
};

function sortObjDataByKey(object) {
  const orderedObject = Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
  return orderedObject;
}

function convertObjToQueryStr(object) {
  return Object.keys(object)
    .filter((key) => object[key] !== undefined)
    .map((key) => {
      let value = object[key];
      // Sort nested object
      if (value && Array.isArray(value)) {
        value = JSON.stringify(value.map((val) => sortObjDataByKey(val)));
      }
      // Set empty string if null
      if ([null, undefined, 'undefined', 'null'].includes(value)) {
        value = '';
      }

      return `${key}=${value}`;
    })
    .sort()
    .join('&');
}

export function createSignature(data, checksumKey) {
  const queryString = convertObjToQueryStr(data);
  const signature = CryptoJS.HmacSHA256(queryString, checksumKey).toString(
    CryptoJS.enc.Hex
  );

  return signature;
}

export function debounce(callback, timeout = 500) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}
