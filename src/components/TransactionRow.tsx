import * as React from "react";
import { Transaction } from "../models";
import { CheckBox } from "./elements";

export interface Props {
  data: Transaction;
  selectionChange: (id: string, state: boolean) => void;
  isChecked: boolean;
  level: number;
  accountColor: string;
}

export default function TransactionRow({ data, isChecked, selectionChange, accountColor, level= 2 }: Props) {
  const rowPadding = ((level+1)*0.5) + "rem";
  const contentPadding = ((2-level)*0.5) + "rem";
  return (
    <div className="flex flex-grow pr-1 py-2 px-2 hover:bg-blue-300" style={{paddingLeft: rowPadding}}>
      <CheckBox checked={isChecked} labelText="" changed={(state: boolean) => selectionChange(data.id, state)} />
      <div className="select-none flex-grow flex">
        <div className="w-1 mr-1" style={{ backgroundColor: accountColor }}></div>
        <span className="text-gray-500 mr-2 w-20 truncate">
          {new Intl.NumberFormat('ru-RU', {minimumFractionDigits: 2}).format(Math.abs(data.amount))}
        </span>
        <p className="text-gray-500 w-20 pr-2" style={{paddingLeft: contentPadding}}>15.12, Сб</p>
        <p className="flex-grow text-gray-500">
          {data.place && <span>{data.place}</span>}
          <span className="text-sm text-gray-400 flex-shrink ml-2">{data.comment}
          </span>
        </p>
      </div>
    </div>
  );
}
