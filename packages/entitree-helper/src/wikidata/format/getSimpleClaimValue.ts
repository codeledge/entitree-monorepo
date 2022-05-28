import { SimpleClaims } from "../../types/Entity";

export function getSimpleClaimValue(
  simpleClaims: SimpleClaims | undefined,
  propId: string
) {
  try {
    return simpleClaims?.[propId][0].value;
  } catch (error) {}
}
