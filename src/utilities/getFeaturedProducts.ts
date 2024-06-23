import React from "react";
import { FeaturedProduct } from "../types";
import { getItemById } from "./getItemById";
import { FeaturedItemId } from "../types";

export const getFeaturedProducts: any = (
  itemIds: FeaturedItemId[]
): FeaturedProduct[] | null => {
  //(StoreItemProps & { featuredPrice: number })
  if (!Array.isArray(itemIds)) {
    throw new Error("featuredItemIds must be an array!");
  }

  if (!itemIds.length) return null;

  const itemsWithFeaturedPrice: any = itemIds.map((itemId: FeaturedItemId) => {
    const item = getItemById(itemId.id);
    if (!item) return null;
    return { ...item, featuredPrice: itemId.featuredPrice };
  });
  // console.log("getting items: ", itemsWithFeaturedPrice);

  return itemsWithFeaturedPrice;
};
