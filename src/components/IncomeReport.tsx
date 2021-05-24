import React, { FC } from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const reportAmounts = sumTransactionsByReports(transactions);
  const isRestSelected = selectedReportType === ReportType.income && selectedReportRow === undefined;

  const addNewReportRow = () => {
    const id = genId();
    AddReportRow({ id: id, name: t("income") }, ReportType.income);
    SelectReportRow(id);
  };

  return (
    <>
      <List header={t("incomes")}>
        {reportRows.map((r) => (
          <AmountRow
            title={r.name}
            amount={reportAmounts[r.id] ?? 0}
            onClick={() => SelectReportRow(r.id)}
            editType="title"
            onChanged={(title) => RenameReportName(r.id, title as string)}
            isSelected={r.id === selectedReportRow?.id}
            key={r.id}
          />
        ))}
        <AmountRow
          title={t("other")}
          amount={reportAmounts["unreported"]}
          editType="hideIcon"
          onClick={() => SelectReportRow(ReportType.income)}
          isSelected={isRestSelected}
          key="income"
        />
        <AmountRow
          title={t("savings")}
          amount={savings}
          editType="amount"
          onChanged={(value) => SetSavingsAmount(value as number)}
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
          onClick={DeleteSelectedReportRow}
          disabled={isRestSelected || selectedReportType !== ReportType.income}
        />
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeReport);
