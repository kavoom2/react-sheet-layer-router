import React from "react";
import styles from "./TestComponent.module.scss";

console.log(styles);

const TestComponent: React.FC<{}> = () => {
  return <div className={styles.testButton}>TEST COMPONENT</div>;
};

export default TestComponent;
