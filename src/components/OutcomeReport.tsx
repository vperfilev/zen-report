import React, { FC } from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import {
  AddReportRow,
  DeleteSelectedReportRow,
  SelectReportRow,
  RenameReportName,
} from "./../redux/actionCreators";
import { List, PrimaryButton, SecondaryButton } from "./elements";
import { AmountRow } from "./";
import { getSelectedAccountsTransactions, genId, sumTransactionsByReports } from "../utils/datalogic";
import { ReportType } from "../models";

const mapStateToProps = (state: State) => ({
  reportRows: state.outcomeReport,
  transactions: getSelectedAccountsTransactions(
    state.transactions,
    state.accounts,
    ReportType.outcome
  ),
  selectedReportRow: state.selectedReportRow,
  selectedReportType: state.selectedReportType,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      RenameReportName,
      AddReportRow,
      DeleteSelectedReportRow,
      SelectReportRow,
    },
    dispatch
  );
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const OutcomeReport: FC<Props> = ({
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
  const isRestSelected = selectedReportType === ReportType.outcome && selectedReportRow === undefined;
  const addReport = () => {
    AddReportRow({ id: genId(), name: "Расход" }, ReportType.outcome)
  };

  return (
    <>
      <List header="Расходы">
        {reportRows.map((r) => (
          <AmountRow
            title={r.name}
            amount={Math.abs(reportAmounts[r.id] ?? 0)}
            onClick={() => SelectReportRow(r.id)}
            editType="title"
            onChanged={(title) => RenameReportName(r.id, title as string)}
            isSelected={r.id === selectedReportRow?.id}
          />
        ))}
        <AmountRow
          title="Прочее"
          amount={Math.abs(reportAmounts["unreported"])}
          editType="hideIcon"
          onClick={() => SelectReportRow(undefined)}
          isSelected={isRestSelected}
        />
      </List>
      <div className="flex mt-2">
        <PrimaryButton text="Добавить" onClick={addReport} />
        <SecondaryButton text="Удалить" onClick={DeleteSelectedReportRow} disabled={isRestSelected}/>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OutcomeReport);
