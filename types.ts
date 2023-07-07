export type MetaData = {
  [key: string]: string | number | boolean | DataWithRarity;
}[];

export type BlockCardData = {
  rank: number;
  block_height: number;
  datetime: string;
  total_out: DataWithRarity;
  total_size: DataWithRarity;
  total_weight: DataWithRarity;
  avg_fee_rate: DataWithRarity;
  avg_transaction_size: DataWithRarity;
  is_rare: boolean;
  is_epic: boolean;
  is_nakamoto: boolean;
  is_first_transaction: boolean;
  is_pizza: boolean;
  is_vintage: boolean;
  is_palindrome: boolean;
  is_billionaire: boolean | null;
  is_1_tx: boolean | null;
};

export type DataWithRarity = {
  value: number;
  pr: number;
};

export type ParamsWithRarity = {
  [key: string]: DataWithRarity;
};
