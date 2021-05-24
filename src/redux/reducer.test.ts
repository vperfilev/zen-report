import { ActionTypes } from "./actions";
import reducer, { State } from "./reducer";
import { createStore, Store } from "redux";
import {
  accountSelectionChange,
  addReportRow,
  addTransactionsToSelectedReport,
  deleteSelectedReportRow,
  putTransactions,
  removeTransactionsFromSelectedReport,
  renameReportName,
  selectReportRow,
  selectTransaction,
} from "./actionCreators";
import { ReportType } from "../models/ReportType";

const createStoreWithData = ():Store<State, ActionTypes> => {
    const store: Store<State, ActionTypes> = createStore(reducer);
    putTransactions([
        {account: "1", id: "2", amount: 3000, category: "4", subCategory: "5", comment: "6", place: "7", time: 8, reportId: "r1"},
        {account: "11", id: "12", amount: 13000, category: "14", subCategory: "15", comment: "16", place: "17", time: 18, reportId: "r2"},
      ])(store.dispatch);

    addReportRow({id:"r1", name: "rep row 1"}, ReportType.income)(store.dispatch);
    addReportRow({id:"r2", name: "rep row 2"}, ReportType.outcome)(store.dispatch);

    selectReportRow("r1")(store.dispatch);
    selectTransaction("12")(store.dispatch);
    accountSelectionChange("1", false)(store.dispatch);

    return store;
}

describe("test reducer", () => {
  it("PutTransactions should put transactions", () => {
    const store: Store<State, ActionTypes> = createStore(reducer);
    const action = putTransactions([
      {account: "1", id: "2", amount: 3000, category: "4", subCategory: "5", comment: "6", place: "7", time: 8, reportId: undefined},
      {account: "11", id: "12", amount: 13000, category: "14", subCategory: "15", comment: "16", place: "17", time: 18, reportId: undefined},
    ]);

    action(store.dispatch);
    const state = store.getState();

    expect(state.transactions.length).toBe(2);
  });

  it("PutTransactions should clear transactions", () => {
    const store = createStoreWithData();
    const action = putTransactions([]);

    action(store.dispatch);

    const state = store.getState();
    expect(state.transactions.length).toBe(0);
  });

  it("PutTransactions should create accounts", () => {
    const store: Store<State, ActionTypes> = createStore(reducer);
    const action = putTransactions([
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
    const action = selectReportRow("r2");

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRow?.id).toBe("r2");
  });

  it("SelectReportRow should not select a report row if it doesn't exist", () => {
    const store: Store<State, ActionTypes> = createStoreWithData();
    const action = selectReportRow("rowId2");

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRow?.id).toBe("r1");
  });

  it("SelectTransaction should select transaction", () => {
    const store = createStoreWithData();
    const action = selectTransaction("2");

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedTransactionId).toBe("2")
  });

  it("SelectTransaction should not select transaction if it doesn't exist", () => {
    const store = createStoreWithData();
    const action = selectTransaction("22");

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedTransactionId).toBe("12")
  });

  it("AccountSelectionChange should select account", () => {
    const store = createStoreWithData();
    const action = accountSelectionChange("1", true);

    action(store.dispatch);

    const state = store.getState();
    expect(state.accounts[0].isSelected).toBe(true);
  });

  it("AccountSelectionChange should deselect account", () => {
    const store = createStoreWithData();
    const action = accountSelectionChange("11", false);

    action(store.dispatch);

    const state = store.getState();
    expect(state.accounts[0].isSelected).toBe(false);
  });

  it("RemoveTransactionsFromSelectedReport should remove transactions from selected report", () => {
    const store = createStoreWithData();
    const action = removeTransactionsFromSelectedReport(["12"]);

    action(store.dispatch);

    const state = store.getState();
    expect(state.transactions[0].reportId).toBe(undefined);
  });

  it("AddTransactionsToSelectedReport should add transactions to selected report", () => {
    const store = createStoreWithData();
    selectReportRow("r2")(store.dispatch);
    const action = addTransactionsToSelectedReport(["2"]);

    action(store.dispatch);

    const state = store.getState();
    expect(state.transactions[0].reportId).toBe("r2");
    expect(state.transactions[1].reportId).toBe("r2");
  });

  it("RenameReportName should change income report name", () => {
    const store = createStoreWithData();
    const action = renameReportName("r1", "repxxx");

    action(store.dispatch);

    const state = store.getState();
    expect(state.incomeReport[0].name).toBe("repxxx");
  });

  it("RenameReportName should change outcome report name", () => {
    const store = createStoreWithData();
    const action = renameReportName("r2", "repxxx");

    action(store.dispatch);

    const state = store.getState();
    expect(state.outcomeReport[0].name).toBe("repxxx");
  });

  it("DeleteReportRow should delete income report row", () => {
    const store = createStoreWithData();
    selectReportRow("r1")(store.dispatch);
    const action = deleteSelectedReportRow()

    action(store.dispatch);

    const state = store.getState();
    expect(state.incomeReport.length).toBe(0);
  });

  it("DeleteReportRow should delete outcome report row", () => {
    const store = createStoreWithData();
    selectReportRow("r2")(store.dispatch);
    const action = deleteSelectedReportRow()

    action(store.dispatch);

    const state = store.getState();
    expect(state.outcomeReport.length).toBe(0);
  });

  it("DeleteReportRow should select next income report row if deleted is selected", () => {
    const store = createStoreWithData();
    addReportRow({id:"r2", name: "rep row 1"}, ReportType.income)(store.dispatch);
    selectReportRow("r1")(store.dispatch);
    const action = deleteSelectedReportRow()

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRow?.id).toBe("r2");
  });

  it("DeleteReportRow should select prev income report row if deleted is selected and it's the last", () => {
    const store = createStoreWithData();
    addReportRow({id:"r12", name: "rep row 1"}, ReportType.income)(store.dispatch);
    selectReportRow("r1")(store.dispatch);
    const action = deleteSelectedReportRow()

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRow?.id).toBe("r12");
  });

  it("DeleteReportRow should select undef if it's income single", () => {
    const store = createStoreWithData();
    selectReportRow("r1")(store.dispatch);
    const action = deleteSelectedReportRow()

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRow?.id).toBe(undefined);
    expect(state.selectedReportType).toBe(ReportType.income);
  });

  it("DeleteReportRow should select next outcome report row if deleted is selected", () => {
    const store = createStoreWithData();
    addReportRow({id:"r22", name: "rep row 1"}, ReportType.outcome)(store.dispatch);
    selectReportRow("r2")(store.dispatch);
    const action = deleteSelectedReportRow()

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRow?.id).toBe("r22");
  });

  it("DeleteReportRow should select prev outcome report row if deleted is selected and it's the last", () => {
    const store = createStoreWithData();
    addReportRow({id:"r22", name: "rep row 1"}, ReportType.outcome)(store.dispatch);
    selectReportRow("r22")(store.dispatch);
    const action = deleteSelectedReportRow()

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRow?.id).toBe("r2");
  });

  it("DeleteReportRow should select undef if it's outcome single", () => {
    const store = createStoreWithData();
    selectReportRow("r2")(store.dispatch);
    const action = deleteSelectedReportRow()

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportType).toBe(ReportType.outcome);
  });

  it("DeleteReportRow should remove transactions from the report", () => {
    const store = createStoreWithData();
    selectReportRow("r1")(store.dispatch);
    const action = deleteSelectedReportRow();

    action(store.dispatch);

    const state = store.getState();
    expect(state.transactions[1].reportId).toBe(undefined);
  });

  it("AddReportRow should create income report row", () => {
    const store = createStoreWithData();
    const action = addReportRow({id: "rx1", name: "name1"}, ReportType.income);

    action(store.dispatch);

    const state = store.getState();
    expect(state.incomeReport.length).toBe(2);
    expect(state.incomeReport[1].id).toBe("rx1");
  });

  it("AddReportRow should create outcome report row", () => {
    const store = createStoreWithData();
    const action = addReportRow({id: "rx1", name: "name1"}, ReportType.outcome);

    action(store.dispatch);

    const state = store.getState();
    expect(state.outcomeReport.length).toBe(2);
    expect(state.outcomeReport[1].id).toBe("rx1");
  });

  it("AddReportRow should create empty report", () => {
    const store = createStoreWithData();
    const action = addReportRow({id: "rx1", name: "name1"}, ReportType.outcome);

    action(store.dispatch);

    const state = store.getState();
    expect(state.transactions.filter(t => t.reportId === "rx1").length).toBe(0);
  });
});
 