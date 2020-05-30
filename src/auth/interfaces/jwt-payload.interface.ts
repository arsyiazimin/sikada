export interface JwtPayload {
    id: number;
    username: string;
    roles?: any;
    permissions?: any;
  }
  
  export interface BodyUserLogin {
    email: string;
    password: string;
  }
  