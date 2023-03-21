import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {CustomDrawer} from "../components/AgGrid/CustomDrawer";

export default {
	title: "Ag-Grid/CusromDrawer",
	component: CustomDrawer,
	argTypes: {},
} as ComponentMeta<typeof CustomDrawer>;

const Template: ComponentStory<typeof CustomDrawer> = (args) => <CustomDrawer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    open:true,
};