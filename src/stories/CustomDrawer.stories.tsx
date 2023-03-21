import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {CustomAgGridViews} from "../components/AgGrid/Views/CustomAgGridViews";

export default {
	title: "Ag-Grid/CustomAgGridViews",
	component: CustomAgGridViews,
	argTypes: {},
} as ComponentMeta<typeof CustomAgGridViews>;

const Template: ComponentStory<typeof CustomAgGridViews> = (args) => <CustomAgGridViews {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    open:true,
};