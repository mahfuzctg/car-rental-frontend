import { REGISTER } from "redux-persist/lib/constants";

interface State {
  registeredKeys: string[];
}

const initialState: State = {
  registeredKeys: [],
};

const reducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registeredKeys: [...state.registeredKeys, action.payload.key],
      };
    default:
      return state;
  }
};

export default reducer;
