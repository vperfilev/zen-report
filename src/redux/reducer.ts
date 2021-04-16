import { Transaction, Account, ReportRow } from "./../models";
import { ActionTypes, PUT_TRANSACTIONS, SELECT_REPORT_ROW } from "./actions";

export interface State {
    transactions: Transaction[],
    accounts: Account[],
    selectedAccounts: string[],
    selectedReportRowId: string,
    incomeReport: ReportRow[],
    outcomeReport: ReportRow[],
    selectedTransactionId: string
}

const initialState: State = {
    accounts:[],
    incomeReport: [],
    outcomeReport: [],
    selectedAccounts: [],
    selectedReportRowId: "",
    selectedTransactionId: "",
    transactions: []
};

export default function reducer(state = initialState, action: ActionTypes): State {
    switch (action.type) {
        case PUT_TRANSACTIONS: {
            return {...state, transactions: action.payload}
        }

        case SELECT_REPORT_ROW: {
            return {...state, selectedReportRowId: action.payload}
        }
        
        default:
      return state;
    }
}
