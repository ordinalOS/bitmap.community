export type MetaData = {
  [key: string]: string | number | boolean | DataWithRarity;
}[];

export type BlockStatsFields =
  | "size"
  | "transaction_count"
  | "total_fee"
  | "total_rewards"
  | "mint_rewards"
  | "stripped_size"
  | "weight"
  | "avg_fee"
  | "avg_fee_rate"
  | "avg_tx_size"
  | "max_fee"
  | "max_fee_rate"
  | "max_transaction_size"
  | "median_fee"
  | "median_transaction_size"
  | "min_fee"
  | "min_fee_rate"
  | "min_transaction_size"
  | "ins"
  | "outs"
  | "subsidy"
  | "segwit_total_size"
  | "segwit_total_weight"
  | "segwit_transaction_count"
  | "total_out"
  | "total_weight"
  | "utxo_increase"
  | "utxo_size_increase"
  | "utxo_increase_actual"
  | "utxo_size_increase_actual";

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
  miner_message: MinerMessage;
  rarity: Rarity;
};

export type BlockTributes = {
  [key in BlockTributesFields]: boolean;
};

export type MinerMessage = {
  message: string;
  description: string;
  transaction_id: string;
};

export type BlockStats = {
  [key in BlockStatsFields]: DataWithRarity;
};
export type DataWithRarity = {
  value: number | null;
  pr: number;
};
export type Rarity = {
  rank: number;
  score: number;
};

export type ParamsWithRarity = {
  [key: string]: DataWithRarity;
};
