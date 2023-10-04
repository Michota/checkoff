import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { reauthenticate, updateCredentials } from "../../services/apiAuth";
import { useState } from "react";

function useUpdateCredentials() {
  const {
    mutate: update,
    isLoading: isUpdating,
    isError,
    error,
  } = useMutation({
    mutationFn: (newCredentials) => {
      const whatWasUpdated = Object.keys(newCredentials).filter(
        (cred) => cred !== "nonce"
      );
      const whatWasUpdatedString =
        whatWasUpdated.join(",").at(0).toLocaleUpperCase() +
        whatWasUpdated.slice(1);

      return toast.promise(updateCredentials(newCredentials), {
        loading: `Sending ${whatWasUpdatedString} update request...`,
        success: `${whatWasUpdatedString} ${
          whatWasUpdated.length > 1 ? "were" : "was"
        }  updated!`,
        error: (err) => `${err.message}`,
      });
    },
  });

  return { update, isUpdating, isError, error };
}

function useReauthenticate() {
  const [isReauthenticating, setIsReauthenticating] = useState(false);
  const { mutate: reauth, isLoading } = useMutation({
    mutationFn: (data) =>
      toast.promise(reauthenticate(data), {
        loading: "Sending credentials update request...",
        success: "Request sent. Check your inbox!",
        error: (err) => `${err.message}`,
      }),
  });

  return {
    reauth,
    isLoading,
    isReauthenticating,
    setIsReauthenticating,
  };
}

// ! may be used in future, to fix error-throwing bug (errors are not handled by Profile.jsx)
// function useReauthenticate() {
//   const [isReauthenticating, setIsReauthenticating] = useState(false);
//   const {
//     mutate: reauth,
//     isLoading,
//     error,
//     isError,
//   } = useMutation({
//     mutationFn: async function (data) {
//       try {
//         const result = await toast.promise(reauthenticate(data), {
//           loading: "Sending credentials update request...",
//           success: "Request sent. Check your inbox!",
//           error: (err) => {
//             // throw new Error(err.message);
//             return `${err.message}`;
//           },
//         });
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     },
//     onError: (err) => {
//       console.log(err);
//       throw new Error(err.message);
//     },
//   });

//   return {
//     reauth,
//     isLoading,
//     isReauthenticating,
//     setIsReauthenticating,
//     error,
//     isError,
//   };
// }

export { useUpdateCredentials, useReauthenticate };
