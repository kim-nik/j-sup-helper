import React from "react";
import NavLink from "./NavLink";

const tools = [
  { name: "Home", path: "/" },
  { name: "Tag Counter", path: "/tag-counter" },
  { name: "Data Analyzer", path: "/data-analyzer" },
  { name: "Chart Generator", path: "/chart-generator" },
];

export default function Navigation() {
  return (
    <nav className="flex space-x-4">
      {tools.map((tool) => (
        <NavLink key={tool.path} href={tool.path}>
          {tool.name}
        </NavLink>
      ))}
    </nav>
  );
}
