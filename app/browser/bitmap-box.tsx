import { DataWithRarity, ParamsWithRarity } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { colorSwitch } from "@/lib/utils";

export function BitmapBox({ params }: { params: ParamsWithRarity }) {
  return (
    <div className="grid grid-cols-2 gap-1">
      {Object.entries(params).map(([key, value]) => {
        return (
          <BitmapInnerBox
            key={key}
            param={key}
            value={value as DataWithRarity}
          />
        );
      })}
    </div>
  );
}

const BitmapInnerBox = ({
  param,
  value,
}: {
  param: string;
  value: DataWithRarity;
}) => {
  const bg = colorSwitch("bg", value.pr);
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <div className={`text-xs ${bg} aspect-video hover:border `}></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {param}: {value.value}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
