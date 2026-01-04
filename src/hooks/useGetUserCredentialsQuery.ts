import { apiEndpoints } from "@/services/apiEndpoints";
import { axiosInstance } from "@/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const endpoint = apiEndpoints.GET_USER_CREDENTIALS;

export function useGetUserCredentialsQuery(queryData: {
  userId: string | undefined;
}) {
  return useQuery({
    queryKey: ["credentials"],
    queryFn: async function () {
      const response = await axiosInstance.get(
        `${endpoint}/${queryData.userId}`
      );
      return response.data;
    },
  });
}
