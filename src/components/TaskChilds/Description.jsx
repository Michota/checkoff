import stringShortener from "../../utils/stringShortener";
import styled from "styled-components";
import { useTaskContext } from "../Task";

const StyledDescription = styled.span`
  width: max-content;
  font-size: 1.2rem;
`;

export function Description({ className }) {
  const { description, updateState, renderType } = useTaskContext();
  return (
    <>
      {description && renderType === "tab" && (
        <StyledDescription>{stringShortener(description)}</StyledDescription>
      )}
      {renderType === "compound" && (
        <textarea
          placeholder="Enter description here..."
          className={className}
          value={description}
          onChange={(e) => updateState("description", e.target.value)}
        />
      )}
    </>
  );
}
