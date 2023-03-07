import { Resource } from "./declarations";

// TODO convert to database
const none: Resource = "none";

// Minerals
const iron: Resource = "iron";
const sulfur: Resource = "sulfur";
const aluminum_ore: Resource = "aluminum_ore";
const fluorite: Resource = "fluorite";

// Cities Waste
const metal_waste: Resource = "metal_waste";
const organic_waste: Resource = "organic_waste";
const plastic_waste: Resource = "plastic_waste";

// Raw Materials
const steel_bar: Resource = "steel_bar";
const concrete: Resource = "concrete";
const aluminum_bar: Resource = "aluminum_bar";
const carbon: Resource = "carbon";
const o2: Resource = "O2";
const nitrogen: Resource = "nitrogen";
const water: Resource = "water";

// Manufactured Products
const mechanical_parts: Resource = "mechanical_parts";
const reinforced_concrete: Resource = "reinforced_concrete";
const polymer_bar: Resource = "polymer_bar";
const hightech_parts: Resource = "hightech_parts";
const tempered_steel: Resource = "tempered_steel";
const composite: Resource = "composite";
const compost: Resource = "compost";
const food: Resource = "food";

// Industry
const extractor: Resource = "extractor";
const depot_MK1: Resource = "depot_MK1";
const factory: Resource = "factory";
const assembly_plant: Resource = "assembly_plant";
const depot_MK2: Resource = "depot_MK2";
const depot_MK3: Resource = "depot_MK3";

// Advanced Industry
const supply_center: Resource = "supply_center";
const atmospheric_extractor: Resource = "atmospheric_extractor";
const waste_disposal: Resource = "waste_disposal";
const recycle_center: Resource = "recycle_center";
const ice_extractor: Resource = "ice_extractor";
const greenhouse: Resource = "greenhouse";
const pumping_station: Resource = "pumping_station";

// Transports
const road: Resource = "road";
const road_stop: Resource = "road_stop";
const truck: Resource = "truck";
const rail: Resource = "rail";
const rail_stop: Resource = "rail_stop";
const train: Resource = "train";

// Terraforming
const greenhouse_gas_generator: Resource = "greenhouse_gas_generator";
const dam_element: Resource = "dam_element";

// Plants
const pine_tree: Resource = "pine_tree";
const eucalyptus_tree: Resource = "eucalyptus_tree";

// Special Buildings
const landmark_tower: Resource = "landmark_tower";

const noInputs = {
  none,
  // Cities Waste
  metal_waste,
  organic_waste,
  plastic_waste,
};

const intermediary = {
  // Minerals
  iron,
  sulfur,
  aluminum_ore,
  fluorite,

  // Raw Materials
  steel_bar,
  concrete,
  aluminum_bar,
  carbon,
  o2,
  nitrogen,
  water,

  // Manufactured Products
  mechanical_parts,
  reinforced_concrete,
  polymer_bar,
  hightech_parts,
  tempered_steel,
  composite,
  compost,
  food,
};
const noOutput = {
  // Industry
  extractor,
  depot_MK1,
  factory,
  assembly_plant,
  depot_MK2,
  depot_MK3,

  // Advanced Industry
  supply_center,
  atmospheric_extractor,
  waste_disposal,
  recycle_center,
  ice_extractor,
  greenhouse,
  pumping_station,

  // Transports
  road,
  road_stop,
  truck,
  rail,
  rail_stop,
  train,

  // Terraforming
  greenhouse_gas_generator,
  dam_element,

  // Plants
  pine_tree,
  eucalyptus_tree,

  // Special Buildings
  landmark_tower,
};
const allResources = {
  ...noInputs,
  ...noOutput,
  ...intermediary,
};

export const allSearchSafeResources = { ...intermediary, ...noOutput };
export default allResources;
