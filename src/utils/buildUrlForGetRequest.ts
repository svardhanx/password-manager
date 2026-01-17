import { ApiCallOptions } from "@/types/api-call-options";

/**
 * Builds a URL for GET requests by combining endpoint, path parameters, and query parameters.
 *
 * @param endpoint - The API endpoint path (e.g., 'api/v1/users' or 'api/v1/users/:userId')
 * @param options - Optional configuration object
 * @param options.params - Path parameters. Can be:
 *   - string: Appended to the endpoint (e.g., '123' → 'api/v1/users/123')
 *   - object: Keys must match placeholders in endpoint (e.g., { userId: '123' } replaces ':userId')
 * @param options.queryParams - Query parameters as key-value pairs. Always an object.
 *   Values are converted to strings and appended as query string (e.g., { page: 1 } → '?page=1')
 *
 * @returns The constructed URL string
 *
 * @example
 * // String param
 * buildUrlForGetRequest('api/v1/users', { params: '123' })
 * // Returns: 'api/v1/users/123'
 *
 * @example
 * // Object params with placeholders
 * buildUrlForGetRequest('api/v1/users/:userId/posts/:postId', {
 *   params: { userId: '123', postId: '456' }
 * })
 * // Returns: 'api/v1/users/123/posts/456'
 *
 * @example
 * // With query params
 * buildUrlForGetRequest('api/v1/users', {
 *   queryParams: { page: 1, active: true }
 * })
 * // Returns: 'api/v1/users?page=1&active=true'
 */
function buildUrlForGetRequest(endpoint: string, options?: ApiCallOptions) {
  let finalUrl = endpoint;

  if (options?.params) {
    if (typeof options?.params === "string") {
      finalUrl = `${finalUrl}/${options.params}`;
    } else {
      Object.entries(options?.params).forEach(([key, value]) => {
        finalUrl = finalUrl.replace(`:${key}`, value);
      });
    }
  }

  if (options?.queryParams) {
    const queryString = new URLSearchParams(
      Object.entries(options.queryParams).map(([key, value]) => [
        key,
        String(value),
      ]),
    ).toString();

    finalUrl = `${finalUrl}?${queryString}`;
  }

  return finalUrl;
}

export default buildUrlForGetRequest;
