import { RootState } from "../../src/store";

export const receipt1: RootState = {
  receiptItem: {
    ids: ["id1", "id2"],
    entities: {
      id1: {
        name: "hello",
        price: 5.0,
        splitBetween: ["michael", "devin"],
      },

      id2: {
        name: "world",
        price: 6.0,
        splitBetween: ["devin", "allen"],
      },
    },
  },
};
