import { AddressForm } from "../address-form";
import { MetadataTable } from "../metadata-table";
import { MetadataRow } from "../metadata-row";
import { BlockCardData, BlockStatsFields } from "@/types";
import { BitmapBox } from "../../browser/bitmap-box";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Info, Sparkles } from "lucide-react";
import { numberFormatter } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { HeatMap } from "@/components/ui/heatmap";

const mainTraits: BlockStatsFields[] = [
  "total_out",
  "size",
  "avg_fee_rate",
  "transaction_count",
];

const fetchBitmaps = async (blockHeight: string) => {
  try {
    const res = await fetch(
      "https://api.bitmap.community/api/v1/rarity/" +
        blockHeight +
        "?api-key=" +
        process.env.NEXT_PUBLIC_API_KEY || "",
      {
        next: {
          revalidate: 60,
        },
      }
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

export default async function Analyzer({
  params,
}: {
  params: { address: string };
}) {
  const data: BlockCardData[] = await fetchBitmaps(params.address);

  return (
    <>
      <AddressForm searchParam={params.address} />
      {data.length > 0 ? (
        <div className="grid gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <div className="flex flex-col gap-6 col-span-1 order-2 md:order-1">
              <div className="flex flex-col gap-2 relative">
                <h2 className="text-orange-400 text-muted-foreground">
                  [ Block Number ]
                </h2>
                <div className="flex gap-2 items-start">
                  <p className="text-5xl leading-none">
                    {numberFormatter(data[0].block_height)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 relative">
                <h2 className="text-orange-400 text-muted-foreground">
                  [ Rarity Rank ]
                </h2>
                <div className="flex flex-col">
                  <div className="flex gap-2 items-start relative w-fit">
                    <p className="text-3xl leading-none">
                      {numberFormatter(data[0].rarity.rank)}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="absolute top-1 -right-5">
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="max-w-xs flex flex-col gap-4">
                            <p className="text-lg leading-none">
                              [Rarity Score for a Bitmap Trait] = 1 / (1 -
                              [Percent Rank])
                            </p>
                            <p className="text-muted-foreground">
                              Total rarity score for a Bitmap is the sum of
                              rarity scores for the following traits: total_out,
                              total_size, transaction_count and avg_fee_rate
                              plus additional bonuses for blocktributes.
                            </p>
                            <p className="text-muted-foreground">
                              Blocktribute bonuses differ by it&apos;s on-chain
                              rarity. The below blocktributes are being used in
                              the rarity calculation (ordered most valued to
                              least valued):
                            </p>
                            <ol
                              type="1"
                              className="text-muted-foreground -mt-2"
                            >
                              <li>1. epic</li>
                              <li>2. rare</li>
                              <li>3. patoshi</li>
                              <li>4. miner message</li>
                              <li>5. sub 100</li>
                              <li>6. sub 10k</li>
                              <li>7. billionaire</li>
                              <li>8. 1 transaction</li>
                              <li>9. sub 100k</li>
                            </ol>
                            <p className="text-muted-foreground">
                              To include punks or other missing blocktributes in
                              the rarity calculation we need your help. Submit
                              missing blocktributes to the form below.
                              <br></br>
                              <br></br>
                              <strong>
                                NOTE: Our rarity algorithm is experimental and
                                subject to reweighting.
                              </strong>{" "}
                              Please reach out to @nft_wizop on twitter with any
                              questions or concerns.
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
                <div>
                  {mainTraits.map((trait) => (
                    <MetadataRow
                      key={trait}
                      title={trait}
                      value={data[0].stats[trait].value}
                      rarity={data[0].stats[trait].pr}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-orange-400 text-muted-foreground">
                  [ Blocktributes ]
                  <Link
                    href="https://forms.gle/vpwUwo5hGtsuMdNVA"
                    target="_blank"
                  >
                    <Button variant="link">
                      Submit blocktributes{" "}
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </Button>
                  </Link>
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(data[0].blocktributes)
                    .filter(([, value]) => value === true)
                    .map(([key]) => (
                      <Badge
                        className="bg-orange-300 hover:bg-orange-300 w-fit rounded-sm pr-2 pl-1 text-sm"
                        key={key}
                      >
                        <Sparkles className="mr-2 h-5 w-5" />
                        {key}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col order-1 md:order-2 gap-6">
              <div className="grid grid-cols-6 gap-1 h-fit">
                <BitmapBox params={data[0]} />
              </div>
              <HeatMap />
            </div>
          </div>
          {data[0].miner_message.message && (
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground text-orange-400">
                [ Miner messages ]
              </p>
              <p>{data[0].miner_message.message}</p>
              <p className="text-sm text-muted-foreground">
                {data[0].miner_message.description}
              </p>
            </div>
          )}
          <MetadataTable metaData={data[0]} />
        </div>
      ) : (
        <p className="mt-4">No data found. Try another block!</p>
      )}
    </>
  );
}
