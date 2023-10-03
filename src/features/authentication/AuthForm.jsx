import { Form, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import { useLogin } from "./useLogin";
import { useSignUp } from "./useSignup";
import toast from "react-hot-toast";
import LabeledInput from "../../ui/LabeledInput";

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
          <LabeledInput
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete={action === "login" ? "on" : "off"}
            id="email"
            htmlFor="email"
          >
            E-mail
          </LabeledInput>
        </InputContainer>
        <InputContainer>
          <LabeledInput
            htmlFor="pass"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete={action === "login" ? "on" : "off"}
            id="pass"
          >
            Password
          </LabeledInput>
        </InputContainer>
        <Buttons>
          <Button btnType="primary" type="submit">
            {action === "login" ? "Login!" : "Sign up!"}
          </Button>
          <Button
            btnType="secondary"
            onClick={() => navigate(action === "login" ? "?signup" : "?login")}
          >
            {action === "login" ? "Sign up!" : "Already singed up? Login!"}
          </Button>
        </Buttons>
      </FormContainer>
    </Form>
  );
}

export default AuthForm;
