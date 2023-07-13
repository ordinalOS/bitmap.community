import { BlockCardData, ParamsWithRarity } from "@/types";
import { BitmapBox } from "./bitmap-box";
import Link from "next/link";

export function BitmapCard({
  metadata,
  rank,
}: {
  metadata: BlockCardData;
  rank: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-muted-foreground text-sm flex justify-between">
        <span className="text-primary inline-block">#{rank}</span>
        <Link
          href={{
            pathname: "/analyzer",
            query: { address: metadata.block_height },
          }}
          className="hover:text-orange-500 transition-colors"
        >
          {metadata.block_height}
        </Link>
      </p>
      <div className="grid grid-cols-6 gap-1">
        <BitmapBox params={metadata} />
      </div>
    </div>
  );
}
