import YAML from "yaml";
import fs from "fs";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader() {
  // console.log
  const file = fs.readFileSync("/graph/data/resources.yml", "utf-8");
  const resources = YAML.parse(file);
  const cwd = process.env.PWD;
  return json({ resources });
}

export default function TestRoute() {
  const { data } = useLoaderData();

  return <>{JSON.stringify(data.resources)}</>;
}
