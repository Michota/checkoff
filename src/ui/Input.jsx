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
    opacity: 0.7;
  }

  &:active,
  &:focus {
    background-color: var(--theme-white-100);
    color: var(--theme-black-200);
  }
`;

const StyledRadio = styled.input`
  width: 1px;
  &:after {
    content: "";
    background-color: var(--theme-black-400);
    border: var(--theme-white-400) 1px solid;
    opacity: 1;
    display: block;
    border-radius: 50rem;
    z-index: 1;
    width: 1em;
    height: 1em;
  }

  &:hover::after {
    background-color: rgba(var(--theme-primary-rgba), 0.7);
  }

  &:checked:after {
    background-color: var(--theme-primary);
  }
`;

function Input({
  className,
  onChange,
  value,
  placeholder,
  type = "text",
  autoComplete,
  id,
  name,
}) {
  switch (type) {
    default:
      return (
        <StyledInput
          className={className}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          autoComplete={autoComplete}
          id={id}
          name={name}
        />
      );
    case "radio":
      return (
        <>
          <StyledRadio
            className={className}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            type="radio"
            autoComplete={autoComplete}
            id={id}
            name={name}
          />
        </>
      );
  }
}

export default Input;
