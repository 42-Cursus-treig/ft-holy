import { projectDefinitions } from "./projectDB";
import { poolDefinitions } from "./poolDB";

export const getDefinitions = (graph) =>
  graph === "pool" ? poolDefinitions : projectDefinitions;