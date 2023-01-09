export default function queryStringify(data: object) {
    const keys = Object.keys(data);
    return keys.reduce(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
      (result, key, index) => `${result}${key}=${data[key]}${
        index < keys.length - 1 ? '&' : ''
      }`,
      '?',
    );
  }
  