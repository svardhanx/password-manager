export interface LoginFormFields {
  email: string;
  password: string;
}

export interface SignupFormFields extends LoginFormFields {
  username: string;
}
