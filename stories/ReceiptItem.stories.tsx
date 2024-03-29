import ReceiptItem from "./ReceiptItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ReceiptItem> = {
  component: ReceiptItem,
  argTypes: {
    updateReceiptItem: { action: true },
  },
};

export default meta;
type Story = StoryObj<typeof ReceiptItem>;

export const Default: Story = {
  args: {
    receiptItem: {
      id: "id1",
      createdAt: Date.now(),
      name: "charcuterie board",
      price: 30,
      splitBetween: ["michael", "connie", "yichen"],
    },
  },
};
