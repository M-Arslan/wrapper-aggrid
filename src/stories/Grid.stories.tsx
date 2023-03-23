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

const getGridRowsData = () => {
  return fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((resp) => {
    return resp.json();
  })
  .then((data:any) => {
     return data;
  });
}

const createGridViewsData = (id:any) => {
  console.log(id);
}

const deleteGridViewsData = (view:any) => {
  console.log(view);
}

const updateGridViewsData = (view:any) => {
  console.log(view);
}

const getGridViewsData = async () => {
  const response = await fetch(
    "https://mocki.io/v1/5136124a-f937-4c49-bbc5-72db22b9b0f8"
  );
  const data = await response.json();
  return data;
}

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
  getGridRowsData:getGridRowsData,
  createGridViewsData:createGridViewsData,
  deleteGridViewsData:deleteGridViewsData,
  updateGridViewsData:updateGridViewsData,
  getGridViewsData:getGridViewsData,
  views:true
};
