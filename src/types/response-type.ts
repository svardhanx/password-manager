export interface ResponseType<D = undefined, T = undefined> {
  message: string;
  success: boolean;
  errors: T extends undefined ? null : T;
  data?: D extends undefined ? never : D;
}
