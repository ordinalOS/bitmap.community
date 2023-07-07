"use client";

import { Input } from "@/components/ui/input";
import { MetaData } from "@/types";
import { useState } from "react";

export function MetadataTable({ metaData }: { metaData: MetaData }) {
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
          .map(([key, value]) => {
            const paramValue =
              value === null
                ? "no data"
                : typeof value === "object"
                ? value.value
                : value;

            let rarity =
              value === null
                ? null
                : typeof value === "object"
                ? value.pr
                : null;
            const formattedRarity =
              rarity !== null ? Math.trunc(rarity * 100) % 100 : null;

            return (
              <li key={key} className="flex items-baseline py-1 max-w-full">
                <div>
                  <span className="text-muted-foreground">{key}</span>
                  {formattedRarity !== null && (
                    <span className={`text-orange-400 text-xs ml-4`}>
                      TOP{" "}
                      {formattedRarity === 0 ? 1 + "%" : formattedRarity + "%"}
                    </span>
                  )}
                </div>

                <p className="text-zinc-50 break-all max-w-lg ml-auto">
                  {String(paramValue)}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
