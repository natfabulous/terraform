export type Resource = string;

export class ResourceTuple {
  resource: Resource;
  number: number;

  constructor(resource: Resource, number: number) {
    this.resource = resource;
    this.number = number;
  }
}

export class Recipe {
  name: string;
  inputs: ResourceTuple[];
  building: Building;
  outputs: ResourceTuple[];
  speed: number;

  constructor(
    name: string,
    inputs: ResourceTuple[],
    building: Building,
    outputs: ResourceTuple[]
  ) {
    this.name = name;
    this.inputs = inputs;
    this.building = building;
    this.outputs = outputs;
    this.speed = this.building.speed;
    this.simplifyResourceRates();
  }

  private simplifyResourceRates() {
    const f = (rt: ResourceTuple) => {
      rt.number *= this.speed;
    };
    this.inputs.map(f);
    this.outputs.map(f);
  }
}

export class Building {
  name: string;
  speed: number;

  constructor(name: string, speed: number) {
    this.name = name;
    this.speed = speed;
  }
}

export class RecipeNode {
  parentRequires: number;
  numRecipes: number;
  recipe: Recipe;
  rank: number;
  descendants: RecipeNode[];

  constructor(recipe: Recipe, parentRequires: number, rank: number = 0) {
    this.recipe = recipe;
    this.rank = rank;
    this.parentRequires = parentRequires;
    this.numRecipes = 1;
    this.descendants = [];
    this.initNode();
  }

  private initNode() {
    this.numRecipes = this.parentRequires / this.recipe.outputs[0].number;
  }
}
