import React, { FC } from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useTranslation } from "react-i18next";

import { PrimaryButton } from "./elements";
import { getSelectedAccountsTransactions, sumTransactionsByReports } from "../utils/dataLogic";
import { ReportRow, ReportType, Transaction } from "../models";
import ym from "../utils/yandexMetrica";

const mapStateToProps = (state: State) => ({
    savings: state.savings,
    incomeTransactions: getSelectedAccountsTransactions(state.transactions, state.accounts, ReportType.income),
    outcomeTransactions: getSelectedAccountsTransactions(state.transactions, state.accounts, ReportType.outcome),
    incomeReport: state.incomeReport,
    outcomeReport: state.outcomeReport,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({}, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface Dictionary<T> {
    [Key: string]: T;
}

interface MdReportRow {
  name: string;
  amount: string;
}

function createLine(name: string, amount: string, nameWidth: number, amountWith: number, fill: string = " "): string {
  return `| ${name + fill.repeat(nameWidth - name.length)} | ${amount + fill.repeat(amountWith - amount.length)} |\n`
}

function getLineFunction(report: MdReportRow[]) {
  const nameColumnWidth = report.reduce((a,r) => a = a < r.name.length? r.name.length : a, 0); 
  const amountColumnWidth = report.reduce((a,r) => a = a < r.amount.length? r.amount.length : a, 0); 
  return (name: string, amount: string, fill: string = " ") => createLine(name, amount, nameColumnWidth, amountColumnWidth, fill);
}

function fillReport(report: MdReportRow[], header: string) {
  const line = getLineFunction(report);
  let result = `## ${header}\n\n`;
  result += line(report[0].name, report[0].amount);
  result += line("-", "-", "-");
  for (let index = 1; index < report.length; index++) {
    const reportLine = report[index];
    result += line(reportLine.name, reportLine.amount);
  }
  result += "\n\n";
  return result;
}

const MdExport: FC<Props> = ({savings, incomeTransactions, incomeReport, outcomeTransactions, outcomeReport}) => {
  const { t } = useTranslation();

  const addAdditionalRows = (report: MdReportRow[], transactions: Transaction[], col1Name: string, col2Name: string, savings=0) =>{
    const total = Math.abs(transactions.reduce((a, t) => a + t.amount, 0));
    report.push({name: `**${t("sum")}**`, amount: `**${(total-savings).toFixed(2)}**`})
    report.unshift({name: col1Name, amount: col2Name});
    return report;
  }

  const getReportBody = (report: ReportRow[], amounts: Dictionary<number>): MdReportRow[] => {
    const mdReportData = report.map(r => ({name: r.name, amount: (Math.abs(amounts[r.id] ?? 0)).toFixed(2)}));
    const unreported = Math.abs(amounts["unreported"] ?? 0);
    if (unreported > 0){
      mdReportData.push({name: t("other"), amount: unreported.toFixed(2)});
    }
    return mdReportData;
  }
  
  const exportReport = () => {
    ym("reachGoal", "ExportData");
    let incomeReportData = getReportBody(incomeReport, sumTransactionsByReports(incomeTransactions));
    if (savings !== 0) incomeReportData.push({name: t("savings"), amount: savings.toFixed(2)});
    incomeReportData = addAdditionalRows(incomeReportData, incomeTransactions, t("source"), t("amount"), savings);
    const incomeMdReport = fillReport(incomeReportData, t("Earned"));
    
    let outcomeReportData = getReportBody(outcomeReport, sumTransactionsByReports(outcomeTransactions));
    outcomeReportData = addAdditionalRows(outcomeReportData, outcomeTransactions, t("outcome"), t("amount"));
    const outcomeMdReport = fillReport(outcomeReportData, t("outcomes"));

    const incomeAmount = incomeTransactions.reduce((a,t)=>a+t.amount, 0) - savings;
    const outcomeAmount = outcomeTransactions.reduce((a,t)=>a-t.amount, 0);
    const total = `${t("total-balance")}: ${incomeAmount.toFixed(2)} - ${outcomeAmount.toFixed(2)} = **${(incomeAmount - outcomeAmount).toFixed(2)}**\n`;

    navigator.clipboard.writeText(incomeMdReport + outcomeMdReport + total);
  };

  return (
    <div className="flex">
      <PrimaryButton text={t("copy")} onClick={exportReport} disabled={incomeTransactions.length === 0 && outcomeTransactions.length === 0 } />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MdExport);
