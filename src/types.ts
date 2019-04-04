declare interface Header {
  version: string;
  info: string;
}
declare interface Alignment {
  id: string;
  seq: string;
}

declare interface Block {
  consensus: string;
  seqs: string[];
  ids: string[];
}
declare interface Results {
  header: Header;
  alns: Alignment[];
  consensus: string;
}
