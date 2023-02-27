import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { ActionArgs } from "@remix-run/server-runtime";
import { allSearchSafeResources } from "~/graph/resourceDefinitions";
import { treeFromResource } from "~/graph/calculate";
import { RecipeNode } from "~/graph/declarations";
import { useEffect, useRef } from "react";

export function loader() {
  return allSearchSafeResources;
}

export async function action({ request }: ActionArgs) {
  const data = await request.formData();

  const resourceName = data.get("resourceName");
  const quantity = data.get("quantity");
  const tree = treeFromResource(resourceName as string, +quantity!);
  return tree;
}

export default function calculator() {
  const resources = useLoaderData();
  const tree = useActionData();
  const inputRef = useRef<HTMLInputElement>(null);
  const focusNumInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  useEffect(focusNumInput, []);
  return (
    <>
      <h1>Select Output and number</h1>
      <Form method="post">
        <select
          defaultValue={"high tech parts"}
          name="resourceName"
          onChange={focusNumInput}
        >
          {Object.keys(resources)
            .sort((a, b) => a.localeCompare(b))
            .map((key, i) => {
              return (
                <option key={resources[key]} value={resources[key]}>
                  {resources[key]}
                </option>
              );
            })}
        </select>
        <input type="number" name="quantity" defaultValue={30} ref={inputRef} />
      </Form>
      {tree ? readTree(tree) : ""}
    </>
  );
}
export function readTree(node: RecipeNode): JSX.Element[] {
  if (node.descendants.length !== 0) {
    return [
      <>
        {nodeStringFormat(node)}
        {node.descendants.map((d: RecipeNode) => {
          return (
            <>
              <ul className="ml-4 list-none">
                <li>{readTree(d)}</li>
              </ul>
            </>
          );
        })}
      </>,
    ];
  } else {
    return [nodeStringFormat(node)];
  }
}
function nodeStringFormat(node: RecipeNode) {
  return (
    <>
      <span className="text-blue-500">{node.recipe.name}</span> needs{" "}
      <span className="text-green-500">{Math.ceil(node.numRecipes)}</span>{" "}
      "buildings" to produce{" "}
      <span className="text-orange-500">
        {(node.numRecipes * node.recipe.outputs[0].number).toFixed(0)}
      </span>{" "}
      items
    </>
  );
}
