import store from '../utils/Store';
import Router from '../utils/Router';
import API, { UserAPI, User } from '../api/UserApi';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }


  async updateAvatar(data: User) {
    try {
      await this.api.updateAvatar(data);
      Router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  async updatePassword(data: User) {
    try {
      await this.api.updatePassword(data);
      Router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  async updateProfile(data: User) {
    try {
      await this.api.updateProfile(data);
      Router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

}

export default new UserController();
