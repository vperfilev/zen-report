import React, { FC } from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { SetSavingsAmount, AddReportRow, DeleteSelectedReportRow, SelectReportRow, RenameReportName } from "./../redux/actionCreators"
import { List, PrimaryButton, SecondaryButton } from "./elements";
import { AmountRow } from "./";
import { getSelectedAccountsTransactions } from "../utils/datalogic";
import { ReportType } from "../models";

const mapStateToProps = (state: State) => ({ 
    savings: state.savings,
    reportRows: state.incomeReport,
    transactions: getSelectedAccountsTransactions(state.transactions, state.accounts, ReportType.income),
    selectedReportRow: state.selectedReportRow,
    selectedReportType: state.selectedReportType
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({ SetSavingsAmount, RenameReportName, AddReportRow, DeleteSelectedReportRow, SelectReportRow }, dispatch );
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const IncomeReport: FC<Props> = ({savings, SetSavingsAmount, AddReportRow, DeleteSelectedReportRow, SelectReportRow, 
    selectedReportType, selectedReportRow, reportRows, transactions, RenameReportName}) =>{
    const addReport = () => {   
        AddReportRow({id: (new Date().getTime()).toString(), name: "Расход"}, ReportType.income)
    }

    const removeReport = () => {
        DeleteSelectedReportRow();
    }

    const reportRowSelected = (id: string | undefined) => {
        SelectReportRow(id);
    }

    const TitleChanged = (id: string, title: string) => {
        RenameReportName(id, title);
    }

    let unreported = 0;
    const reportAmounts = transactions.reduce<{ [key: string]: number }>((groups, t) => {
        const k = t.reportId;
        if (k !== undefined) {
            let value = groups[k];
            if (value === undefined) value = 0;
            value += t.amount;
            groups[k] = value;
        } else {
            unreported += t.amount;
        }
        return groups
    }, {});

    const isRestSelected = selectedReportType === ReportType.income && selectedReportRow === undefined;

    return (
      <>
        <List header="Доходы">
          {reportRows.map((r) => (
            <AmountRow
              title={r.name}
              amount={reportAmounts[r.id] ?? 0}
              onClick={() => reportRowSelected(r.id)}
              editType="title"
              onChanged={(title) => TitleChanged(r.id, title as string)}
              isSelected={r.id === selectedReportRow?.id}
            />
          ))}
          <AmountRow title="Прочее" amount={unreported} editType="hideIcon" onClick={() => reportRowSelected(undefined)} 
          isSelected={isRestSelected}/>
          <AmountRow
            title="Отложено"
            amount={savings}
            editType="amount"
            onChanged={(value) => SetSavingsAmount(value as number)}
          />
        </List>
        <div className="flex mt-2">
          <PrimaryButton text="Добавить" onClick={addReport} />
          <SecondaryButton text="Удалить" onClick={removeReport} disabled={isRestSelected} />
        </div>
      </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomeReport);