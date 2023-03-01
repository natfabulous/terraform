import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { ActionArgs } from "@remix-run/server-runtime";
import { allSearchSafeResources } from "~/graph/resourceDefinitions";
import { generateTree } from "~/graph/calculate";
import { RecipeNode } from "~/graph/declarations";
import { useEffect, useRef, useState } from "react";

export function loader() {
  return Object.values(allSearchSafeResources);
}

export async function action({ request }: ActionArgs) {
  const data = await request.formData();

  const resourceName = data.get("resourceName");
  const quantity = data.get("quantity");
  const tree = generateTree(resourceName as string, +quantity!);
  return tree;
}

export default () => {
  const defaultNumberOfItems = 30;
  const listOfResources = useLoaderData();
  const [listOfItems] = useState(listOfResources);
  const [numberOfItems, setNumberOfItems] = useState(defaultNumberOfItems);
  const [currentlySelectedItem, setCurrentlySelectedItem] = useState(
    listOfItems[0]
  );
  const fetcher = useFetcher();

  const inputRef = useRef<HTMLInputElement>(null);

  const focusNumInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  const onChangeHandler = (value: string) => {
    setCurrentlySelectedItem(value);
    focusNumInput();
  };

  const inputOnChangeHandler = (value: number) => {
    setNumberOfItems(() => {
      return Number(value) < 1 ? 1 : Number(value);
    });
  };

  useEffect(() => {
    fetcher.submit(
      {
        resourceName: currentlySelectedItem,
        outputNumber: numberOfItems.toString(),
      },
      { method: "post", action: "/api/calculateTree" }
    );
  }, [numberOfItems, currentlySelectedItem]);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          inputOnChangeHandler(numberOfItems);
        }}
      >
        <select
          name="resourceName"
          onChange={(e) => {
            e.preventDefault();
            onChangeHandler(e.target.value);
          }}
          value={currentlySelectedItem}
        >
          {listOfItems
            .sort((a: string, b: string) => a.localeCompare(b))
            .map((item: string) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
        <input
          type="number"
          name="quantity"
          autoFocus={true}
          value={numberOfItems}
          onChange={(e) => {
            e.preventDefault();
            inputOnChangeHandler(Number(e.target.value));
          }}
        />
        {fetcher.state === "submitting" ? "Loading tree data..." : null}
      </Form>
      {fetcher.data ? buildTree(JSON.parse(fetcher.data)) : null}
    </div>
  );
};

export function buildTree(node: RecipeNode): JSX.Element[] {
  if (node.descendants.length !== 0) {
    return [
      <>
        {nodeJSXFormat(node)}
        {node.descendants.map((d: RecipeNode) => {
          return (
            <>
              <ul className="ml-4 list-none">
                <li>{buildTree(d)}</li>
              </ul>
            </>
          );
        })}
      </>,
    ];
  } else {
    return [nodeJSXFormat(node)];
  }
}

function nodeJSXFormat(node: RecipeNode) {
  return (
    <>
      <span className="text-orange-500">{Math.ceil(node.numRecipes)}</span>{" "}
      <span className="text-blue-500">{node.recipe.building.name}</span> produce{" "}
      <span className="text-orange-500">
        {Math.ceil(node.numRecipes * node.recipe.outputs[0].number)}
      </span>{" "}
      <span className="text-blue-500">{node.recipe.outputs[0].resource}</span>
    </>
  );
}
