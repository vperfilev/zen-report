import { ReportRow, Transaction } from "../models";
import { ReportType } from "../models/ReportType";

export const PUT_TRANSACTIONS = "PUT_TRANSACTIONS";
export const SELECT_REPORT_ROW = "SELECT_REPORT_ROW";
export const ADD_REPORT_ROW = "ADD_REPORT_ROW";
export const DELETE_REPORT_ROW = "DELETE_REPORT_ROW";
export const RENAME_REPORT_ROW = "RENAME_REPORT_ROW";
export const ADD_TRANSACTIONS_TO_SELECTED_REPORT =
  "ADD_TRANSACTIONS_TO_SELECTED_REPORT";
export const REMOVE_TRANSACTIONS_FROM_SELECTED_REPORT =
  "REMOVE_TRANSACTIONS_FROM_SELECTED_REPORT";
export const ACCOUNT_SELECTION_CHANGE = "ACCOUNT_SELECTION_CHANGE";
export const SELECT_TRANSACTION = "SELECT_TRANSACTION";

export interface PutTransactionsAction {
  type: typeof PUT_TRANSACTIONS;
  payload: Transaction[];
}

export interface SelectReportRowAction {
  type: typeof SELECT_REPORT_ROW;
  payload: string;
}

export interface AddReportRowAction {
  type: typeof ADD_REPORT_ROW;
  payload: { row: ReportRow; reportType: ReportType };
}

export interface DeleteReportRowAction {
  type: typeof DELETE_REPORT_ROW;
  payload: string;
}

export interface RenameReportRowAction {
  type: typeof RENAME_REPORT_ROW;
  payload: {
    id: string;
    name: string;
  };
}

export interface AddTransactionsToSelectedReportAction {
  type: typeof ADD_TRANSACTIONS_TO_SELECTED_REPORT;
  payload: string[];
}

export interface RemoveTransactionsFromSelectedReportAction {
  type: typeof REMOVE_TRANSACTIONS_FROM_SELECTED_REPORT;
  payload: string[];
}

export interface AccountSelectionChangeAction {
  type: typeof ACCOUNT_SELECTION_CHANGE;
  payload: {
    accountId: string;
    selection: boolean;
  };
}

export interface SelectTransactionAction {
  type: typeof SELECT_TRANSACTION;
  payload: string;
}

export type ActionTypes =
  | SelectTransactionAction
  | AccountSelectionChangeAction
  | RemoveTransactionsFromSelectedReportAction
  | AddTransactionsToSelectedReportAction
  | RenameReportRowAction
  | DeleteReportRowAction
  | AddReportRowAction
  | SelectReportRowAction
  | PutTransactionsAction;
