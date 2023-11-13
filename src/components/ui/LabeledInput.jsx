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
  if (!id) throw new Error("The LabeledInput component must have an ID.");

  return (
    <>
      <StyledLabel className={className} htmlFor={htmlFor}>
        {children}
      </StyledLabel>
      <Input
        name={name}
        checked={checked}
        id={id}
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
