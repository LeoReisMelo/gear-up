export interface AuthSignupResponse {
  accessToken: string;
  user: any;
  tenant: any;
}

export interface IAuthService {
  signup(dto: any): Promise<any>;
  signin(dto: any): Promise<any>;
}
