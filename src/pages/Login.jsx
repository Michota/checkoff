import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const StyledLogin = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--theme-black-200);
  color: var(--theme-white-100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4.8rem;
`;

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return (
    <StyledLogin>
      <Logo size="40rem" />
      <LoginForm />
    </StyledLogin>
  );
}

export default Login;
