import styled from "styled-components";
import Input from "./Input";

const StyledLabel = styled.label`
  cursor: pointer;
`;

function LabeledInput({
  children,
  id,
  htmlFor = id,
  onChange,
  value,
  placeholder,
  type,
  autoComplete,
  className,
  checked,
  name,
}) {
  const randomId = Math.random();
  return (
    <>
      <StyledLabel className={className} htmlFor={htmlFor ? htmlFor : randomId}>
        {children}
      </StyledLabel>
      <Input
        name={name}
        checked={checked}
        id={id ? id : randomId}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
      />
    </>
  );
}

export default LabeledInput;
