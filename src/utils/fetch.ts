import queryStringify from "./queryStringify";

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options = {
  method: METHODS
  data?: any
  timeout?: number
  headers?: any
}

export default class HTTPTransport {
  

  get = (url: string, options = {}) => this.request(url, {
    ...options,
    method: METHODS.GET,
  });

  put = (url: string, options = {}) => this.request(url, {
    ...options,
    method: METHODS.PUT,
  });

  post = (url: string, options = {}) => this.request(url, {
    ...options,
    method: METHODS.POST,
  });

  delete = (url: string, options = {}) => this.request(url, {
    ...options,
    method: METHODS.DELETE,
  });

  request = (url: string, options: Options = {method: METHODS.GET}) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(
      options.method,
      options.method === METHODS.GET && !!options.data
        ? `${url}${queryStringify(options.data)}`
        : url,
    );
    if (options.headers) {
      Object.keys(options.headers).forEach((key) => {
        xhr.setRequestHeader(key, options.headers[key]);
      });
    }

    if (options.timeout) {
      xhr.timeout = options.timeout;
    } else {
      xhr.timeout = 5000;
    }

    xhr.onload = () => {
      resolve(xhr);
    };
    xhr.onerror = reject;
    xhr.ontimeout = reject;

    if (options.method === METHODS.GET || !options.data) {
      xhr.send();
    } else {
      xhr.send(options.data);
    }
  });
}
