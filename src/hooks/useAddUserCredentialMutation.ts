import { apiEndpoints } from "@/services/apiEndpoints";
import { axiosInstance } from "@/services/axiosInstance";
import { CredentialType } from "@/types/password-credentials";
import { ResponseType } from "@/types/response-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const endpoint = apiEndpoints.ADD_CREDENTIAL;

export function useAddUserCredentialMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async function (data: CredentialType) {
      const response = await axiosInstance.post(endpoint, data);
      return response.data;
    },
    onSuccess: function (response) {
      queryClient.invalidateQueries({
        queryKey: ["credentials"],
      });
      toast.success(response?.message ?? "success");
    },
    onError: function (error: AxiosError<ResponseType>) {
      toast.error(error.response?.data?.message ?? "something went wrong");
    },
  });
}
