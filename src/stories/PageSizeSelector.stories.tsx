// PageSizeSelector.stories.tsx
import { StoryFn, Meta } from "@storybook/react";
import PageSizeSelector from "../components/PageSizeSelector"; // Adjust the import path as necessary

export default {
  title: "Components/PageSizeSelector",
  component: PageSizeSelector,
} as Meta<typeof PageSizeSelector>;

const Template: StoryFn<typeof PageSizeSelector> = (args) => (
  <PageSizeSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  pageSize: 10,
  setPageSize: (newPageSize: number) =>
    console.log("PageSize Changed:", newPageSize),
};
