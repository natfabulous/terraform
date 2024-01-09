import { Building, Recipe, ResourceTuple } from "./declarations";
import r from "./resourceDefinitions";

const rt = (resource: string, number: number) => {
  return new ResourceTuple(resource, number);
};

// TODO: consider how supply centers and waste disposals might work
// TODO: and greenhouse generators
const extractor = new Building("extractor", 15);
const factory = new Building("factory", 30);
const assembly_plant = new Building("assembly_plant", 12);
const atmospheric_extractor = new Building("atmospheric_extractor", 12);
const recycle_center = new Building("recycle_center", 30);
const ice_extractor = new Building("ice_extractor", 5);
const greenhouse = new Building("greenhouse", 30);
const pumping_station = new Building("pumping_station", 12);

export const allRecipes = [
  // Minerals
  new Recipe("iron", [rt(r.none, 0)], extractor, [rt(r.iron, 1)]),
  new Recipe("sulfur", [rt(r.none, 0)], extractor, [rt(r.sulfur, 1)]),
  new Recipe("aluminum_ore", [rt(r.none, 0)], extractor, [
    rt(r.aluminum_ore, 1),
  ]),
  new Recipe("fluorite", [rt(r.none, 0)], extractor, [rt(r.fluorite, 1)]),

  // Cities Waste
  // TODO: support dynamic output

  // Raw Materials
  new Recipe("steel_bar", [rt(r.iron, 3)], factory, [rt(r.steel_bar, 1)]),
  // TODO: support multiple outputs
  // new Recipe("steel_bar_and_aluminum_bar", [rt(r.metal_waste, 3)], recycle_center, [
  //   rt(r.steel_bar, 2),
  //   rt(r.aluminum_bar, 1),
  // ]),

  new Recipe("concrete", [rt(r.sulfur, 3)], factory, [rt(r.concrete, 1)]),
  new Recipe("aluminum", [rt(r.aluminum_ore, 2)], factory, [
    rt(r.aluminum_bar, 1),
  ]),
  new Recipe("carbon", [rt(r.none, 0)], atmospheric_extractor, [
    rt(r.carbon, 1),
  ]),
  new Recipe("o2", [rt(r.none, 0)], atmospheric_extractor, [rt(r.o2, 1)]),
  new Recipe("nitrogen", [rt(r.none, 0)], ice_extractor, [rt(r.nitrogen, 1)]),
  // new Recipe("water", [rt(r.none, 0)], ice_extractor, [rt(r.water, 1)]),
  new Recipe("water", [rt(r.none, 0)], pumping_station, [rt(r.water, 1)]),

  // Manufactured Products
  new Recipe("mechanical_parts", [rt(r.steel_bar, 1)], factory, [
    rt(r.mechanical_parts, 1),
  ]),
  new Recipe(
    "reinforced_concrete",
    [rt(r.steel_bar, 1), rt(r.concrete, 1)],
    factory,
    [rt(r.reinforced_concrete, 1)]
  ),
  new Recipe("polymer_bar", [rt(r.carbon, 3)], factory, [rt(r.polymer_bar, 1)]),
  new Recipe(
    "hightech_parts",
    [rt(r.aluminum_bar, 2), rt(r.polymer_bar, 1)],
    factory,
    [rt(r.hightech_parts, 3)]
  ),
  new Recipe(
    "tempered_steel",
    [rt(r.steel_bar, 4), rt(r.nitrogen, 1)],
    factory,
    [rt(r.tempered_steel, 3)]
  ),
  new Recipe(
    "composite",
    [rt(r.tempered_steel, 1), rt(r.polymer_bar, 1)],
    factory,
    [rt(r.composite, 1)]
  ),
  new Recipe("compost_factory", [rt(r.carbon, 2), rt(r.nitrogen, 1)], factory, [
    rt(r.compost, 1),
  ]),
  new Recipe("food", [rt(r.compost, 1), rt(r.water, 4)], greenhouse, [
    rt(r.food, 2),
  ]),
  new Recipe(
    "make_compost_carbon",
    [rt(r.carbon, 2), rt(r.nitrogen, 1)],
    factory,
    [rt(r.compost, 1)]
  ),

  // Industry
  new Recipe("extractor", [rt(r.steel_bar, 3)], assembly_plant, [
    rt(r.extractor, 1),
  ]),
  new Recipe("depot_MK1", [rt(r.steel_bar, 3)], assembly_plant, [
    rt(r.depot_MK1, 1),
  ]),
  new Recipe("factory", [rt(r.mechanical_parts, 3)], assembly_plant, [
    rt(r.factory, 1),
  ]),
  new Recipe("assembly_plant", [rt(r.mechanical_parts, 3)], assembly_plant, [
    rt(r.assembly_plant, 1),
  ]),
  new Recipe(
    "depot_MK2",
    [rt(r.aluminum_bar, 1), rt(r.polymer_bar, 1)],
    assembly_plant,
    [rt(r.depot_MK2, 1)]
  ),
  new Recipe("depot_MK3", [rt(r.composite, 2)], assembly_plant, [
    rt(r.depot_MK3, 1),
  ]),

  // Advanced Industry
  new Recipe("supply_center", [rt(r.concrete, 4)], assembly_plant, [
    rt(r.supply_center, 1),
  ]),
  new Recipe(
    "atmosperic_extractor",
    [rt(r.mechanical_parts, 3), rt(r.aluminum_bar, 1)],
    assembly_plant,
    [rt(r.atmospheric_extractor, 1)]
  ),
  new Recipe("waste_disposal", [rt(r.mechanical_parts, 1)], assembly_plant, [
    rt(r.waste_disposal, 1),
  ]),
  new Recipe(
    "recycle_center",
    [rt(r.concrete, 1), rt(r.hightech_parts, 1)],
    assembly_plant,
    [rt(r.recycle_center, 1)]
  ),
  new Recipe(
    "ice_extractor",
    [rt(r.reinforced_concrete, 2), rt(r.mechanical_parts, 2)],
    assembly_plant,
    [rt(r.ice_extractor, 1)]
  ),
  new Recipe(
    "greenhouse",
    [rt(r.steel_bar, 2), rt(r.polymer_bar, 3)],
    assembly_plant,
    [rt(r.greenhouse, 1)]
  ),
  new Recipe(
    "pumping_station",
    [rt(r.reinforced_concrete, 2), rt(r.hightech_parts, 1)],
    assembly_plant,
    [rt(r.pumping_station, 1)]
  ),

  // Transports
  new Recipe("road", [rt(r.concrete, 1)], assembly_plant, [rt(r.road, 4)]),
  new Recipe("road_stop", [rt(r.concrete, 2)], assembly_plant, [
    rt(r.road_stop, 1),
  ]),
  new Recipe("truck", [rt(r.mechanical_parts, 3)], assembly_plant, [
    rt(r.truck, 1),
  ]),
  new Recipe("rail", [rt(r.concrete, 1), rt(r.steel_bar, 1)], assembly_plant, [
    rt(r.rail, 8),
  ]),
  new Recipe(
    "rail_stop",
    [rt(r.concrete, 1), rt(r.steel_bar, 1)],
    assembly_plant,
    [rt(r.rail_stop, 1)]
  ),
  new Recipe(
    "train",
    [rt(r.hightech_parts, 4), rt(r.mechanical_parts, 4)],
    assembly_plant,
    [rt(r.train, 1)]
  ),

  // Terraforming
  new Recipe(
    "greenhouse_gas_generator",
    [rt(r.mechanical_parts, 3), rt(r.hightech_parts, 1)],
    assembly_plant,
    [rt(r.greenhouse_gas_generator, 1)]
  ),
  new Recipe(
    "dam_element",
    [rt(r.reinforced_concrete, 2), rt(r.tempered_steel, 1)],
    assembly_plant,
    [rt(r.dam_element, 1)]
  ),

  // Plants
  new Recipe("pine_tree", [rt(r.carbon, 3), rt(r.water, 3)], assembly_plant, [
    rt(r.pine_tree, 1),
  ]),
  new Recipe(
    "eucalyptus_tree",
    [rt(r.carbon, 3), rt(r.water, 3)],
    assembly_plant,
    [rt(r.eucalyptus_tree, 1)]
  ),

  // Special Buildings
  new Recipe("landmark_tower", [rt(r.concrete, 3)], assembly_plant, [
    rt(r.landmark_tower, 1),
  ]),
];
