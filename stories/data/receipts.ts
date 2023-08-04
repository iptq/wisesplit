import { RootState } from "../../src/store";

export const receipt1: RootState = {
  total: { value: 30 },
  receiptItem: {
    ids: ["id1", "id2"],
    entities: {
      id1: {
        id: "id1",
        createdAt: Date.now(),
        name: "hello",
        price: 5.0,
        splitBetween: ["michael", "devin"],
      },

      id2: {
        id: "id2",
        createdAt: Date.now(),
        name: "world",
        price: 6.0,
        splitBetween: ["devin", "allen"],
      },
    },
  },
};
