import { ReportType } from "../models/ReportType";
import { Transaction, Account, ReportRow } from "./../models";
import {
  ACCOUNT_SELECTION_CHANGE,
  ActionTypes,
  ADD_REPORT_ROW,
  ADD_TRANSACTIONS_TO_SELECTED_REPORT,
  DELETE_REPORT_ROW,
  PUT_TRANSACTIONS,
  REMOVE_TRANSACTIONS_FROM_SELECTED_REPORT,
  RENAME_REPORT_ROW,
  SELECT_REPORT_ROW,
  SELECT_TRANSACTION,
} from "./actions";

export interface State {
  transactions: Transaction[];
  accounts: Account[];
  selectedReportRowId: string | ReportType;
  incomeReport: ReportRow[];
  outcomeReport: ReportRow[];
  selectedTransactionId: string;
}

const initialState: State = {
  accounts: [],
  incomeReport: [],
  outcomeReport: [],
  selectedReportRowId: ReportType.income,
  selectedTransactionId: "",
  transactions: [],
};

export default function reducer(
  state = initialState,
  action: ActionTypes
): State {
  switch (action.type) {
    case PUT_TRANSACTIONS: {
      const colorList: string[] = [
        "#C0C0C0",
        "#808080",
        "#FF0000",
        "#800000",
        "#FFFF00",
        "#808000",
        "#00FF00",
        "#008000",
        "#00FFFF",
        "#008080",
        "#0000FF",
        "#000080",
        "#FF00FF",
        "#800080",
      ];

      const accounts: Account[] = action.payload
        .map((t) => t.account)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((name, index) => ({
          name,
          isSelected: true,
          colour: colorList[index % colorList.length],
        }));
      return { ...state, transactions: action.payload, accounts: accounts };
    }

    case SELECT_REPORT_ROW: {
      const reportRowId = action.payload;
      if (
        state.incomeReport.findIndex((x) => x.id === reportRowId) === -1 &&
        state.outcomeReport.findIndex((x) => x.id === reportRowId) === -1
      ) {
        return state;
      }
      return { ...state, selectedReportRowId: reportRowId };
    }

    case ADD_REPORT_ROW: {
      if (action.payload.reportType === ReportType.income) {
        return {
          ...state,
          incomeReport: [...state.incomeReport, action.payload.row],
        };
      } else {
        return {
          ...state,
          outcomeReport: [...state.outcomeReport, action.payload.row],
        };
      }
    }

    case DELETE_REPORT_ROW: {
      let selectedReportRowId: string | ReportType = state.selectedReportRowId;
      const id = action.payload;
      if (state.selectedReportRowId === id){
        const incomeIndex = state.incomeReport.findIndex(r => r.id === id);
        if (incomeIndex !== -1) {
          const newIncomeIndex = incomeIndex < (state.incomeReport.length - 1) ? incomeIndex + 1 : incomeIndex - 1;
          selectedReportRowId = newIncomeIndex < 0 ? ReportType.income : state.incomeReport[newIncomeIndex].id;
        }else{
          const outcomeIndex = state.outcomeReport.findIndex(r => r.id === id);
          if (outcomeIndex !== -1) {
            const newOutcomeIndex = outcomeIndex < (state.outcomeReport.length - 1) ? outcomeIndex + 1 : outcomeIndex - 1;
            selectedReportRowId = newOutcomeIndex < 0 ? ReportType.outcome : state.outcomeReport[newOutcomeIndex].id;
          }
        }
      }
      return {
        ...state,
        transactions: state.transactions.map(t => t.reportId === id ? {...t, reportId: undefined} : t),
        selectedReportRowId,
        incomeReport: state.incomeReport.filter((r) => r.id !== id),
        outcomeReport: state.outcomeReport.filter(
          (r) => r.id !== id
        ),
      };
    }

    case SELECT_TRANSACTION: {
      if (state.transactions.findIndex((t) => t.id === action.payload) === -1) {
        return state;
      }
      return { ...state, selectedTransactionId: action.payload };
    }

    case ACCOUNT_SELECTION_CHANGE: {
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.name === action.payload.accountId
            ? { ...account, isSelected: action.payload.selection }
            : account
        ),
      };
    }

    case REMOVE_TRANSACTIONS_FROM_SELECTED_REPORT: {
      const removeIds = action.payload;
      const transactions = state.transactions.map((transaction) => {
        if (removeIds.findIndex((r) => r === transaction.id) === -1) {
          return transaction;
        }
        return { ...transaction, reportId: undefined };
      });
      return { ...state, transactions: transactions };
    }

    case ADD_TRANSACTIONS_TO_SELECTED_REPORT: {
      const addedIds = action.payload;
      const transactions = state.transactions.map((transaction) => {
        if (addedIds.findIndex((r) => r === transaction.id) === -1) {
          return transaction;
        }
        return { ...transaction, reportId: state.selectedReportRowId };
      });
      return { ...state, transactions: transactions };
    }

    case RENAME_REPORT_ROW: {
      const reportId = action.payload.id;
      return {
        ...state,
        incomeReport: state.incomeReport.map((r) =>
          r.id !== reportId ? r : { ...r, name: action.payload.name }
        ),
        outcomeReport: state.outcomeReport.map((r) =>
          r.id !== reportId ? r : { ...r, name: action.payload.name }
        ),
      };
    }

    default:
      return state;
  }
}
