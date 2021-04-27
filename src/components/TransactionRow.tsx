import * as React from "react";
import { Transaction } from "../models";
import { formatAmount, formatDate } from "../utils/formatters";
import { AccountIcon, CheckBox } from "./elements";

export interface Props {
  data: Transaction;
  selectionChange: (id: string, state: boolean) => void;
  isChecked: boolean;
  accountColor: string;
  selectionIsEnabled: boolean;
  rowSelected: (id: string) => void;
  isSelected: boolean;
}

export default function TransactionRow({ data, isChecked, selectionChange, accountColor, selectionIsEnabled, isSelected, rowSelected}: Props) {
  return (
    <div className={"flex flex-grow pr-1 py-2 px-2 hover:bg-blue-100" + (isSelected ? " bg-blue-100" : "")}>
      <CheckBox enabled={selectionIsEnabled} checked={isChecked} changed={(state: boolean) => selectionChange(data.id, state)} />
      <div className="select-none flex-grow flex" onClick={()=>rowSelected(data.id)}>
        <AccountIcon colour={accountColor }/>
        <span className="text-gray-500 mr-2 w-20 truncate text-right">{formatAmount(Math.abs(data.amount))}</span>
        <p className="text-gray-500 w-20 pr-2">{formatDate(data.time)}</p>
        <p className="flex-grow text-gray-500">
          {data.place && <span className="mr-2">{data.place}</span>}
          <span className="text-sm text-gray-400 flex-shrink">{data.comment}</span>
        </p>
      </div>
    </div>
  );
}
