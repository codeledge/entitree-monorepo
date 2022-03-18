export const isItemId = (itemId: string): boolean => !!itemId.match(/^Q\d+$/);
export const isProperyId = (propId: string): boolean =>
  !!propId.match(/^P\d+$/);
