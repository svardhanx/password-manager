import { apiEndpoints } from "@/services/apiEndpoints";
import { axiosInstance } from "@/services/axiosInstance";
import { ApiCallOptions } from "@/types/api-call-options";
import buildUrlForGetRequest from "@/utils/buildUrlForGetRequest";
import { useQuery } from "@tanstack/react-query";

const endpoint = apiEndpoints.GET_USER_CREDENTIALS;

export function useGetUserCredentialsQuery(
  queryData?: ApiCallOptions,
  enabled: boolean = true,
) {
  const url: string | null = buildUrlForGetRequest(endpoint, queryData);

  return useQuery({
    queryKey: ["credentials"],
    enabled: enabled,
    queryFn: async function () {
      const response = await axiosInstance.get(url);
      return response.data;
    },
  });
}
