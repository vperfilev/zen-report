import React, {FC} from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useTranslation } from "react-i18next";

import {List} from "./elements";
import {
  selectTransaction,
  removeTransactionsFromSelectedReport,
  addTransactionsToSelectedReport,
} from "./../redux/actionCreators";
import { TransactionHeaderRow, TransactionRow } from "./";
import { getSelectedAccountsTransactions } from "../utils/dataFunc";

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
      selectTransaction,
      removeTransactionsFromSelectedReport,
      addTransactionsToSelectedReport,
    },
    dispatch
  );
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const TransactionList: FC<Props> = ({
  transactions,
  accounts,
  selectedReportType,
  selectedReport,
  selectedTransactionId,
  selectTransaction,
  removeTransactionsFromSelectedReport,
  addTransactionsToSelectedReport,
}) => {
  const { t } = useTranslation();
  const filteredTransactions = getSelectedAccountsTransactions(transactions, accounts, selectedReportType).filter(t=>t.reportId === selectedReport?.id || t.reportId === undefined);
  
  const accountColours: { [id: string]: string } = {};
  accounts.filter((a) => a.isSelected).forEach((a) => (accountColours[a.name] = a.colour));
  const selectionIsEnabled = selectedReport !== undefined;

  const handleTransactionsChanges = (ids: string[], state: boolean) => {
    if (state) {
      addTransactionsToSelectedReport(ids);
    } else {
      removeTransactionsFromSelectedReport(ids);
    }
  };

  const elements: JSX.Element[] = [];
  let previousCat: string | null = null;
  let previousSubCat: string | null = null;

  for (let i = 0; i < filteredTransactions.length; i++) {
    const transaction = filteredTransactions[i];
    if (transaction.category !== previousCat) {
      const catTransactions = filteredTransactions.filter((t) => t.category === transaction.category);
      const catAmount = Math.abs(catTransactions.reduce<number>((acc, transaction) => acc + transaction.amount, 0));
      elements.push(
        <TransactionHeaderRow
          checked={catTransactions.reduce<boolean>((acc, transaction) => transaction.reportId !== undefined && acc, true)}
          onChange={handleTransactionsChanges}
          transactionIds={catTransactions.map((t) => t.id)}
          categoryName={transaction.category === "" ? "* * *" : transaction.category}
          transactionSum={catAmount}
          selectionIsEnabled={selectionIsEnabled}
          level={0}
          key={"header-0-" + transaction.category}
        />
      );
      previousCat = transaction.category;
      previousSubCat = null;
    }

    if (transaction.subCategory !== previousSubCat && transaction.subCategory !== "") {
      const subCatTransactions = filteredTransactions.filter((t) => t.category === transaction.category && t.subCategory === transaction.subCategory);
      const subCatAmount = Math.abs(subCatTransactions.reduce<number>((acc, transaction) => acc + transaction.amount, 0));
      elements.push(
        <TransactionHeaderRow
          checked={subCatTransactions.reduce<boolean>((acc, transaction) => transaction.reportId !== undefined && acc, true)}
          onChange={handleTransactionsChanges}
          transactionIds={subCatTransactions.map((t) => t.id)}
          categoryName={transaction.subCategory === "" ? "* * *" : transaction.subCategory}
          transactionSum={subCatAmount}
          selectionIsEnabled={selectionIsEnabled}
          level={1}
          key={"header-1-" + transaction.subCategory}
        />
      );
      previousSubCat = transaction.subCategory;
    }

    elements.push(
      <TransactionRow
        isChecked={transaction.reportId !== undefined}
        selectionIsEnabled={selectionIsEnabled}
        data={transaction}
        accountColor={accountColours[transaction.account]}
        selectionChange={(id, state) => handleTransactionsChanges([id], state)}
        key={transaction.id}
        isSelected={selectedTransactionId === transaction.id}
        rowSelected={(id) => selectTransaction(id)}
      />
    );
  }

  return (
    <div>
      <List header={t("transactions")}>{elements}</List>
    </div>
  );
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(TransactionList);
export { connectedComponent as TransactionList};
