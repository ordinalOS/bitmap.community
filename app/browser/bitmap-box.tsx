import { BlockCardData, DataWithRarity, ParamsWithRarity } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { colorSwitch } from "@/lib/utils";

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
  return (
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
  );
};
