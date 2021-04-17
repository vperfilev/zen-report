import { ActionTypes } from "./actions";
import reducer, { State } from "./reducer";
import { createStore, Store } from "redux";
import { PutTransactions, SelectReportRow } from "./actionCreators";

describe("test reducer", () => {
  it("PutTransactions should put transactions", () => {
    const store: Store<State, ActionTypes> = createStore(reducer);
    const action = PutTransactions([
      {
        account: "1",
        id: "2",
        amount: 3000,
        category: "4",
        subCategory: "5",
        comment: "6",
        place: "7",
        time: 8,
      },
      {
        account: "11",
        id: "12",
        amount: 13000,
        category: "14",
        subCategory: "15",
        comment: "16",
        place: "17",
        time: 18,
      },
    ]);

    action(store.dispatch);
    const state = store.getState();

    expect(state.transactions.length).toBe(2);
  });

  it("PutTransactions should clear transactions", () => {
    const store: Store<State, ActionTypes> = createStore(reducer);
    const action = PutTransactions([
      {
        account: "1",
        id: "2",
        amount: 3000,
        category: "4",
        subCategory: "5",
        comment: "6",
        place: "7",
        time: 8,
      },
      {
        account: "11",
        id: "12",
        amount: 13000,
        category: "14",
        subCategory: "15",
        comment: "16",
        place: "17",
        time: 18,
      },
    ]);
    action(store.dispatch);
    const clearAction = PutTransactions([]);

    clearAction(store.dispatch);

    const state = store.getState();
    expect(state.transactions.length).toBe(0);
  });

  it("SelectReportRow should select a report row", () => {
    const store: Store<State, ActionTypes> = createStore(reducer);
    const action = SelectReportRow("rowId");

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRowId).toBe("rowId");
  });

  it("SelectReportRow should not select a report row if it doesn't exist", () => {

  });

  it("SelectTransaction should select transaction", () => {

  });

  it("SelectTransaction should not select transaction if it doesn't exist", () => {

  });

  it("AccountSelectionChange should select account", () => {

  });

  it("AccountSelectionChange should deselect account", () => {

  });

  it("RemoveTransactionsFromSelectedReport should remove transactions from selected report", () => {

  });

  it("AddTransactionsToSelectedReport should add transactions to selected report", () => {

  });

  it("RenameReportName should change report name", () => {

  });

  it("DeleteReportRow should delete report row", () => {

  });

  it("DeleteReportRow should select next report row if deleted is selected", () => {

  });

  it("DeleteReportRow should remove transactions from the report", () => {

  });

  it("AddReportRow should create report row", () => {

  });

  it("AddReportRow should create empty report", () => {
      
  });
});
