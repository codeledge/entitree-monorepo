import { ALL_LANGS } from "..";

// keep compatibility
export interface Lang extends SecondLabel {
  code: LangCode;
  disambPageDesc: string;
}

export type SecondLabel = {
  code: LangCode;
  name: string;
};

export type LangCode = keyof typeof ALL_LANGS;
