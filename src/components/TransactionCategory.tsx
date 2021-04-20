import groupBy from 'lodash.groupby';
import * as React from 'react';
import { Transaction } from "../models"
import { CheckBox } from './elements';
import TransactionRow from './TransactionRow';
import TransactionSubcategory from './TransactionSubcategory';

interface Props {
    transactions: Transaction[];
    categoryName: string;
    accountColours: { [id: string] : string; };
    transactionSelectionChanged: (ids: string[], state: boolean) => void;
}

export default function TransactionCategory ({transactions, transactionSelectionChanged, categoryName, accountColours}: Props) {
    const transactionSum = transactions.reduce((acc: number, t: Transaction) => acc + t.amount, 0);
    const transactionsChecked = transactions.reduce((acc: boolean, t: Transaction) => (acc && t.reportId !== undefined), true);

    const groupedTransactions = groupBy(transactions, (t:Transaction) => t.subCategory.trim());
    const subcategories: JSX.Element[] = [];

    for (var name in groupedTransactions) {
        if (name !== "" && Object.prototype.hasOwnProperty.call(groupedTransactions, name)) {
            subcategories.push(<TransactionSubcategory subCategoryName={name} transactions={groupedTransactions[name]} 
              key={"subcategory#" + name} accountColours={accountColours} transactionSelectionChanged={transactionSelectionChanged}/>)
        }
    }

    groupedTransactions[""]?.map(t => subcategories.push(<TransactionRow isChecked={false} level={1}
      data={t} accountColor={accountColours[t.account]}
      selectionChange={(id, state) => transactionSelectionChanged([id], state)} 
      key={t.id}  />));

  return (
    <>
      <div  className="flex flex-grow py-2 px-2">
        <CheckBox
          labelText=""
          checked={transactionsChecked}
          changed={state =>
            transactionSelectionChanged(transactions.map((t) => t.id), state)
          }
        />
        <div className="ml-2 select-none flex-grow flex">
          <span className="text-gray-800 mr-2 w-24 truncate">
            {new Intl.NumberFormat('ru-RU', {minimumFractionDigits: 2}).format(transactionSum)}
          </span>
          <p className="flex-grow text-gray-800">{categoryName}</p>
        </div>
      </div>
      {subcategories}
    </>
  );
}
