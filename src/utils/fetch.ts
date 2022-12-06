import queryStringify from "./queryStringify";

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type HTTPMethod = (
  url: string, 
  options?: Options
  ) => Promise<unknown>

type Options = {
  method: METHODS
  data?: any
  timeout?: number
  headers?: any
}

export default class HTTPTransport {
  
  get: HTTPMethod = (url, options) => this.request(
    `${url}${queryStringify(options?.data)}`, {
    ...options,
    method: METHODS.GET,
  });

  put: HTTPMethod = (url, options) => this.request(url, {
    ...options,
    method: METHODS.PUT,
  });

  post: HTTPMethod = (url, options) => this.request(url, {
    ...options,
    method: METHODS.POST,
  });

  delete: HTTPMethod = (url, options) => this.request(url, {
    ...options,
    method: METHODS.DELETE,
  });

  request: HTTPMethod = (url, options = {method: METHODS.GET}) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, url);

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
