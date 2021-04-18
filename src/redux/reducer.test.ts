import { ActionTypes } from "./actions";
import reducer, { State } from "./reducer";
import { createStore, Store } from "redux";
import { AccountSelectionChange, AddReportRow, AddTransactionsToSelectedReport, DeleteReportRow, PutTransactions, RemoveTransactionsFromSelectedReport, RenameReportName, SelectReportRow, SelectTransaction } from "./actionCreators";
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
    const store = createStoreWithData();
    const action = RemoveTransactionsFromSelectedReport(["12"]);

    action(store.dispatch);

    const state = store.getState();
    expect(state.transactions[1].reportId).toBe(undefined);
  });

  it("AddTransactionsToSelectedReport should add transactions to selected report", () => {
    const store = createStoreWithData();
    SelectReportRow("r2")(store.dispatch);
    const action = AddTransactionsToSelectedReport(["2"]);

    action(store.dispatch);

    const state = store.getState();
    expect(state.transactions[0].reportId).toBe("r2");
    expect(state.transactions[1].reportId).toBe("r2");
  });

  it("RenameReportName should change income report name", () => {
    const store = createStoreWithData();
    const action = RenameReportName("r1", "repxxx");

    action(store.dispatch);

    const state = store.getState();
    expect(state.incomeReport[0].name).toBe("repxxx");
  });

  it("RenameReportName should change outcome report name", () => {
    const store = createStoreWithData();
    const action = RenameReportName("r2", "repxxx");

    action(store.dispatch);

    const state = store.getState();
    expect(state.outcomeReport[0].name).toBe("repxxx");
  });

  it("DeleteReportRow should delete income report row", () => {
    const store = createStoreWithData();
    const action = DeleteReportRow("r1")

    action(store.dispatch);

    const state = store.getState();
    expect(state.incomeReport.length).toBe(0);
  });

  it("DeleteReportRow should delete outcome report row", () => {
    const store = createStoreWithData();
    const action = DeleteReportRow("r2")

    action(store.dispatch);

    const state = store.getState();
    expect(state.outcomeReport.length).toBe(0);
  });

  it("DeleteReportRow should select next income report row if deleted is selected", () => {
    const store = createStoreWithData();
    AddReportRow({id:"r2", name: "rep row 1"}, ReportType.income)(store.dispatch);
    SelectReportRow("r1")(store.dispatch);
    const action = DeleteReportRow("r1")

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRowId).toBe("r2");
  });

  it("DeleteReportRow should select prev income report row if deleted is selected and it's the last", () => {
    const store = createStoreWithData();
    AddReportRow({id:"r12", name: "rep row 1"}, ReportType.income)(store.dispatch);
    SelectReportRow("r1")(store.dispatch);
    const action = DeleteReportRow("r1")

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRowId).toBe("r12");
  });

  it("DeleteReportRow should select undef if it's income single", () => {
    const store = createStoreWithData();
    SelectReportRow("r1")(store.dispatch);
    const action = DeleteReportRow("r1")

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRowId).toBe(ReportType.income);
  });

  it("DeleteReportRow should select next outcome report row if deleted is selected", () => {
    const store = createStoreWithData();
    AddReportRow({id:"r22", name: "rep row 1"}, ReportType.outcome)(store.dispatch);
    SelectReportRow("r2")(store.dispatch);
    const action = DeleteReportRow("r2")

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRowId).toBe("r22");
  });

  it("DeleteReportRow should select prev outcome report row if deleted is selected and it's the last", () => {
    const store = createStoreWithData();
    AddReportRow({id:"r22", name: "rep row 1"}, ReportType.outcome)(store.dispatch);
    SelectReportRow("r22")(store.dispatch);
    const action = DeleteReportRow("r22")

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRowId).toBe("r2");
  });

  it("DeleteReportRow should select undef if it's outcome single", () => {
    const store = createStoreWithData();
    SelectReportRow("r2")(store.dispatch);
    const action = DeleteReportRow("r2")

    action(store.dispatch);

    const state = store.getState();
    expect(state.selectedReportRowId).toBe(ReportType.outcome);
  });

  it("DeleteReportRow should remove transactions from the report", () => {
    const store = createStoreWithData();
    const action = DeleteReportRow("r1");

    action(store.dispatch);

    const state = store.getState();
    expect(state.transactions[0].reportId).toBe(undefined);
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
 