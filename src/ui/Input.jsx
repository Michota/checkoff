import styled from "styled-components";

const StyledInput = styled.input`
  background-color: var(--theme-white-300);
  color: var(--theme-black-100);

  width: max-content;
  width: 100%;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  border-radius: var(--default-radius);

  &::placeholder {
    color: var(--theme-black-300);
  }

  &:active,
  &:focus {
    background-color: var(--theme-white-100);
    color: var(--theme-black-200);
  }
`;

function Input({
  className,
  onChange,
  value,
  placeholder,
  type,
  autoComplete,
  id,
}) {
  return (
    <StyledInput
      id={id}
      className={className}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      autoComplete={autoComplete}
    />
  );
}

export default Input;
