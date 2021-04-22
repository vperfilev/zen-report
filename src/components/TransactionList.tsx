import * as React from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import {List} from "./elements";
import {
  SelectTransaction,
  RemoveTransactionsFromSelectedReport,
  AddTransactionsToSelectedReport,
} from "./../redux/actionCreators";
import { ReportType } from "../models/ReportType";
import TransactionRow from "./TransactionRow";
import TransactionHeaderRow from "./TransactionHeaderRow";

const mapStateToProps = (state: State) => ({
  transactions: state.transactions,
  accounts: state.accounts,
  selectedReportType: state.selectedReportType,
  selectedReport: state.selectedReportRow,
  selectedTransactionId: state.selectedTransactionId,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      SelectTransaction,
      RemoveTransactionsFromSelectedReport,
      AddTransactionsToSelectedReport,
    },
    dispatch
  );
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

function TransactionList({
  transactions,
  accounts,
  selectedReportType,
  selectedReport,
  selectedTransactionId,
  SelectTransaction,
  RemoveTransactionsFromSelectedReport,
  AddTransactionsToSelectedReport,
}: Props) {
  const selectedAccounts = accounts.filter((a) => a.isSelected);
  const filteredTransactions = transactions
    .filter((t) =>
      selectedReportType === ReportType.income ? t.amount > 0 : t.amount < 0
    )
    .filter(
      (t) => selectedAccounts.findIndex((a) => a.name === t.account) !== -1
    );
  const accountColours: { [id: string]: string } = {};
  selectedAccounts.forEach((a) => (accountColours[a.name] = a.colour));
  const selectionIsEnabled = selectedReport !== undefined;

  const handleTransactionsChanges = (ids: string[], state: boolean) => {
    if (state) {
      AddTransactionsToSelectedReport(ids);
    } else {
      RemoveTransactionsFromSelectedReport(ids);
    }
  };

  const elements: JSX.Element[] = [];
  let previousCat: string | null = null;
  let previousSubCat: string | null = null;

  for (let i = 0; i < filteredTransactions.length; i++) {
    const transaction = filteredTransactions[i];
    if (transaction.category !== previousCat) {
      previousCat = transaction.category;
      previousSubCat = null;
      const catTransactions = filteredTransactions.filter(
        (t) => t.category === previousCat
      );
      const catAmount = Math.abs(
        catTransactions.reduce<number>(
          (acc, transaction) => acc + transaction.amount,
          0
        )
      );
      elements.push(
        <TransactionHeaderRow
          checked={catTransactions.reduce<boolean>(
            (acc, transaction) => transaction.reportId !== undefined && acc,
            true
          )}
          onChange={handleTransactionsChanges}
          transactionIds={catTransactions.map((t) => t.id)}
          categoryName={previousCat === "" ? "* * *" : previousCat}
          transactionSum={catAmount}
          selectionIsEnabled={selectionIsEnabled}
          level={0}
        />
      );
    }

    if (
      transaction.subCategory !== previousSubCat &&
      transaction.subCategory !== ""
    ) {
      previousSubCat = transaction.subCategory;
      const subCatTransactions = filteredTransactions.filter(
        (t) => t.category === previousCat && t.subCategory == previousSubCat
      );
      const subCatAmount = Math.abs(
        subCatTransactions.reduce<number>(
          (acc, transaction) => acc + transaction.amount,
          0
        )
      );
      elements.push(
        <TransactionHeaderRow
          checked={subCatTransactions.reduce<boolean>(
            (acc, transaction) => transaction.reportId !== undefined && acc,
            true
          )}
          onChange={handleTransactionsChanges}
          transactionIds={subCatTransactions.map((t) => t.id)}
          categoryName={previousSubCat === "" ? "* * *" : previousSubCat}
          transactionSum={subCatAmount}
          selectionIsEnabled={selectionIsEnabled}
          level={1}
        />
      );
    }

    elements.push(
      <TransactionRow
        isChecked={false}
        selectionIsEnabled={selectionIsEnabled}
        data={transaction}
        accountColor={accountColours[transaction.account]}
        selectionChange={(id, state) => handleTransactionsChanges([id], state)}
        key={transaction.id}
        isSelected={selectedTransactionId === transaction.id}
        rowSelected={(id) => SelectTransaction(id)}
      />
    );
  }

  return (
    <div>
      <List header="Транзакции">{elements}</List>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
