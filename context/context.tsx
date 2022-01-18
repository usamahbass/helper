import React, { createContext, Dispatch, useReducer, FC } from "react";
import { initialState, reducer, initialStateType } from "./reducer";

export const HelperContext = createContext<{
  state: initialStateType;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const Store: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <HelperContext.Provider value={{ state, dispatch }}>
      {children}
    </HelperContext.Provider>
  );
};
