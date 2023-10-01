import { useLocation, useNavigate } from "react-router";

/**
 *
 * Returns a function that returns updated URL State.
 */

function useLocationState() {
  const location = useLocation();
  const state = location.state;

  /**
   *
   * @param {[string]} key  Name of key that will be added/updated in URLState
   * @param {[any]} value - Value of key that was mentioned above.
   * @returns {[object]} New state object that can be used as a argument for "state" option in function returned by useNavigation hook.
   */

  function addURLState(key, value) {
    const newState = Object.assign(state ?? {});
    newState[key] = value;

    return newState;
  }

  return { addURLState };
}

export default useLocationState;
