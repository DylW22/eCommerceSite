//import React from "react";
import { FeaturedProduct } from "../types";
import { getItemById } from "./getItemById";
import { FeaturedItemId } from "../types";

export const getFeaturedProducts = (
  itemIds: FeaturedItemId[]
): FeaturedProduct[] => {
  if (!Array.isArray(itemIds)) {
    throw new Error("featuredItemIds must be an array!");
  }

  if (!itemIds.length) return [];

  const itemsWithFeaturedPrice: (FeaturedProduct | null)[] = itemIds.map(
    (itemId: FeaturedItemId) => {
      const item = getItemById(String(itemId.id));
      if (!item) return null;
      return {
        ...item,
        featuredPrice: itemId.featuredPrice,
        promo: itemId.promo,
      };
    }
  );

  return itemsWithFeaturedPrice.filter(
    (item): item is FeaturedProduct => item !== null
  );
};
