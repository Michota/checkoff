import { useLocation, useNavigate } from "react-router";

/**
 *
 * Returns addURLState function - function that can be used to add objects that can be stored in URL state.
 */

function useLocationState() {
  const location = useLocation();
  const state = location.state;

  /**
   *
   * @param {[object]} NewURLValue - value to be added to location.state
   * @returns {[Array]} New state array that can be used as a argument for "state" option in function returned by useNavigation hook.
   */
  function addURLState(stateValue) {
    const newState = state?.filter((el) => el.name !== stateValue.name) ?? [];
    newState?.push(stateValue);

    return newState;
  }
  return { addURLState };
}

export default useLocationState;
