import * as React from "react";

import { formatAmount } from "../utils/formatters";
import { CheckBox } from "./elements";

interface Props {
  checked: boolean;
  onChange: (ids: string[], state: boolean) => void;
  transactionIds: string[];
  categoryName: string;
  transactionSum: number;
  level: number;
  selectionIsEnabled: boolean;
}

export function TransactionHeaderRow({
  checked,
  onChange,
  transactionIds,
  categoryName,
  transactionSum,
  level,
  selectionIsEnabled
}: Props) {
  return (
    <div className="flex flex-grow py-2 px-2" style={{backgroundColor: level === 0 ? "rgb(147, 197, 253)" : "rgb(191, 219, 254)"}}>
      <CheckBox enabled={selectionIsEnabled} checked={checked} changed={(state:boolean) => onChange(transactionIds, state)}/>
      <div className="w-1 mr-1 bg-transparent"></div>
      <div className="flex-grow flex">
        <span className="text-gray-800 mr-2 w-20 truncate text-right">
          {formatAmount(transactionSum)}
        </span>
        <p className="flex-grow text-gray-800">{categoryName}</p>
      </div>
    </div>
  );
}
