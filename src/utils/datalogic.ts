import { Account, Transaction, ReportType } from "./../models";

export function getSelectedAccountsTransactions(transactions: Transaction[], accounts: Account[], reportType: ReportType): Transaction[] {
    const selectedAccounts = accounts.filter((a) => a.isSelected);
    return transactions.filter((t) => reportType === ReportType.income ? t.amount > 0 : t.amount < 0)
      .filter((t) => selectedAccounts.findIndex((a) => a.name === t.account) !== -1);
}