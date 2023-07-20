"use client";

import { Input } from "@/components/ui/input";
import { numberFormatter } from "@/lib/utils";
import { BlockCardData, DataWithRarity, MetaData } from "@/types";
import { useState } from "react";

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

export const MetadataRow = ({
  title,
  value,
  rarity,
}: {
  title: string;
  value: string | number | null;
  rarity?: number;
}) => {
  const paramValue = value === null ? "-" : value;

  const getRarity = (rarity: number | undefined) => {
    if (rarity === undefined) return null;
    else if (rarity === 0) return 99;
    else if (rarity === 1) return 1;
    else return Math.trunc((1 - rarity) * 100);
  };

  const formattedRarity = getRarity(rarity);

  return (
    <li className="flex items-baseline py-1 max-w-full">
      <div>
        <span className="">{title}</span>
      </div>
      {formattedRarity !== null && (
        <span className={`text-orange-400 text-xs ml-4`}>
          TOP {formattedRarity + "%"}
        </span>
      )}
      <p className="text-zinc-50 break-all max-w-lg ml-auto">
        {typeof paramValue === "number"
          ? numberFormatter(paramValue)
          : paramValue}
      </p>
    </li>
  );
};
