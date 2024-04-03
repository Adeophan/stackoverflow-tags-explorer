import { StoryFn as Story, Meta } from "@storybook/react";
import SortSelector from "../components/SortSelector";

export default {
  title: "Components/SortSelector",
  component: SortSelector,
} as Meta<typeof SortSelector>;

const Template: Story<typeof SortSelector> = (args) => (
  <SortSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSortChange: (value: string) => console.log("Sort Changed:", value),
};
