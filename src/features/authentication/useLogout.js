import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/authentication", { replace: true });
      toast.success("Logged out.", {
        icon: "👋",
      });
    },
  });

  return { logout, isLoading };
}
