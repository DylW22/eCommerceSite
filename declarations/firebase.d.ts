declare module "firebase" {
  namespace auth {
    interface User {
      uid: string;
      email: string;
    }
  }
}
