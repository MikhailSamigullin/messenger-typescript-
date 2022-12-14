import API, { AuthAPI, SigninData, SignupData } from '../api/AuthApi';
import store from '../utils/Store';
import Router from '../utils/Router';

// export class AuthController {
//   // private readonly api: AuthAPI;

//   // constructor() {
//   //   this.api = API;
//   // }

//   private api = new AuthAPI;

//   async request(req: () => void) {
//     store.set('user.isLoading' , true);
//     try {
//       await req();
//       store.set('user.error', undefined); 
//     } catch (e: any) {
//       store.set('user.error', e); 
//       console.error(e.message);
//     } finally {
//       store.set('user.isLoading' , false);
//     }
//   }

//   async signin(data: SigninData) {
//     try {
//       await this.api.signin(data);

//       await this.fetchUser();

//       Router.go('/profile');
//       store.set('user.error', undefined); //add

//     } catch (e: any) {
//       console.log(e.message);
//       store.set('user.error', e); //add
      
//     }
//   }

//   async signup(data: SignupData) {
//     try {
//       await this.api.signup(data);

//       await this.fetchUser();
      
//       store.set('user.error', undefined); //add
//       Router.go('/profile');
//     } catch (e: any) {
//       store.set('user.error', undefined);
//       console.error(e.message);
//     }
//   } 

//   async fetchUser() {
//     store.set('user.isLoading' , true);

//     try {
//       const user = await this.api.read();

//       store.set('user.data', user);

//     } catch (e: any) {
//       store.set('user.error', e);
//     } finally {
//       store.set('user.isLoading' , false);
//     }
//   }

//   async logout() {
//       await this.request( async () => {
//         await this.api.logout();
//         Router.go('/');
//       });
      

//   }
// }

// export default new AuthController();

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      Router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      Router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.set('user', user);
  }

  async logout() {
    try {
      await this.api.logout();

      Router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
