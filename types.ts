export type MetaData = {
  [key: string]: string | number | boolean | DataWithRarity;
}[];

export type BlockStatsFields =
  | "avg_fee_rate"
  | "avg_transaction_size"
  | "max_fee"
  | "max_fee_rate"
  | "max_transaction_size"
  | "total_fee"
  | "total_out"
  | "total_size"
  | "total_weight"
  | "transaction_count"
  | "utxo_increase_actual";

export type BlockTributesFields =
  | "is_1_tx"
  | "is_billionaire"
  | "is_epic"
  | "is_first_transaction"
  | "is_miner_message"
  | "is_palindrome"
  | "is_patoshi"
  | "is_patoshi_spent"
  | "is_pizza"
  | "is_rare"
  | "is_vintage";

export type BlockCardData = {
  rank: number;
  block_height: number;
  datetime: string;
  blocktributes: BlockTributes;
  stats: BlockStats;
};

export type BlockTributes = {
  [key in BlockTributesFields]: boolean;
};

export type BlockStats = {
  [key in BlockStatsFields]: DataWithRarity;
};
export type DataWithRarity = {
  value: number;
  pr: number;
};

export type ParamsWithRarity = {
  [key: string]: DataWithRarity;
};
