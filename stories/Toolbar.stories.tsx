import type { Meta, StoryObj } from "@storybook/react";

import { Provider } from "react-redux";
import { defaultStoreOptions as defaultStoreOptions } from "../src/store";
import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import { receipt1 } from "./data/receipts";
import Toolbar from "./Toolbar";

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

const storeOptions: ConfigureStoreOptions = { ...defaultStoreOptions, preloadedState: receipt1 };

export const Default: Story = {
  render: () => (
    <Provider store={configureStore(storeOptions)}>
      <Toolbar />
    </Provider>
  ),
};
