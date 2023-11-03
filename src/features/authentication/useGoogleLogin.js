import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useGoogleLogin() {
  const { mutate: login, isLoading } = useMutation({
    mutationFn: () => loginWithGoogle(),
    onError: (err) => {
      toast.error(`${err.message}`, {
        position: "top-center",
      });
    },
  });
  return { login, isLoading };
}
