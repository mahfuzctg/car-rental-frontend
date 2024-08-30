/* eslint-disable @typescript-eslint/no-explicit-any */
import { REGISTER } from "./actionTypes";

const initialState = {
  // initial state
};

const reducer = (
  state = initialState,
  action: { type: any; payload: { key: any } }
) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registerKey: action.payload.key,
      };
    default:
      return state;
  }
};

export default reducer;
