import { ActionCreator, Dispatch } from "redux";
import { ReportRow, Transaction } from "../models";
import { ReportType } from "../models/ReportType";
import {
  AccountSelectionChangeAction,
  ACCOUNT_SELECTION_CHANGE,
  ActionTypes,
  AddReportRowAction,
  AddTransactionsToSelectedReportAction,
  ADD_REPORT_ROW,
  ADD_TRANSACTIONS_TO_SELECTED_REPORT,
  DeleteReportRowAction,
  DELETE_REPORT_ROW,
  PutTransactionsAction,
  PUT_TRANSACTIONS,
  RemoveTransactionsFromSelectedReportAction,
  REMOVE_TRANSACTIONS_FROM_SELECTED_REPORT,
  RenameReportRowAction,
  RENAME_REPORT_ROW,
  SelectReportRowAction,
  SelectTransactionAction,
  SELECT_REPORT_ROW,
  SELECT_TRANSACTION,
  SetSavingsAmountAction,
  SET_SAVING_AMOUNT,
} from "./actions";

export function PutTransactions(
  transactions: Transaction[]
): ActionCreator<ActionTypes> {
  return (dispatch: Dispatch<ActionTypes>) => {
    const action: PutTransactionsAction = {
      type: PUT_TRANSACTIONS,
      payload: transactions,
    };
    return dispatch(action);
  };
}

export function SelectReportRow(
  reportRowId: string
): ActionCreator<ActionTypes> {
  return (dispatch: Dispatch<ActionTypes>) => {
    const action: SelectReportRowAction = {
      type: SELECT_REPORT_ROW,
      payload: reportRowId,
    };
    return dispatch(action);
  };
}

export function AddReportRow(
  row: ReportRow,
  reportType: ReportType
): ActionCreator<ActionTypes> {
  return (dispatch: Dispatch<ActionTypes>) => {
    const action: AddReportRowAction = {
      type: ADD_REPORT_ROW,
      payload: { row, reportType },
    };
    return dispatch(action);
  };
}

export function DeleteSelectedReportRow(): ActionCreator<ActionTypes> {
  return (dispatch: Dispatch<ActionTypes>) => {
    const action: DeleteReportRowAction = {
      type: DELETE_REPORT_ROW,
      payload: undefined,
    };
    return dispatch(action);
  };
}

export function RenameReportName(
  id: string,
  name: string
): ActionCreator<ActionTypes> {
  return (dispatch: Dispatch<ActionTypes>) => {
    const action: RenameReportRowAction = {
      type: RENAME_REPORT_ROW,
      payload: { id, name },
    };
    return dispatch(action);
  };
}

export function AddTransactionsToSelectedReport(
  transactionIDs: string[]
): ActionCreator<ActionTypes> {
  return (dispatch: Dispatch<ActionTypes>) => {
    const action: AddTransactionsToSelectedReportAction = {
      type: ADD_TRANSACTIONS_TO_SELECTED_REPORT,
      payload: transactionIDs 
    };
    return dispatch(action);
  };
}

export function RemoveTransactionsFromSelectedReport(
  transactionIDs: string[]
): ActionCreator<ActionTypes> {
  return (dispatch: Dispatch<ActionTypes>) => {
    const action: RemoveTransactionsFromSelectedReportAction = {
      type: REMOVE_TRANSACTIONS_FROM_SELECTED_REPORT,
      payload: transactionIDs,
    };
    return dispatch(action);
  };
}

export function AccountSelectionChange(
  accountId: string,
  selection: boolean
): ActionCreator<ActionTypes> {
  return (dispatch: Dispatch<ActionTypes>) => {
    const action: AccountSelectionChangeAction = {
      type: ACCOUNT_SELECTION_CHANGE,
      payload: { accountId, selection },
    };
    return dispatch(action);
  };
}

export function SelectTransaction(
  transactionId: string
): ActionCreator<ActionTypes> {
  return (dispatch: Dispatch<ActionTypes>) => {
    const action: SelectTransactionAction = {
      type: SELECT_TRANSACTION,
      payload: transactionId,
    };
    return dispatch(action);
  };
}

export function SetSavingsAmount(
  amount: number
): ActionCreator<ActionTypes> {
  return (dispatch: Dispatch<ActionTypes>) => {
    const action: SetSavingsAmountAction = {
      type: SET_SAVING_AMOUNT,
      payload: amount,
    };
    return dispatch(action);
  };
}
