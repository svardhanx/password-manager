export interface ApiCallOptions {
  params?: string | Record<string, string>;
  queryParams?: Record<string, string | string[] | number | boolean>;
}
