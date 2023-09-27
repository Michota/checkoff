import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import SignUpForm from "../features/authentication/SingUpForm";
import Button from "../ui/Button";

const StyledSignUp = styled.div`
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

function SingUp() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return (
    <StyledSignUp>
      <Logo size="40rem" />
      <p>Sign up new user</p>
      <SignUpForm />
      <Button onClick={() => navigate("/login")}>Already signed up?</Button>
    </StyledSignUp>
  );
}

export default SingUp;
