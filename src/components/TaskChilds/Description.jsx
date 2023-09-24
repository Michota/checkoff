import styled from "styled-components";
import { useTaskContext } from "../Task";
import removeTags from "../../utils/removeTags";

const StyledDescription = styled.span`
  font-size: 1.2rem;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export function Description({ className }) {
  const { descjson, updateState, renderType } = useTaskContext();
  // const descriptionPreview = descjson.blocks[0].data.text;
  const desc = JSON.parse(descjson);

  const firstRowOfDesc = desc?.blocks?.at(0)?.data?.text ?? null;
  return (
    <>
      {firstRowOfDesc && renderType === "tab" && (
        <StyledDescription>
          {/* {stringShortener(description, 16, {
            method: "string",
            maxLength: 5,
            elipsis: "...",
          })} */}
          {removeTags(firstRowOfDesc)}
        </StyledDescription>
      )}

      {/* Not used anymore */}
      {/* {renderType === "compound" && (
        <textarea
          placeholder="Enter description here..."
          className={className}
          value={firstRowOfDesc}
          onChange={(e) => updateState("descjson", e.target.value)}
        />
      )} */}
    </>
  );
}
