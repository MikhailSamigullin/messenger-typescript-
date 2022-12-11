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
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }
  
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

  private request: HTTPMethod = (url, options = {method: METHODS.GET}) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, url);

    // if (options.headers) {
    //   Object.keys(options.headers).forEach((key) => {
    //     xhr.setRequestHeader(key, options.headers[key]);
    //   });
    // }

    // if (options.timeout) {
    //   xhr.timeout = options.timeout;
    // } else {
    //   xhr.timeout = 5000;
    // }

    // xhr.onload = () => {
    //   resolve(xhr);
    // };

    xhr.onreadystatechange = (e) => {

      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };

    xhr.onabort = () => reject({reason: 'abort'});
      xhr.onerror = () => reject({reason: 'network error'});
      xhr.ontimeout = () => reject({reason: 'timeout'});

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;
    xhr.responseType = 'json';

    if (options.method === METHODS.GET || !options.data) {
      xhr.send();
    } else {
      xhr.send(JSON.stringify(options.data));
    }
  });
}
