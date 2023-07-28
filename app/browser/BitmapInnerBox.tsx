"use client";
import { DataWithRarity } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const BitmapInnerBox = ({
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
