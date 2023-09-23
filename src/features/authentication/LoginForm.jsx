import { Form } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import { loginApi } from "../../services/apiAuth";
import { useLogin } from "./useLogin";

const StyledLoginForm = styled.div`
  display: grid;
  flex-direction: column;
  gap: 2rem;
`;

const StyledInput = styled.input`
  background-color: var(--theme-white-100);
  color: var(--theme-black-200);
`;

const InputContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 1rem;
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
    <StyledLoginForm>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <label htmlFor="email">E-mail</label>
          <StyledInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="off"
            id="email"
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="pass">Password</label>
          <StyledInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
            id="pass"
          />
        </InputContainer>
        <Button type="submit">Submit</Button>
      </Form>
    </StyledLoginForm>
  );
}

export default LoginForm;
