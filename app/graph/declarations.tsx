import chalk from "chalk";

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
export class SimpleNode {
  description: string;
  children: SimpleNode[];
  constructor(description: string) {
    this.description = description;
    this.children = [];
  }
}
export class RecipeNode {
  parentRequires: number;
  numRecipes: number;
  recipe: Recipe;
  rank: number;
  descendants: RecipeNode[];
  initNode() {
    this.numRecipes = this.parentRequires / this.recipe.outputs[0].number;
  }

  stringify() {
    return `${chalk.redBright(
      "--".repeat(this.rank) + (this.rank ? ">" : "")
    )}${chalk.blueBright(this.recipe.name)} needs ${chalk.greenBright(
      Math.ceil(this.numRecipes)
    )} "buildings" to produce ${chalk.yellowBright(
      (this.numRecipes * this.recipe.outputs[0].number).toFixed(0)
    )} items`;
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
