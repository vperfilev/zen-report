import React, { FC } from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import {} from "./../redux/actionCreators";
import { PrimaryButton } from "./elements";
import IncomeReport from "./IncomeReport";
import { getSelectedAccountsTransactions, sumTransactionsByReports } from "../utils/datalogic";
import { ReportRow, ReportType, Transaction } from "../models";
import { resourceLimits } from "node:worker_threads";

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

function getReportBody(report: ReportRow[], amounts: Dictionary<number>): MdReportRow[] {
  const mdReportData = report.map(r => ({name: r.name, amount: (Math.abs(amounts[r.id] ?? 0)).toFixed(2)}));
  const unreported = Math.abs(amounts["unreported"] ?? 0);
  if (unreported > 0){
    mdReportData.push({name: "Прочее", amount: unreported.toFixed(2)});
  }
  return mdReportData;
}

function addAdditionalRows(report: MdReportRow[], transactions: Transaction[], col1Name: string, col2Name: string, savings=0) {
  const total = Math.abs(transactions.reduce((a, t) => a + t.amount, 0));
  report.push({name: "**Итог**", amount: `**${(total-savings).toFixed(2)}**`})
  report.unshift({name: col1Name, amount: col2Name});
  return report;
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

  const exportReport = () => {
    let incomeReportData = getReportBody(incomeReport, sumTransactionsByReports(incomeTransactions));
    if (savings !== 0) incomeReportData.push({name: "Отложено", amount: savings.toFixed(2)});
    incomeReportData = addAdditionalRows(incomeReportData, incomeTransactions, "Источник", "Сумма", savings);
    const incomeMdReport = fillReport(incomeReportData, "Доходы");
    
    let outcomeReportData = getReportBody(outcomeReport, sumTransactionsByReports(outcomeTransactions));
    outcomeReportData = addAdditionalRows(outcomeReportData, outcomeTransactions, "Расход", "Сумма");
    const outcomeMdReport = fillReport(outcomeReportData, "Расходы");

    const incomeAmount = incomeTransactions.reduce((a,t)=>a+t.amount, 0) - savings;
    const outcomeAmount = outcomeTransactions.reduce((a,t)=>a-t.amount, 0);
    const total = `Баланс: ${incomeAmount.toFixed(2)} - ${outcomeAmount.toFixed(2)} = **${(incomeAmount - outcomeAmount).toFixed(2)}**\n`;

    navigator.clipboard.writeText(incomeMdReport + outcomeMdReport + total);
  };

  return (
    <div className="flex">
      <PrimaryButton text="Скопировать как MD таблицу" onClick={exportReport} disabled={incomeTransactions.length === 0 && outcomeTransactions.length === 0 } />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MdExport);
