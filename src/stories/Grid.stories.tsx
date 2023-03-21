import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AggridWrapper from "../components/AgGrid/AggirdWrapperComp/AggridWrapper";

export default {
  title: "Ag-Grid/Grid",
  component: AggridWrapper,
  argTypes: {},
} as ComponentMeta<typeof AggridWrapper>;

const Template: ComponentStory<typeof AggridWrapper> = (args) => (
  <AggridWrapper {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  columnDefs:  [
    { field: "athlete", type: "text" },
    { field: "sport", type: "text" },
    {
      field: "testSelect",
      type: "select",
      filterParams: { values: ["New", "Hello"], suppressAndOrCondition: true },
    },
    { field: "age", type: "number" },
    { field: "year", type: "number" },
    { field: "date", type: "date", width: 220 },
  ],
  dashboardName: "test",
  apiURL:'https://www.ag-grid.com/example-assets/olympic-winners.json'
};
