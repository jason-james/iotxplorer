import React from "react";

export const Tab = props => {
  const { name } = props.tab;
  const { activeTab, changeActiveTab } = props;

  return (
    <li
      className={name === activeTab ? "is-active" : ""}
      onClick={() => changeActiveTab(name)}
    >
      <a>{name}</a>
    </li>
  );
};
