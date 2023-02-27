import React from "react";

export const Btncomp = ({ label, cls, setRealTimeDisplay }) => {
  return (
    <div class={cls} onClick={() => setRealTimeDisplay(label)}>
      {label}
    </div>
  );
};
