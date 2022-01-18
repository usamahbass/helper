import { Reducer } from "react";
import { TypesReducer } from "./type";
import type { ResourcesType } from "~/types/resources";

export type initialStateType = {
  resources: Array<ResourcesType>;
};

export const initialState = {
  resources: [],
};

type ReducerActionType = { type: string; payload: {} | string };

export const reducer: Reducer<initialStateType | any, ReducerActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case TypesReducer.SET_RESOURCES:
      return { ...state, resources: action.payload };
  }
};
