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
  SELECT_REPORT_ROW,
  SELECT_TRANSACTION,
} from "./actions";
import store from "./store";

export interface State {
  transactions: Transaction[];
  accounts: Account[];
  selectedReportRowId: string;
  incomeReport: ReportRow[];
  outcomeReport: ReportRow[];
  selectedTransactionId: string;
}

const initialState: State = {
  accounts: [],
  incomeReport: [],
  outcomeReport: [],
  selectedReportRowId: "",
  selectedTransactionId: "",
  transactions: [],
};

export default function reducer(
  state = initialState,
  action: ActionTypes
): State {
  switch (action.type) {
    case PUT_TRANSACTIONS: {
        const colorList:string[] = ["#C0C0C0", "#808080", "#FF0000", "#800000",
            "#FFFF00", "#808000", "#00FF00", "#008000",
            "#00FFFF", "#008080", "#0000FF", "#000080",
            "#FF00FF", "#800080"];

        const accounts: Account[] = action.payload
            .map(t => t.account)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((name, index) => ({name, isSelected:true, colour: colorList[index % colorList.length]}));

      return { ...state, transactions: action.payload, accounts: accounts };
    }

    case SELECT_REPORT_ROW: {
        const reportRowId = action.payload;
        if (state.incomeReport.findIndex(x=>x.id === reportRowId) === -1 &&
            state.outcomeReport.findIndex(x=>x.id === reportRowId) === -1){
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
      return {
        ...state,
        incomeReport: state.incomeReport.filter((r) => r.id !== action.payload),
        outcomeReport: state.outcomeReport.filter((r) => r.id !== action.payload),
      };
    }

    case SELECT_TRANSACTION: {
        if (state.transactions.findIndex(t => t.id === action.payload) === -1){
            return state;
        }
        return {...state, selectedTransactionId: action.payload};
    }

    case ACCOUNT_SELECTION_CHANGE: {
      return {...state, accounts: state.accounts.map(account => account.name === action.payload.accountId ?
        {...account, isSelected: action.payload.selection} : account)}
    }

    case REMOVE_TRANSACTIONS_FROM_SELECTED_REPORT : {
      const removeIds = action.payload;
      const transactions = state.transactions.map(transaction => {
        if (removeIds.findIndex(r => r === transaction.id) === -1){
          return transaction;
        }
        return {...transaction, reportId: undefined};
      });
      return {...state, transactions: transactions};
    }

    case ADD_TRANSACTIONS_TO_SELECTED_REPORT: {
      const addedIds = action.payload;
      const transactions = state.transactions.map(transaction => {
        if (addedIds.findIndex(r => r === transaction.id) === -1){
          return transaction;
        }
        return {...transaction, reportId: state.selectedReportRowId};
      });
      return {...state, transactions: transactions};
    }

    default:
      return state;
  }
}
