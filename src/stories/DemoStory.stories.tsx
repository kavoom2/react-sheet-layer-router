import { storiesOf } from "@storybook/react";
import * as React from "react";

const Demo = () => {
  return (
    <div>DEMO</div>
  )
};

storiesOf("State/DemoStory", module).add("DemoStory", () => <Demo />);
