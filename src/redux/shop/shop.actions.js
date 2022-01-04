import ShopActionTypes from "./shop.types";

export const updateCollecitons = (collectionMap) => ({
    type:ShopActionTypes.UPDATE_COLLECTIONS,
    payload:collectionMap
})