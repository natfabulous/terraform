import { Recipe, ResourceTuple } from "./declarations";
import * as r from "./resourceDefinitions";

const rt = (resource: string, number: number) => {
  return new ResourceTuple(resource, number);
};
export const allRecipes = [
  // mineables
  new Recipe("extract_iron", [rt(r.none, 0)], 15, [rt(r.iron_ore, 1)]),
  new Recipe("extract_sulfur", [rt(r.none, 0)], 15, [rt(r.sulfur_ore, 1)]),
  new Recipe("extract_aluminum", [rt(r.none, 0)], 15, [rt(r.aluminum_ore, 1)]),
  new Recipe("extract_fluorite", [rt(r.none, 0)], 15, [rt(r.fluorite_ore, 1)]),

  // infinites
  new Recipe("extract_water", [rt(r.none, 0)], 5, [rt(r.water, 1)]),
  new Recipe("extract_nitrogen", [rt(r.none, 0)], 5, [rt(r.nitrogen, 1)]),
  new Recipe("extract_oxygen", [rt(r.none, 0)], 12, [rt(r.oxygen, 1)]),
  new Recipe("extract_carbon", [rt(r.none, 0)], 12, [rt(r.carbon, 1)]),

  // T1
  new Recipe("smelt_aluminum", [rt(r.aluminum_ore, 2)], 30, [
    rt(r.aluminum_bar, 1),
  ]),
  new Recipe("smelt_steel", [rt(r.iron_ore, 3)], 30, [rt(r.steel_bar, 1)]),
  new Recipe("smelt_concrete", [rt(r.sulfur_ore, 3)], 30, [rt(r.concrete, 1)]),
  new Recipe("smelt_polymer", [rt(r.carbon, 3)], 30, [rt(r.polymer_bar, 1)]),

  // T2
  new Recipe("make_mechanical_parts", [rt(r.steel_bar, 1)], 30, [
    rt(r.mechanical_parts, 1),
  ]),
  new Recipe(
    "make_reinforced_concrete",
    [rt(r.steel_bar, 1), rt(r.concrete, 1)],
    30,
    [rt(r.reinforced_concrete, 1)]
  ),
  new Recipe(
    "make_high_tech_parts",
    [rt(r.aluminum_bar, 2), rt(r.polymer_bar, 1)],
    30,
    [rt(r.high_tech_parts, 3)]
  ),

  // Buildings
  new Recipe(
    "build_depot_2",
    [rt(r.aluminum_bar, 1), rt(r.polymer_bar, 1)],
    12,
    [rt(r.depot_2, 1)]
  ),

  // Output Only
  new Recipe(
    "build train",
    [rt(r.high_tech_parts, 4), rt(r.mechanical_parts, 4)],
    12,
    [rt(r.train, 1)]
  ),
  new Recipe("build rail", [rt(r.concrete, 1), rt(r.steel_bar, 1)], 12, [
    rt(r.rail, 8),
  ]),
  new Recipe("build rail stop", [rt(r.concrete, 1), rt(r.steel_bar, 1)], 12, [
    rt(r.rail_stop, 1),
  ]),
  new Recipe(
    "build recycle center",
    [rt(r.concrete, 1), rt(r.high_tech_parts, 1)],
    12,
    [rt(r.recycle_center, 1)]
  ),
  new Recipe("build waste disposal", [rt(r.concrete, 1)], 12, [
    rt(r.waste_disposal, 1),
  ]),
];
