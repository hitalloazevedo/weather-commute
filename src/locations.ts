import type { LocationType } from "./types.js";
import { readFileSync } from "node:fs";

export const locations = JSON.parse(
    readFileSync(new URL("./../locations.json", import.meta.url), "utf-8")
).locations as Array<LocationType>;
