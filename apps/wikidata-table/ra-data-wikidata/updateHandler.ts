import { Response, UpdateRequest } from "./Http";

export type UpdateOptions = {
  skipFields?: string[]; //i.e. Json fields throw error if null is used in update, they would expect {} instead
  allowFields?: string[]; //fields that will not be checked if it's a relationship or not
};

export const updateHandler = async <T extends { update: Function }>(
  req: UpdateRequest,
  res: Response,
  table: T,
  options?: UpdateOptions
) => {
  //Remove relations, allow nested updates one day

  const updated = await table.update({
    where: { id: +req.body.params.id },
    // data,
  });

  return res.json({ data: updated });
};
