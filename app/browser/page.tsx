"use client";
import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BitmapCard } from "./bitmap-card";
import { BlockCardData } from "@/types";
import { Navbar } from "@/components/ui/navbar";

const traits = [
  "total_out",
  "total_size",
  "total_weight",
  "avg_fee_rate",
  "avg_transaction_size",
];

export default function Analyzer() {
  const [selectedTrait, setSelectedTrait] = useState<string>("total_out");

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
          LIMIT
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
    isFetching,
    isFetchingNextPage,
    status,
    isInitialLoading,
    isError,
    isLoading,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["bitmapsByTrait", selectedTrait],
    queryFn: fetchBitmaps,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === LIMIT ? pages.length : undefined;
    },
  });

  console.log(data);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col px-4 py-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-4 relative gap-6">
          <div className="col-span-4">
            <div className="flex gap-1 items-baseline">
              <div className="inline-flex bg-orange-500 w-4 h-4"></div>
              <div className="inline-flex bg-orange-400 w-4 h-4"></div>
              <div className="inline-flex bg-orange-300 w-4 h-4"></div>
            </div>
            <h1 className="text-4xl font-semibold mb-">Bitmap browser</h1>
          </div>

          <div>
            <span className="text-lg flex mb-4 text-muted-foreground">
              Traits
            </span>
            <div className="flex flex-col border-l">
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
          <div className="col-span-3">
            <span className="text-lg flex mb-4 text-muted-foreground">
              Bitmaps ranking
            </span>
            <section className="flex flex-col">
              {isInitialLoading && <span>Loading...</span>}
              {isError && error instanceof Error && (
                <span>{error.message}</span>
              )}
              {isSuccess && (
                <>
                  <div className="grid grid-cols-4 gap-6">
                    {data?.pages.map((group: BlockCardData[], i) => (
                      <Fragment key={i}>
                        {group.map((bitmap, index) => (
                          <BitmapCard
                            key={bitmap.block_height}
                            metadata={bitmap}
                            rank={index + 1}
                          />
                        ))}
                      </Fragment>
                    ))}
                  </div>
                  <Button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    variant="outline"
                    className="mx-auto"
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
