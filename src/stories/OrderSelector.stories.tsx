import { StoryFn as Story, Meta } from "@storybook/react";
import OrderSelector from "../components/OrderSelector";

export default {
  title: "Components/OrderSelector",
  component: OrderSelector,
} as Meta<typeof OrderSelector>;

const Template: Story<typeof OrderSelector> = (args) => (
  <OrderSelector {...args} />
);

export const Ascending = Template.bind({});
Ascending.args = {
  order: "asc",
  setOrder: (order: "asc" | "desc") => console.log(order),
};

export const Descending = Template.bind({});
Descending.args = {
  order: "desc",
  setOrder: (order: "asc" | "desc") => console.log(order),
};
