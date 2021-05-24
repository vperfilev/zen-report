import React, { FC } from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useTranslation } from "react-i18next";

import {
  setSavingsAmount,
  addReportRow,
  deleteSelectedReportRow,
  selectReportRow,
  renameReportName,
} from "./../redux/actionCreators";
import { List, PrimaryButton, SecondaryButton } from "./elements";
import { AmountRow } from "./";
import {
  genId,
  getSelectedAccountsTransactions,
  sumTransactionsByReports,
} from "../utils/dataFunc";
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
      setSavingsAmount,
      renameReportName,
      addReportRow,
      deleteSelectedReportRow,
      selectReportRow,
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const IncomeReport: FC<Props> = ({
  savings,
  setSavingsAmount,
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
  const isRestSelected = selectedReportType === ReportType.income && selectedReportRow === undefined;

  const addNewReportRow = () => {
    const id = genId();
    addReportRow({ id: id, name: t("income") }, ReportType.income);
    selectReportRow(id);
  };

  return (
    <>
      <List header={t("incomes")}>
        {reportRows.map((r) => (
          <AmountRow
            title={r.name}
            amount={reportAmounts[r.id] ?? 0}
            onClick={() => selectReportRow(r.id)}
            editType="title"
            onChanged={(title) => renameReportName(r.id, title as string)}
            isSelected={r.id === selectedReportRow?.id}
            key={r.id}
          />
        ))}
        <AmountRow
          title={t("other")}
          amount={reportAmounts["unreported"]}
          editType="hideIcon"
          onClick={() => selectReportRow(ReportType.income)}
          isSelected={isRestSelected}
          key="income"
        />
        <AmountRow
          title={t("savings")}
          amount={savings}
          editType="amount"
          onChanged={(value) => setSavingsAmount(value as number)}
          key="savings"
        />
      </List>
      <div className="flex mt-2">
        <PrimaryButton
          text={t("add")}
          onClick={() => addNewReportRow()}
        />
        <SecondaryButton
          text={t("delete")}
          onClick={deleteSelectedReportRow}
          disabled={isRestSelected || selectedReportType !== ReportType.income}
        />
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeReport);
