import { ClaimRank, ClaimSnak } from "./Claim";

export type Claim<Type> = {
  rank?: ClaimRank;
  qualifiers?: any;
  mainsnak: ClaimSnak<Type>;
  // references?: ClaimReference[];
};

export type SimpleClaimSnakTime = {
  value: {
    date: Date;
  };
};
