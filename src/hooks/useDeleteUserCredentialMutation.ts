import { apiEndpoints } from "@/services/apiEndpoints";
import { axiosInstance } from "@/services/axiosInstance";
import { ResponseType } from "@/types/response-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const endpoint = apiEndpoints.DELETE_CREDENTIAL;

export function useDeleteUserCredentialMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async function (id: string) {
      const response = await axiosInstance.delete(endpoint, { data: { id } });
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
