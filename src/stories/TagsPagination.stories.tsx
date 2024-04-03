import { useState } from "react";
import { StoryFn as Story, Meta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import TagsPagination from "../components/TagsPagination";

export default {
  title: "Components/TagsPagination",
  component: TagsPagination,
} as Meta<typeof TagsPagination>;

const InteractiveTemplate: Story<typeof TagsPagination> = (args) => {
  const [page, setPage] = useState(args.page);

  return <TagsPagination {...args} page={page} onPageChange={setPage} />;
};

export const Default = InteractiveTemplate.bind({});
Default.args = {
  count: 169,
  pageSize: 10,
  page: 1,
};

export const Interactive = InteractiveTemplate.bind({});
Interactive.args = {
  count: 100,
  pageSize: 10,
  page: 1,
};

Interactive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: /next page/i }));
};
