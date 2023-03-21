import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AggridWrapper from "../components/AgGrid/AggridWrapper";
import DataJson from "../Data.json";
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
  rowData: DataJson,
  columnDefs: [
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
};
