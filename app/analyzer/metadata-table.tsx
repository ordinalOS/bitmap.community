"use client";

import { Input } from "@/components/ui/input";
import { BlockCardData } from "@/types";
import { useState } from "react";
import { MetadataRow } from "./metadata-row";

export function MetadataTable({ metaData }: { metaData: BlockCardData }) {
  const [search, setSearch] = useState("");
  const { blocktributes, stats, miner_message, rarity, ...blockMetadata } =
    metaData;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4 mt-8 gap-8">
        <h2 className="text-muted-foreground text-orange-400">
          [ All Metadata ]
        </h2>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="&gt;_ Search metadata"
          className="max-w-xs"
        />
      </div>
      <ul className="divide-y">
        {Object.entries(blockMetadata)
          .filter((row) => row[0].includes(search))
          .map(([key, value]) => {
            return <MetadataRow key={key} title={key} value={value} />;
          })}
        {Object.entries(stats)
          .filter((row) => row[0].includes(search))
          .map(([key, value]) => {
            return (
              <MetadataRow
                key={key}
                title={key}
                value={value.value}
                rarity={value.pr}
              />
            );
          })}
      </ul>
    </div>
  );
}
