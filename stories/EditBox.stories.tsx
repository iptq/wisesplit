import type { Meta, StoryObj } from "@storybook/react";
import {
  fireEvent,
  userEvent,
  waitFor,
  within,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import EditBox from "./EditBox";

const meta: Meta<typeof EditBox> = {
  component: EditBox,
  argTypes: { setValue: { action: true } },
};

export default meta;
type Story = StoryObj<typeof EditBox>;

export const Default: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Type into the box", async () => {
      await userEvent.click(canvas.getByTestId("editBox-view"));
      await userEvent.type(canvas.getByTestId("editBox-edit"), ", world");
    });

    await step("Submit the form", async () => {
      fireEvent.submit(canvas.getByTestId("editBox-form"));
    });

    await waitFor(() =>
      expect(args.setValue).toBeCalledWith(`${args.value}, world`),
    );
  },
};
