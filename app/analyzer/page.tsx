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
import { BadgeDollarSign, Banknote, Coins } from "lucide-react";

const getBlockData = async (blockHeight: string) => {
  try {
    const res = await fetch(
      `http://api.bitmap.community/api/v1/rarity/${blockHeight}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function Analyzer() {
  const [blockHeight, setBlockHeight] = useState<string>("");
  const { data, isLoading, isError } = useQuery<BlockCardData[]>({
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
        <AddressForm setBlockHeight={setBlockHeight} isLoading={isLoading} />
        {isLoading && <p>Loading...</p>}
        {data && (
          <>
            <div className="grid grid-cols-4 gap-4 my-10">
              <div className="grid grid-cols-6 gap-1 max-w-[200px]">
                <BitmapBox params={data[0]} />
              </div>
              <div className="flex flex-col gap-2 col-span-3">
                <h2 className="text-xl min-w-fit ">[ Main traits ]</h2>
                <div className="flex gap-2 items-center">
                  {Object.entries(data[0].blocktributes)
                    .filter(([, value]) => value === true)
                    .map(([key]) => (
                      <Badge
                        className="bg-orange-300 hover:bg-orange-300 w-fit"
                        key={key}
                      >
                        <BadgeDollarSign className="mr-1" />
                        {key}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
            <MetadataTable metaData={data[0]} />
          </>
        )}
      </main>
    </>
  );
}
