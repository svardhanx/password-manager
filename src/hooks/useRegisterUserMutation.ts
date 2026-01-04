import { apiEndpoints } from "@/services/apiEndpoints";
import { axiosInstance } from "@/services/axiosInstance";
import { ResponseType } from "@/types/response-type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Payload {
  userId: string;
  salt: string;
  kdf: {
    algorithm: string;
    hash: string;
    iterations: number;
    keyLength: number;
  };
}

const endpoint = apiEndpoints.REGISTER_USER;

export function useRegisterUserMutation() {
  return useMutation({
    mutationFn: async function (data: Payload) {
      const response = await axiosInstance.post(endpoint, data);
      return response.data;
    },
    onSuccess: function (response) {
      toast.success(response?.message ?? "success");
    },
    onError: function (error: AxiosError<ResponseType>) {
      toast.error(error.response?.data?.message ?? "something went wrong");
    },
  });
}
