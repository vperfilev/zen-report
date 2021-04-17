import { ActionTypes } from "./actions";
import reducer, { State } from "./reducer";
import { createStore, Store } from "redux";
import { AccountSelectionChange, AddReportRow, DeleteReportRow, PutTransactions, SelectReportRow, SelectTransaction } from "./actionCreators";
import { ReportType } from "../models/ReportType";

const createStoreWithData = ():Store<State, ActionTypes> => {
    const store: Store<State, ActionTypes> = createStore(reducer);
    PutTransactions([
        {account: "1", id: "2", amount: 3000, category: "4", subCategory: "5", comment: "6", place: "7", time: 8, reportId: "r1"},
        {account: "11", id: "12", amount: 13000, category: "14", subCategory: "15", comment: "16", place: "17", time: 18, reportId: "r2"},
      ])(store.dispatch);

    AddReportRow({id:"r1", name: "rep row 1"}, ReportType.income)(store.dispatch);
    AddReportRow({id:"r2", name: "rep row 2"}, ReportType.outcome)(store.dispatch);

    SelectReportRow("r1")(store.dispatch);
    SelectTransaction("12")(store.dispatch);
    AccountSelectionChange("1", false)(store.dispatch);

    return store;
}

describe("test reducer", () => {
  it("PutTransactions should put transactions", () => {
    const store: Store<State, ActionTypes> = createStore(reducer);
    const action = PutTransactions([
      {account: "1", id: "2", amount: 3000, category: "4", subCategory: "5", comment: "6", place: "7", time: 8, reportId: undefined},
      {account: "11", id: "12", amount: 13000, category: "14", subCategory: "15", comment: "16", place: "17", time: 18, reportId: undefined},
    ]);

    action(store.dispatch);
    const state = store.getState();

    expect(state.transactions.length).toBe(2);
  });

  it("PutTransactions should clear transactions", () => {
    const store = createStoreWithData();
    const action = PutTransactions([]);

    action(store.dispatch);

    const state = store.getState();
    expect(state.transactions.length).toBe(0);
  });

  it("PutTransactions should create accounts", () => {
    const store: Store<State, ActionTypes> = createStore(reducer);
    const action = PutTransactions([
      {account: "1", id: "2", amount: 3000, category: "4", subCategory: "5", comment: "6", place: "7", time: 8, reportId: undefined},
      {account: "11", id: "12", amount: 13000, category: "14", subCategory: "15", comment: "16", place: "17", time: 18, reportId: undefined},
      {account: "1", id: "12s", amount: 1300, category: "14", subCategory: "15", comment: "16", place: "17", time: 18, reportId: undefined},
    ]);

    action(store.dispatch);

    const state = store.getState();
    expect(state.accounts.length).toBe(2);
    expect(state.accounts[0].name).toBe("1");
    expect(state.accounts[1].name).toBe("11");
  });

  it("SelectReportRow should select a report row", () => {
    const store = createStoreWithData();
    const action = SelectReportRow("r2");

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRowId).toBe("r2");
  });

  it("SelectReportRow should not select a report row if it doesn't exist", () => {
    const store: Store<State, ActionTypes> = createStoreWithData();
    const action = SelectReportRow("rowId2");

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRowId).toBe("r1");
  });

  it("SelectTransaction should select transaction", () => {
    const store = createStoreWithData();
    const action = SelectTransaction("2");

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedTransactionId).toBe("2")
  });

  it("SelectTransaction should not select transaction if it doesn't exist", () => {
    const store = createStoreWithData();
    const action = SelectTransaction("22");

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedTransactionId).toBe("12")
  });

  it("AccountSelectionChange should select account", () => {
    const store = createStoreWithData();
    const action = AccountSelectionChange("1", true);

    action(store.dispatch);

    const state = store.getState();
    expect(state.accounts[0].isSelected).toBe(true);
  });

  it("AccountSelectionChange should deselect account", () => {
    const store = createStoreWithData();
    const action = AccountSelectionChange("11", false);

    action(store.dispatch);

    const state = store.getState();
    expect(state.accounts[0].isSelected).toBe(false);
  });

  it("RemoveTransactionsFromSelectedReport should remove transactions from selected report", () => {

  });

  it("AddTransactionsToSelectedReport should add transactions to selected report", () => {

  });

  it("RenameReportName should change report name", () => {

  });

  it("DeleteReportRow should delete report row", () => {
    const store = createStoreWithData();
    const action = DeleteReportRow("r1")

    action(store.dispatch);

    const state = store.getState();
    expect(state.incomeReport.length).toBe(0);
  });

  it("DeleteReportRow should select next report row if deleted is selected", () => {
    const store = createStoreWithData();
    
    const action = DeleteReportRow("r1")

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRowId).toBe(0);
  });

  it("DeleteReportRow should remove transactions from the report", () => {
    
  });

  it("AddReportRow should create income report row", () => {
    const store = createStoreWithData();
    const action = AddReportRow({id: "rx1", name: "name1"}, ReportType.income);

    action(store.dispatch);

    const state = store.getState();
    expect(state.incomeReport.length).toBe(2);
    expect(state.incomeReport[1].id).toBe("rx1");
  });

  it("AddReportRow should create outcome report row", () => {
    const store = createStoreWithData();
    const action = AddReportRow({id: "rx1", name: "name1"}, ReportType.outcome);

    action(store.dispatch);

    const state = store.getState();
    expect(state.outcomeReport.length).toBe(2);
    expect(state.outcomeReport[1].id).toBe("rx1");
  });

  it("AddReportRow should create empty report", () => {
    const store = createStoreWithData();
    const action = AddReportRow({id: "rx1", name: "name1"}, ReportType.outcome);

    action(store.dispatch);

    const state = store.getState();
    expect(state.transactions.filter(t => t.reportId === "rx1").length).toBe(0);
  });
});
 