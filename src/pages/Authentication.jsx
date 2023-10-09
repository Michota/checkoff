import styled from "styled-components";
import Logo from "../components/ui/Logo";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import AuthForm from "../features/authentication/AuthForm";
import { useSearchParams } from "react-router-dom";

const StyledAuthentication = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--theme-black-200);
  color: var(--theme-white-100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

function Authentication() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useUser();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return (
    <StyledAuthentication>
      <Logo />
      <AuthForm action={searchParams.has("signup") ? "signup" : "login"} />
    </StyledAuthentication>
  );
}

export default Authentication;
