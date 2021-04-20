import * as React from 'react';
import { Transaction } from "../models"
import { CheckBox } from './elements';
import TransactionRow from './TransactionRow';

interface Props {
    transactions: Transaction[];
    subCategoryName: string;
    accountColours: { [id: string] : string; };
    transactionSelectionChanged: (ids: string[], state: boolean) => void;
}

export default function TransactionSubcategory ({transactions, accountColours, transactionSelectionChanged, subCategoryName}: Props) {
    const transactionSum = transactions.reduce((acc: number, t: Transaction) => acc + t.amount, 0);
    const transactionsChecked = transactions.reduce((acc: boolean, t: Transaction) => (acc && t.reportId !== undefined), true);
    
  return (
    <>
      <div className="flex flex-grow py-2 pr-1 px-2 pl-4">
        <CheckBox
          labelText=""
          checked={transactionsChecked}
          changed={state =>
            transactionSelectionChanged(transactions.map((t) => t.id), state)
          }
        />
        <div className="select-none flex-grow flex">
          <span className="text-gray-800 mr-2 w-24 truncate">
            {new Intl.NumberFormat('ru-RU', {minimumFractionDigits: 2}).format(transactionSum)}
          </span>
          <p className="flex-grow text-gray-800">{subCategoryName}</p>
        </div>
      </div>
      {transactions.map(t => <TransactionRow isChecked={false} level={2}
          data={t} accountColor={accountColours[t.account]}
          selectionChange={(id, state) => transactionSelectionChanged([id], state)} key={t.id}  />)}
    </>
  );
}
