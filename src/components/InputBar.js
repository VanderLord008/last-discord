import React from "react";

const InputBar = (props) => {
  return (
    <form onSubmit={props.messageAdder}>
      <input type="text" />
    </form>
  );
};

export default InputBar;
