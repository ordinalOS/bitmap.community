"use client";
import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BitmapCard } from "./bitmap-card";
import { BlockCardData } from "@/types";
import { Navbar } from "@/components/ui/navbar";
import { HeatMap } from "@/components/ui/heatmap";

const traits = [
  "rarity_rank",
  "total_out",
  "total_size",
  "total_weight",
  "avg_fee_rate",
  "avg_transaction_size",
  "transaction_count",
  "total_fee",
  "total_rewards",
  "max_fee",
  "max_fee_rate",
  "max_transaction_size",
  "segwit_total_size",
  "segwit_total_weight",
  "utxo_increase_actual",
  "utxo_size_increase_actual",
];

export default function Browser() {
  const [selectedTrait, setSelectedTrait] = useState<string>("rarity_rank");

  const LIMIT = 50;

  const fetchBitmaps = async ({ pageParam = 0 }) => {
    let offset = pageParam * LIMIT;
    try {
      const res = await fetch(
        "http://api.bitmap.community/api/v1/metrics/rank?metric=" +
          selectedTrait +
          "&offset=" +
          offset +
          "&limit=" +
          LIMIT +
          "&api-key=" +
          process.env.NEXT_PUBLIC_API_KEY || ""
      );
      if (res.status === 404) {
        throw new Error("Couldn't fetch the bitmaps, try again later");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
    isError,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["bitmapsByTrait", selectedTrait],
    queryFn: fetchBitmaps,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === LIMIT ? pages.length : undefined;
    },
  });

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col px-4 py-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-4 relative gap-6">
          <div className="col-span-4">
            <div className="flex gap-1 items-baseline">
              <div className="inline-flex bg-orange-500 w-4 h-4"></div>
              <div className="inline-flex bg-orange-400 w-4 h-4"></div>
              <div className="inline-flex bg-orange-300 w-4 h-4"></div>
            </div>
            <h1 className="text-4xl font-semibold mb-">Bitmap Browser</h1>
          </div>
          <div className="col-span-4 md:col-span-1">
            <span className="text-lg flex mb-4 text-muted-foreground">
              Traits
            </span>
            <div className="flex md:flex-col border-l overflow-scroll md:overflow-hidden">
              {traits.map((trait) => (
                <Button
                  variant={selectedTrait === trait ? "default" : "ghost"}
                  key={trait}
                  className="justify-start"
                  onClick={() => setSelectedTrait(trait)}
                >
                  {selectedTrait === trait && ">_"}
                  {trait}
                </Button>
              ))}
            </div>
          </div>
          <div className="col-span-4 md:col-span-3 mb-4">
            <div className="flex flex-col md:flex-row justify-between md:items-start mb-4">
              <span className="text-lg flex text-muted-foreground">
                Ordered by {selectedTrait}
              </span>
              <HeatMap />
            </div>
            <section className="flex flex-col">
              {isInitialLoading && <span>Loading...</span>}
              {isError && error instanceof Error && (
                <span>{error.message}</span>
              )}
              {isSuccess && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {data?.pages.map((group: BlockCardData[], i) => (
                      <Fragment key={i}>
                        {group.map((bitmap, index) => (
                          <BitmapCard
                            key={bitmap.block_height}
                            metadata={bitmap}
                            rank={50 * i + index + 1}
                          />
                        ))}
                      </Fragment>
                    ))}
                  </div>
                  <Button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    variant="outline"
                    className="mx-auto mt-4"
                  >
                    {isFetchingNextPage
                      ? "Loading more..."
                      : hasNextPage
                      ? "Load More"
                      : "Nothing more to load"}
                  </Button>
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
