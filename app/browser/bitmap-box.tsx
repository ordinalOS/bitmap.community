import { BlockCardData, DataWithRarity, ParamsWithRarity } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { colorSwitch } from "@/lib/utils";
import { useRef, useState } from "react";
import { useOnClickOutside, useScreen } from "usehooks-ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function BitmapBox({ params }: { params: BlockCardData }) {
  const { stats, blocktributes } = params;
  return (
    <>
      {Object.entries(stats).map(([key, value]) => {
        const bg = colorSwitch("bg", value.pr);

        return <BitmapInnerBox key={key} param={key} value={value} bg={bg} />;
      })}
    </>
  );
}

const BitmapInnerBox = ({
  param,
  value,
  bg,
}: {
  param: string;
  value: DataWithRarity;
  bg: string;
}) => {
  const screen = window.innerWidth;
  return screen > 768 ? (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`text-xs aspect-square hover:border `}
            style={{ backgroundColor: bg }}
          ></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {param}: {value.value}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Popover>
      <PopoverTrigger>
        <div
          className={`text-xs aspect-square hover:border `}
          style={{ backgroundColor: bg }}
        ></div>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <p className="text-center">
          {param}: {value.value}
        </p>
      </PopoverContent>
    </Popover>
  );
};
