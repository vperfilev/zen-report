import React, { FC } from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useTranslation } from "react-i18next";

import {
  addReportRow,
  deleteSelectedReportRow,
  selectReportRow,
  renameReportName,
} from "./../redux/actionCreators";
import { List, PrimaryButton, SecondaryButton } from "./elements";
import { AmountRow } from "./";
import { getSelectedAccountsTransactions, genId, sumTransactionsByReports } from "../utils/dataFunc";
import { ReportType } from "../models";

const mapStateToProps = (state: State) => ({
  reportRows: state.outcomeReport,
  transactions: getSelectedAccountsTransactions(state.transactions, state.accounts, ReportType.outcome),
  selectedReportRow: state.selectedReportRow,
  selectedReportType: state.selectedReportType,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      renameReportName,
      addReportRow,
      deleteSelectedReportRow,
      selectReportRow,
    },
    dispatch
  );
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const OutcomeReport: FC<Props> = ({
  addReportRow,
  deleteSelectedReportRow,
  selectReportRow,
  selectedReportType,
  selectedReportRow,
  reportRows,
  transactions,
  renameReportName,
}) => {
  const { t } = useTranslation();
  const reportAmounts = sumTransactionsByReports(transactions);
  const isRestSelected = selectedReportType === ReportType.outcome && selectedReportRow === undefined;
  const addReport = () => {
    const id = genId();
    addReportRow({ id: id, name: t("outcome") }, ReportType.outcome);
    selectReportRow(id);
  };

  return (
    <>
      <List header={t("outcomes")}>
        {reportRows.map((r) => (
          <AmountRow
            title={r.name}
            amount={Math.abs(reportAmounts[r.id] ?? 0)}
            onClick={() => selectReportRow(r.id)}
            editType="title"
            onChanged={(title) => renameReportName(r.id, title as string)}
            isSelected={r.id === selectedReportRow?.id}
            key={r.id}
          />
        ))}
        <AmountRow
          title={t("other")}
          amount={Math.abs(reportAmounts["unreported"])}
          editType="hideIcon"
          onClick={() => selectReportRow(ReportType.outcome)}
          isSelected={isRestSelected}
          key="outcome"
        />
      </List>
      <div className="flex mt-2">
        <PrimaryButton text={t("add")} onClick={addReport} />
        <SecondaryButton text={t("delete")} onClick={deleteSelectedReportRow} disabled={isRestSelected || selectedReportType !== ReportType.outcome}/>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OutcomeReport);
