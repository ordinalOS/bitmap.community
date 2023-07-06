"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export function MetadataTable({ metaData }: { metaData: MetaData }) {
  console.log(metaData);
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4 mt-8 gap-8">
        <h2 className="text-zinc-400 text-xl min-w-fit ">[Block Metadata]</h2>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="&gt;_ Search metadata"
          className="max-w-xs"
        />
      </div>
      <ul className="divide-y">
        {Object.entries(metaData[0])
          .filter((row) => row[0].includes(search))
          .map(([key, value]) => (
            <li className="flex py-1 justify-between" key={key}>
              <span className="text-zinc-400">{key}</span>
              <span className="text-zinc-50 break-words">{String(value)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
