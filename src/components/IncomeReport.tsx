import React, { FC } from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import {
  SetSavingsAmount,
  AddReportRow,
  DeleteSelectedReportRow,
  SelectReportRow,
  RenameReportName,
} from "./../redux/actionCreators";
import { List, PrimaryButton, SecondaryButton } from "./elements";
import { AmountRow } from "./";
import {
  genId,
  getSelectedAccountsTransactions,
  sumTransactionsByReports,
} from "../utils/datalogic";
import { ReportType } from "../models";

const mapStateToProps = (s: State) => ({
  savings: s.savings,
  reportRows: s.incomeReport,
  transactions: getSelectedAccountsTransactions(s.transactions, s.accounts, ReportType.income),
  selectedReportRow: s.selectedReportRow,
  selectedReportType: s.selectedReportType,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      SetSavingsAmount,
      RenameReportName,
      AddReportRow,
      DeleteSelectedReportRow,
      SelectReportRow,
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const IncomeReport: FC<Props> = ({
  savings,
  SetSavingsAmount,
  AddReportRow,
  DeleteSelectedReportRow,
  SelectReportRow,
  selectedReportType,
  selectedReportRow,
  reportRows,
  transactions,
  RenameReportName,
}) => {
  const reportAmounts = sumTransactionsByReports(transactions);
  const isRestSelected = selectedReportType === ReportType.income && selectedReportRow === undefined;

  return (
    <>
      <List header="Доходы">
        {reportRows.map((r) => (
          <AmountRow
            title={r.name}
            amount={reportAmounts[r.id] ?? 0}
            onClick={() => SelectReportRow(r.id)}
            editType="title"
            onChanged={(title) => RenameReportName(r.id, title as string)}
            isSelected={r.id === selectedReportRow?.id}
          />
        ))}
        <AmountRow
          title="Прочее"
          amount={reportAmounts["unreported"]}
          editType="hideIcon"
          onClick={() => SelectReportRow(ReportType.income)}
          isSelected={isRestSelected}
        />
        <AmountRow
          title="Отложено"
          amount={savings}
          editType="amount"
          onChanged={(value) => SetSavingsAmount(value as number)}
        />
      </List>
      <div className="flex mt-2">
        <PrimaryButton
          text="Добавить"
          onClick={() => AddReportRow({ id: genId(), name: "Расход" }, ReportType.income)
          }
        />
        <SecondaryButton
          text="Удалить"
          onClick={DeleteSelectedReportRow}
          disabled={isRestSelected || selectedReportType !== ReportType.income}
        />
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeReport);
