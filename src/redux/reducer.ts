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
  SET_SAVING_AMOUNT,
} from "./actions";

export interface State {
  transactions: Transaction[];
  accounts: Account[];
  selectedReportRow: ReportRow | undefined;
  selectedReportType: ReportType
  incomeReport: ReportRow[];
  outcomeReport: ReportRow[];
  selectedTransactionId: string;
  savings: number;
}

const initialState: State = {
  accounts: [],
  incomeReport: [],
  outcomeReport: [],
  selectedReportRow: undefined,
  selectedReportType: ReportType.income,
  selectedTransactionId: "",
  transactions: [],
  savings: 0
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
        .sort((a,b) => a.localeCompare(b))
        .map((name, index) => ({
          name,
          isSelected: true,
          colour: colorList[index % colorList.length],
        }));

      const sortedTransactions = action.payload.sort((a,b) => 
        a.category === b.category ? 
          a.subCategory.localeCompare(b.subCategory) : 
          a.category.localeCompare(b.category));

      return { ...state, transactions: sortedTransactions, accounts: accounts };
    }

    case SELECT_REPORT_ROW: {
      const reportRowId = action.payload;
      const incomeRowIndex = state.incomeReport.findIndex((x) => x.id === reportRowId)
      if (incomeRowIndex !== -1) {
        return { ...state, selectedReportRow: state.incomeReport[incomeRowIndex], selectedReportType: ReportType.income};
      } else {
        const outcomeIndex = state.outcomeReport.findIndex((x) => x.id === reportRowId);
        if (outcomeIndex !== -1){
          return { ...state, selectedReportRow: state.outcomeReport[outcomeIndex], selectedReportType: ReportType.outcome};
        }
      }
      return state;
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
      let selectedReportRow = state.selectedReportRow
      const deletedId = selectedReportRow?.id;
      if (selectedReportRow !== undefined) {
        if (state.selectedReportType === ReportType.income){
          const incomeIndex = state.incomeReport.findIndex(r => r.id === selectedReportRow?.id);
          const newIncomeIndex = incomeIndex < (state.incomeReport.length - 1) ? incomeIndex + 1 : incomeIndex - 1;
          selectedReportRow = newIncomeIndex < 0 ? undefined : state.incomeReport[newIncomeIndex];
        } else {
          const outcomeIndex = state.outcomeReport.findIndex(r => r.id === selectedReportRow?.id);
          const newOutcomeIndex = outcomeIndex < (state.outcomeReport.length - 1) ? outcomeIndex + 1 : outcomeIndex - 1;
          selectedReportRow = newOutcomeIndex < 0 ? undefined : state.outcomeReport[newOutcomeIndex];
        }
        
        return {
          ...state,
          transactions: state.transactions.map(t => t.reportId === deletedId ? {...t, reportId: undefined} : t),
          selectedReportRow,
          incomeReport: state.incomeReport.filter((r) => r.id !== deletedId),
          outcomeReport: state.outcomeReport.filter((r) => r.id !== deletedId),
        };
      }
      return state;
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
        return { ...transaction, reportId: state.selectedReportRow?.id };
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

    case SET_SAVING_AMOUNT: {
      return {...state, savings: action.payload}
    }

    default:
      return state;
  }
}
