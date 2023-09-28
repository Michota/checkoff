import { Form, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import { useLogin } from "./useLogin";
import { useSignUp } from "./useSignup";
import toast from "react-hot-toast";

const StyledInput = styled.input`
  background-color: var(--theme-white-100);
  color: var(--theme-black-200);
  width: max-content;
  height: 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;
  border-radius: var(--default-radius);
`;

const InputContainer = styled.span`
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 2rem;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-size: 1.8rem;
  font-weight: 600;
`;

const MainButton = styled(Button)`
  background-color: var(--theme-primary);
  color: var(--theme-black-200);
  padding: 1rem 2rem;
  width: 100%;
`;

const SecondButton = styled(MainButton)`
  background-color: transparent;
  color: var(--theme-primary);
  outline: 0.2rem solid var(--theme-primary);
`;

const Buttons = styled.span`
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 2rem;
  width: 100%;
`;

function AuthForm({ action }) {
  const MIN_PASS_LENGTH = 6;
  const PASSWORD_LOOKAHEAD =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;

  const navigate = useNavigate();
  const { login, isLoading: isLoadingLogin } = useLogin();
  const { signUp, isLoading: isLoadingSignUp } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    // Login
    if (action === "login")
      login(
        { email, password },
        {
          onSettled: () => {
            setEmail("");
            setPassword("");
          },
        }
      );
    // Signup
    if (action !== "signup") return;
    if (password.length < MIN_PASS_LENGTH) {
      toast.error("Password needs to be at least 6 characters long!", {
        position: "top-center",
      });
      return;
    }
    if (!password.match(PASSWORD_LOOKAHEAD)) {
      toast.error(
        "Password needs at least one number and one special character!",
        {
          position: "top-center",
        }
      );
      return;
    }
    signUp(
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
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete={action === "login" ? "on" : "off"}
            id="email"
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="pass">Password</StyledLabel>
          <StyledInput
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete={action === "login" ? "on" : "off"}
            id="pass"
          />
        </InputContainer>
        <Buttons>
          <MainButton type="submit">
            {action === "login" ? "Login!" : "Sign up!"}
          </MainButton>
          <SecondButton
            onClick={() => navigate(action === "login" ? "?signup" : "?login")}
          >
            {action === "login" ? "Sign up!" : "Already singed up? Login!"}
          </SecondButton>
        </Buttons>
      </FormContainer>
    </Form>
  );
}

export default AuthForm;
