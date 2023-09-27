import { useSearchParams } from "react-router-dom";

function useFilterWithParameters(
  filteredArray = [],
  parameters = [""], // Search parameters relating to this array
  uniqueForElements = "id" // Something that allows you to distinguish elements
) {
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams.get(parameters[0]).length);

  // function allIfNone() {
  //   const x = parameters.map((param) => searchParams.get(param)?.length);
  //   console.log(x);
  // }
  // allIfNone();

  const elementsMatchingParams = parameters?.map((parameter) =>
    filteredArray?.filter((el) =>
      el[parameter]?.includes(searchParams.get(parameter))
    )
  );

  // ! If there were multiple parameters, the arrays may contain the same elements many times.
  // * uniqueElements is an array that filters out duplicates.
  const uniqueElements = []
    .concat(...elementsMatchingParams)
    .filter(
      (element, index, arr) =>
        element[uniqueForElements] !==
        arr.filter(
          (potentiallyDuplicate) =>
            potentiallyDuplicate[uniqueForElements] ===
            element[uniqueForElements]
        ).length >
          1
    );
  return uniqueElements;
}

export default useFilterWithParameters;
