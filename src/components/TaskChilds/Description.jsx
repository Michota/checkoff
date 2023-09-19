import styled from "styled-components";
import { useTaskContext } from "../Task";

const StyledDescription = styled.span`
  font-size: 1.2rem;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export function Description({ className }) {
  const { description, updateState, renderType } = useTaskContext();
  return (
    <>
      {description && renderType === "tab" && (
        <StyledDescription>
          {/* {stringShortener(description, 16, {
            method: "string",
            maxLength: 5,
            elipsis: "...",
          })} */}
          {description}
        </StyledDescription>
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
