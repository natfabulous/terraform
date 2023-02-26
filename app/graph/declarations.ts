// export class Resource {
//   resourceName: string;
//   constructor(name: string) {
//     this.resourceName = name;
//   }
// }

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
  speed: number;
  outputs: ResourceTuple[];
  simplifyResourceRates() {
    const f = (rt: ResourceTuple) => {
      rt.number *= this.speed;
    };
    this.inputs.map(f);
    this.outputs.map(f);
  }
  constructor(
    name: string,
    inputs: ResourceTuple[],
    speed: number,
    outputs: ResourceTuple[]
  ) {
    this.name = name;
    this.inputs = inputs;
    this.speed = speed;
    this.outputs = outputs;
    this.simplifyResourceRates();
  }
}

export class Building {
  recipes: Recipe[];
  constructor(recipes: Recipe[]) {
    this.recipes = recipes;
  }
}

export class TreeNode {
  parentRequires: number;
  numRecipes: number;
  recipe: Recipe;
  rank: number;
  descendants: TreeNode[];
  initNode() {
    this.numRecipes = this.parentRequires / this.recipe.outputs[0].number;
  }

  constructor(recipe: Recipe, parentRequires: number, rank: number = 0) {
    this.recipe = recipe;
    this.rank = rank;
    this.parentRequires = parentRequires;
    this.numRecipes = 1;
    this.descendants = [];
    this.initNode();
  }
}
