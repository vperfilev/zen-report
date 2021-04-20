import * as React from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import groupBy from "lodash.groupby";

import List from "./elements/List";
import { SelectTransaction, RemoveTransactionsFromSelectedReport, AddTransactionsToSelectedReport } from "./../redux/actionCreators";
import { ReportType } from "../models/ReportType";
import { Transaction } from "../models";
import TransactionCategory from "./TransactionCategory";
import TransactionRow from "./TransactionRow";

const mapStateToProps = (state: State) => ({ 
    transactions: state.transactions, 
    accounts: state.accounts, 
    selectedReportType: state.selectedReportType,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({ SelectTransaction, RemoveTransactionsFromSelectedReport, AddTransactionsToSelectedReport }, dispatch);
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function TransactionList({ transactions, accounts, selectedReportType, RemoveTransactionsFromSelectedReport, AddTransactionsToSelectedReport }: Props) {
    
    const selectedAccounts = accounts.filter(a => a.isSelected);
    const filteredTransactions = transactions
        .filter(t => selectedReportType === ReportType.income ? t.amount > 0 : t.amount < 0)
        .filter(t => selectedAccounts.findIndex(a=>a.name === t.account) !== -1);
    const accountColours: { [id: string] : string; } = {};
    selectedAccounts.forEach(a => accountColours[a.name] = a.colour); 
    
    const groupedTransactions = groupBy(filteredTransactions, (t:Transaction) => t.category.trim());
    const categories: JSX.Element[] = [];

    for (var name in groupedTransactions) {
        if (name !== "" && Object.prototype.hasOwnProperty.call(groupedTransactions, name)) {
            categories.push(<TransactionCategory categoryName={name} transactions={groupedTransactions[name]} 
                accountColours={accountColours} key={"category#" + name}
                transactionSelectionChanged={(ids: string[], state: boolean) => {
                    if (state) {
                    AddTransactionsToSelectedReport(ids);
                    }else{
                    RemoveTransactionsFromSelectedReport(ids);
                    }
                } } />)
        }
    }

    groupedTransactions[""]?.map(t => categories.push(<TransactionRow isChecked={false} level={0}
        data={t} accountColor={accountColours[t.account]}
        selectionChange={(id, state) => state ? AddTransactionsToSelectedReport([id]) : RemoveTransactionsFromSelectedReport([id])} 
        key={t.id}  />));


  return (
    <div>
    <List header="Транзакции">
    {categories}

    </List>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);