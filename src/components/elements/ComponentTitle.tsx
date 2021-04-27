import React, { FC } from "react";

interface Props {
  text: string;
}

export const ComponentTitle:FC<Props> = ({ text }) => {
  return <div className="text-xl text-blue-900 font-semibold mb-2">{text}</div>;
}
