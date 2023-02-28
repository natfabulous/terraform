import { json } from "@remix-run/node";
import { generateTree } from "~/graph/calculate";
import { ActionArgs } from "@remix-run/server-runtime";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const resourceName = formData.get("resourceName") as string;
  const outputNumber = formData.get("outputNumber") as string;
  if (!resourceName) return;
  if (!outputNumber) return;
  const tree = generateTree(resourceName, Number(outputNumber));
  return json(JSON.stringify(tree));
}
