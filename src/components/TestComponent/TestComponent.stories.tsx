import * as React from "react";
import TestComponent from "./TestComponent";

export default {
  title: "TestComponent",
  component: TestComponent,
};

export const Primary = () => <TestComponent />;
Primary.storyName = "Primary";

export const Secondary = () => <TestComponent />;
Secondary.storyName = "Secondary";
