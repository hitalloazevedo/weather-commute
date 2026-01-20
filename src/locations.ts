import { getEnv } from "./getEnv.js";
import type { LocationType } from "./types.js";

export const locations: Array<LocationType> = JSON.parse(getEnv("LOCATIONS"));