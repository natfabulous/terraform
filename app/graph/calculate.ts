import chalk from "chalk";
import { Resource, Recipe, TreeNode, ResourceTuple } from "./declarations";
import { allRecipes } from "./definitions";
import * as r from "./resourceDefinitions";

export function findRecipeReverse(resource: Resource) {
  const recipeOut = allRecipes.filter((recipe: Recipe) => {
    return recipe.outputs.some((resourceTuple) => {
      return resourceTuple.resource === resource;
    });
  });
  return recipeOut[0];
}

export function treeFromResource(resource: Resource) {
  const primaryRecipe = findRecipeReverse(resource);
  const root = new TreeNode(primaryRecipe, 12);
  populateTree(root);
  return root;
}

// build tree as a side-effect. input is output
export function populateTree(node: TreeNode | null) {
  node?.recipe.inputs.map((resourceTuple: ResourceTuple) => {
    if (resourceTuple.resource !== "none") {
      const childNode = new TreeNode(
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
function printNodeVerbose(node: TreeNode) {
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
function printNode(node: TreeNode) {
  console.log(
    `${chalk.redBright(
      "--".repeat(node.rank) + (node.rank ? ">" : "")
    )}${chalk.blueBright(node.recipe.name)} needs ${chalk.greenBright(
      Math.ceil(node.numRecipes)
    )} "buildings" to produce ${chalk.yellowBright(
      (node.numRecipes * node.recipe.outputs[0].number).toFixed(0)
    )} items`
  );
}
export function readTree(node: TreeNode) {
  // printNodeVerbose(node);
  printNode(node);
  if (node.descendants.length !== 0) {
    node.recipe.inputs.map((rt: ResourceTuple) => {
      const rname = rt.resource;
    });
    node.descendants.map((d: TreeNode) => {
      readTree(d);
    });
  }
}
export function annotateTree(node: TreeNode) {
  // printNode(node);
  if (node.descendants.length !== 0) {
    node.recipe.inputs.map((rt: ResourceTuple) => {
      const rname = rt.resource;
    });
    node.descendants.map((d: TreeNode) => {
      readTree(d);
    });
  }
}

export function test() {
  console.log("finished compiling, program begin");
  const tree = treeFromResource(r.train);
  readTree(tree);
}

test();
