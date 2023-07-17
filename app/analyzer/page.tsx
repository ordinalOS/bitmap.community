"use client";
import { useState } from "react";
import { AddressForm } from "./address-form";
import { MetadataTable } from "./metadata-table";
import { BlockCardData, MetaData } from "@/types";
import { Navbar } from "@/components/ui/navbar";
import { BitmapBox } from "../browser/bitmap-box";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeDollarSign, Banknote, Coins, Info } from "lucide-react";
import { numberFormatter } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Analyzer() {
  const [blockHeight, setBlockHeight] = useState<string | null>(null);
  const { data, isLoading, isFetching, isError } = useQuery<BlockCardData[]>({
    queryKey: ["bitmapByBlock", blockHeight],
    queryFn: async () => {
      const response = await fetch(
        "http://api.bitmap.community/api/v1/rarity/" + blockHeight
      );
      if (!response.ok) {
        throw new Error("Couldn't fetch the bitmaps, try again later");
      }
      return response.json();
    },
    enabled: !!blockHeight,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col px-4 py-8 max-w-3xl mx-auto">
        <div className="flex gap-1 items-baseline">
          <div className="inline-flex bg-orange-500 w-4 h-4"></div>
          <div className="inline-flex bg-orange-400 w-4 h-4"></div>
          <div className="inline-flex bg-orange-300 w-4 h-4"></div>
        </div>
        <h1 className="text-4xl font-semibold mb-6 mr-2 ">Bitmap analyzer</h1>
        <AddressForm setBlockHeight={setBlockHeight} isLoading={isFetching} />
        {isFetching && <p>Loading...</p>}
        {data && (
          <div className="grid gap-10">
            <div className="grid grid-cols-2 gap-6 my-10">
              <div className="flex flex-col gap-6 col-span-1">
                <div className="flex flex-col gap-2 relative">
                  <h2 className="text-orange-400 text-muted-foreground">
                    [ Rarity Score ]
                  </h2>
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-start">
                      <p className="text-5xl leading-none">
                        {numberFormatter(data[0].rarity.rank)}
                      </p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs flex flex-col gap-4">
                              <p className="text-lg leading-none">
                                [Rarity Score for a Bitmap Trait] = 1 / (1 -
                                [Percent Rank])
                              </p>
                              <p className="text-muted-foreground">
                                We are calculating the total Rarity Score for a
                                Bitmap as the sum of Rarity Scores for the
                                following trait values: total_out, total_size,
                                transaction_count and avg_fee_rate.
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Score {data[0].rarity.score}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-orange-400 text-muted-foreground">
                    [ Main Traits ]
                  </h2>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(data[0].blocktributes)
                      .filter(([, value]) => value === true)
                      .map(([key]) => (
                        <Badge
                          className="bg-orange-300 hover:bg-orange-300 w-fit rounded-sm pr-2 pl-1 text-sm"
                          key={key}
                        >
                          <BadgeDollarSign className="mr-2 h-5 w-5" />
                          {key}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-1 h-fit">
                <BitmapBox params={data[0]} />
              </div>
            </div>
            {data[0].miner_message && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-orange-400">
                  [ Miners message ]
                </p>
                <p>{data[0].miner_message.message}</p>
                <p className="text-sm text-muted-foreground">
                  {data[0].miner_message.description}
                </p>
              </div>
            )}
            <MetadataTable metaData={data[0]} />
          </div>
        )}
      </main>
    </>
  );
}
