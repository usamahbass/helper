import type { ResourcesType } from "~/types/resources";
import { TypesReducer } from "./type";

export const setResources = (resources: Array<ResourcesType>) => ({
  type: TypesReducer.SET_RESOURCES,
  payload: resources,
});
