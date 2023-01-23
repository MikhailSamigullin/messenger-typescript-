import BaseAPI from '../api/BaseApi';

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  read(): Promise<User> | any{
    return this.http.get('/profile');
  }

  updateAvatar(data: any) {
    return this.http.put('/profile/avatar', data);
  }

  updatePassword(data: any) {
    return this.http.put('/password', data);
  }

  updateProfile(data: any) {
    return this.http.put('/profile', data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new UserAPI();
