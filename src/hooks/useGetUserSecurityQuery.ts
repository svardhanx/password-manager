import { apiEndpoints } from "@/services/apiEndpoints";
import { axiosInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const endpoint = apiEndpoints.GET_USER_SECURITY;

export function useGetUserSecurityQuery(
  queryData: { id: string | undefined },
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["user-security"],
    enabled,
    queryFn: async function () {
      const response = await axiosInstance.get(`${endpoint}/${queryData.id}`);
      return response.data;
    },
  });
}
