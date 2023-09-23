import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: (userData) => {
      queryClient.setQueryData(["user"], userData.user);
      navigate("/tasks");
    },
    onError: (err) => {
      toast.error(`${err.message}`, {
        position: "top-center",
      });
    },
  });
  return { login, isLoading };
}
