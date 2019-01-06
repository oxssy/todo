import { Oxssy, OxssyArray, OxssyMap } from "oxssy";

export const todos = new OxssyArray();
export const inputText = new Oxssy('', true);
const filterActive = new Oxssy(false);
const filterComplete = new Oxssy(false);
export const filters = new OxssyMap({
  active: filterActive,
  complete: filterComplete,
});
