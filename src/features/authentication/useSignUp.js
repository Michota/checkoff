import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: (credentials) => signUpApi(credentials),
    onSuccess: (userData) => {
      toast.success(
        "Singed up! Complete the registration by confirming it via the link you received by e-mail!",
        {
          position: "top-center",
          duration: 5000,
          iconTheme: {
            primary: "var(--theme-primary)",
            secondary: "var(--theme-black-200)",
          },
        }
      );
    },
    onError: (err) => {
      toast.error(`${err.message}`, {
        position: "top-center",
      });
    },
  });
  return { signUp, isLoading };
}
