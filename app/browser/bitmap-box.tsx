import { BlockCardData } from "@/types";
import { colorSwitch } from "@/lib/utils";
import { BitmapInnerBox } from "./BitmapInnerBox";

export function BitmapBox({ params }: { params: BlockCardData }) {
  const { stats } = params;
  return (
    <>
      {Object.entries(stats).map(([key, value]) => {
        const bg = colorSwitch("bg", value.pr);

        return <BitmapInnerBox key={key} param={key} value={value} bg={bg} />;
      })}
    </>
  );
}
