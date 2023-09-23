import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router";

const StyledLogin = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--theme-black-200);
  color: var(--theme-white-100);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  if (isAuthenticated) navigate("/");

  return (
    <StyledLogin>
      <LoginForm />
    </StyledLogin>
  );
}

export default Login;
