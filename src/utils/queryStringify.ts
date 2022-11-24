export default function queryStringify(data: object) {
    const keys = Object.keys(data);
    return keys.reduce(
      (result, key, index) => `${result}${key}=${data[key]}${
        index < keys.length - 1 ? '&' : ''
      }`,
      '?',
    );
  }