import React, { FC, ReactNode } from "react";
import { ComponentTitle } from ".";

interface Props {
  [x: string]: ReactNode;
  header: string;
}

export const List: FC<Props> = (props: Props) => {
  return (
    <div className="divide-y-2 divide-gray-300">
      <ComponentTitle text={props.header} />
      {props.children}
    </div>
  );
};
