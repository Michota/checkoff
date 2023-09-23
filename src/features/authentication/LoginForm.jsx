import { Form } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import { useLogin } from "./useLogin";

const StyledInput = styled.input`
  background-color: var(--theme-white-100);
  color: var(--theme-black-200);
  height: 1rem;
  padding: 2rem 1rem;
`;

const InputContainer = styled.span`
  display: grid;
  grid-template-columns: 10rem 100%;
  gap: 2rem;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  width: 40vw;
`;

const StyledLabel = styled.label`
  font-size: 1.8rem;
  font-weight: 600;
`;

const LoginButton = styled(Button)`
  background-color: var(--theme-primary);
  color: var(--theme-black-200);
  padding: 1rem 2rem;
`;

function LoginForm() {
  const { login, isLoading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormContainer>
        <InputContainer>
          <StyledLabel htmlFor="email">E-mail</StyledLabel>
          <StyledInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="off"
            id="email"
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="pass">Password</StyledLabel>
          <StyledInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
            id="pass"
          />
        </InputContainer>
        <LoginButton type="submit">Log in</LoginButton>
      </FormContainer>
    </Form>
  );
}

export default LoginForm;
