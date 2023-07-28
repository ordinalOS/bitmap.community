import { numberFormatter } from "@/lib/utils";

export const getRarity = (rarity: number | undefined) => {
  if (rarity === undefined || rarity === null) return null;
  else if (rarity === 0) return 99;
  else if (rarity === 1) return 1;
  else return Math.ceil((1 - rarity) * 100);
};

export const MetadataRow = ({
  title,
  value,
  rarity,
}: {
  title: string;
  value: string | number | null;
  rarity?: number;
}) => {
  const paramValue = value === null ? "-" : value;

  const calculatedRarity = getRarity(rarity);

  const formattedRarity = calculatedRarity ? (
    calculatedRarity < 50 ? (
      <span className={`text-orange-400 text-xs ml-4`}>
        TOP {calculatedRarity + "%"}
      </span>
    ) : (
      <span className="text-muted-foreground text-xs ml-4 px-1">common</span>
    )
  ) : null;

  return (
    <li className="flex flex-col md:flex-row md:items-center py-1 max-w-full">
      <div>
        <span className="text-muted-foreground">{title}</span>
        {formattedRarity && formattedRarity}
      </div>
      <p className="text-zinc-50 break-all max-w-lg md:ml-auto">
        {typeof paramValue === "number"
          ? numberFormatter(paramValue)
          : paramValue}
      </p>
    </li>
  );
};
