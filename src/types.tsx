export type Odgovor = {
  ErrCode: number;
  ErrDesc: string | null;
  ErrArgs: string[] | null;
  Data: Racun;
};

export type Racun = {
  a: string;
  b: string;
  c: string;
  d: Date;
  e: number;
  f: string;
  g: string;
  h: number;
  z: Postavka[];
};

export type Postavka = {
  a: string;
  b: number;
  c: number;
};
