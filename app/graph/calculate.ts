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

export function readTree(node: RecipeNode) {
  if (node.descendants.length !== 0) {
    node.descendants.map((d: RecipeNode) => {
      readTree(d);
    });
  }
}
