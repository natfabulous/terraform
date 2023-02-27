import { Resource } from "./declarations";

const none: Resource = "none";

const iron_ore: Resource = "iron ore";
const sulfur_ore: Resource = "sulfur ore";
const aluminum_ore: Resource = "aluminum ore";
const fluorite_ore: Resource = "fluorite ore";
const metal_waste: Resource = "metal waste";
const plastic_waste: Resource = "plastic waste";
const organic_waste: Resource = "organic waste";
const oxygen: Resource = "oxygen";
const carbon: Resource = "carbon";
const water: Resource = "water";
const nitrogen: Resource = "nitrogen";

const concrete: Resource = "concrete";
const polymer_bar: Resource = "polymer bar";
const steel_bar: Resource = "steel bar";
const mechanical_parts: Resource = "mechanical parts";
const aluminum_bar: Resource = "aluminum bar";

const high_tech_parts: Resource = "high tech parts";
const reinforced_concrete: Resource = "reinforced concrete";

const depot_2: Resource = "depot 2";
const train: Resource = "train";
const rail: Resource = "rail";
const rail_stop: Resource = "rail stop";
const waste_disposal: Resource = "waste disposal";
const recycle_center: Resource = "recycle center";

const allResources = {
  none,
  iron_ore,
  sulfur_ore,
  aluminum_ore,
  fluorite_ore,
  metal_waste,
  plastic_waste,
  organic_waste,
  oxygen,
  carbon,
  water,
  nitrogen,
  concrete,
  polymer_bar,
  steel_bar,
  mechanical_parts,
  aluminum_bar,
  high_tech_parts,
  reinforced_concrete,
  depot_2,
  train,
  rail,
  rail_stop,
  waste_disposal,
  recycle_center,
};
const noInputs = {
  none,
  metal_waste,
  plastic_waste,
  organic_waste,
};
const deepCopyAR = JSON.parse(JSON.stringify(allResources));
Object.keys(noInputs).map((key) => delete deepCopyAR[key]);
export const allSearchSafeResources = deepCopyAR;
export default allResources;
