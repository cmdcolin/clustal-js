export interface Header {
  version: string;
  info: string;
}
export interface Alignment {
  id: string;
  seq: string;
}

export interface Block {
  consensus: string;
  seqs: string[];
  ids: string[];
}
export interface Results {
  header: Header;
  alns: Alignment[];
  consensus: string;
}
