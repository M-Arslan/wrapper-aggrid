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

const getGridRowsData = (v:any) => {
  return fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((resp) => {
    return resp.json();
  })
  .then((data:any) => {
     return data;
  });
}

const createGridViewsData = async (view:any) => {
  const response = await fetch(
    "http://localhost:8000/addViews",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(view),
    }
  );
  const data = await response.json();
  return data;
}

const updateGridViewsData = async () => {  
  const response = await fetch(
    "http://localhost:8000/updateView"
  );
  const data = await response.json();
  return data;
}

const getGridViewsData = async () => {
  const response = await fetch(
    "http://localhost:8000/getAllViews"
  );
  const data = await response.json();
  return data;
}

const deleteGridViewsData = async (id:any) => {
  const response = await fetch(
    `http://localhost:8000/${id}`, { method: 'DELETE' }
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
      filterParams: { values: ["New", "Hello","test"], suppressAndOrCondition: true },
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
};
