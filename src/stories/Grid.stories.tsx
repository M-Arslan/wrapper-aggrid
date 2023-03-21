import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AggridWrapper from "../components/AgGrid/AggridWrapper";

export default {
	title: "Ag-Grid/Grid",
	component: AggridWrapper,
	argTypes: {},
} as ComponentMeta<typeof AggridWrapper>;

const Template: ComponentStory<typeof AggridWrapper> = (args) => <AggridWrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	rowData: [
    	{ make: "Toyota", model: "Celica", price: 35000, type: "sedan" },
    	{ make: "Nissan", model: "KDH", price: 32000, type: "van" },
    	{ make: "KIA", model: "Sorento", price: 72000, type: "jeep" }
	],
	columnDefs: [
    	{ field: "make", },
    	{ field: "model" },
    	{ field: "price" },
    	{ field: "type" }
	],
    dashboardName:"test"
};