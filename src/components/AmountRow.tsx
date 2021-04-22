import * as React from "react";
import { formatAmount } from "../utils/formatters";

export interface Props {
  title: string;
  value: number;
}

export default function AmountRow({ title, value }: Props) {
  return (
    <div className="flex py-2 px-2">
      <span className="flex-grow truncate text-gray-700">{title}:&nbsp;</span>
      <span className="text-gray-700">{formatAmount(value)}</span>
    </div>
  );
}
