import chalk from "chalk";
import { Resource, Recipe, RecipeNode, ResourceTuple } from "./declarations";
import { allRecipes } from "./definitions";

export function findRecipeReverse(resource: Resource) {
  const recipeOut = allRecipes.filter((recipe: Recipe) => {
    return recipe.outputs.some((resourceTuple) => {
      return resourceTuple.resource === resource;
    });
  });
  return recipeOut[0];
}

export function treeFromResource(resource: Resource, targetOutput: number) {
  const primaryRecipe = findRecipeReverse(resource);
  const root = new RecipeNode(primaryRecipe, targetOutput);
  populateTree(root);
  return root;
}

// build tree as a side-effect. input is output
export function populateTree(node: RecipeNode | null) {
  node?.recipe.inputs.map((resourceTuple: ResourceTuple) => {
    if (resourceTuple.resource !== "none") {
      const childNode = new RecipeNode(
        findRecipeReverse(resourceTuple.resource),
        resourceTuple.number * node.numRecipes,
        node.rank + 1
      );
      node.descendants.push(childNode);
      return populateTree(childNode);
    } else {
      return null;
    }
  });
}

function prt(rt: ResourceTuple) {
  if (rt.resource !== "none") {
    console.log(chalk.blue(rt));
  }
}
function printNodeVerbose(node: RecipeNode) {
  console.log(
    `parent requires ${chalk.greenBright(node.parentRequires)} items`
  );
  console.log(node);
  console.log("outputs:");
  node.recipe.outputs.map(prt);
  console.log("inputs:");
  node.recipe.inputs.map(prt);
  console.log("//////////////////////////////");
}

export function readTree(node: RecipeNode) {
  console.log(node.stringify());
  if (node.descendants.length !== 0) {
    node.descendants.map((d: RecipeNode) => {
      readTree(d);
    });
  }
}
