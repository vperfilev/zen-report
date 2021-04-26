import { Account, Transaction, ReportType } from "./../models";

export function getSelectedAccountsTransactions(transactions: Transaction[], accounts: Account[], reportType: ReportType): Transaction[] {
    const selectedAccounts = accounts.filter((a) => a.isSelected);
    return transactions.filter((t) => reportType === ReportType.income ? t.amount > 0 : t.amount < 0)
      .filter((t) => selectedAccounts.findIndex((a) => a.name === t.account) !== -1);
}

export function getSelectedAccountsTransactionsAmount(transactions: Transaction[], accounts: Account[], reportType: ReportType): number {
  return getSelectedAccountsTransactions(transactions, accounts, reportType).reduce<number>((a,t) => a + t.amount, 0);
}

export function genId() {
  return new Date().getTime().toString();
}

export function sumTransactionsByReports(transactions: Transaction[]){
  let unreported = 0;
  const reportAmounts = transactions.reduce<{ [key: string]: number }>(
    (groups, t) => {
      const k = t.reportId;
      if (k !== undefined) {
        let value = groups[k];
        if (value === undefined) value = 0;
        value += t.amount;
        groups[k] = value;
      } else {
        unreported += t.amount;
      }
      return groups;
    },
    {}
  );
  reportAmounts["unreported"] = unreported;
  return reportAmounts;
}