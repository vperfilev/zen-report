import { ActionTypes } from "./actions";
import reducer, { State } from "./reducer";
import { createStore, Store } from "redux";
import { PutTransactions, SelectReportRow } from "./actionCreators";

 
  describe("test reducer", () => {
    it("PutTransactions should put transactions", () => {
        const store: Store<State, ActionTypes> = createStore(reducer);
        const action = PutTransactions([
            {account: "1", id: "2", amount: 3000, category: "4", subCategory: "5", comment: "6",place: "7",time: 8},
            {account: "11", id: "12", amount: 13000, category: "14", subCategory: "15", comment: "16", place: "17", time: 18}
        ])

        action(store.dispatch);
        const state = store.getState();

        expect(state.transactions.length).toBe(2);
    });

    it("PutTransactions should clear transactions", () => {
        const store: Store<State, ActionTypes> = createStore(reducer);
        const action = PutTransactions([
            {account: "1", id: "2", amount: 3000, category: "4", subCategory: "5", comment: "6",place: "7",time: 8},
            {account: "11", id: "12", amount: 13000, category: "14", subCategory: "15", comment: "16", place: "17", time: 18}
        ])
        action(store.dispatch);
        const clearAction = PutTransactions([]);

        clearAction(store.dispatch);

        const state = store.getState();
        expect(state.transactions.length).toBe(0);
    });

    it("SelectReportRow should select a report", ()=> {
        const store: Store<State, ActionTypes> = createStore(reducer);
        const action = SelectReportRow("rowId");

        action(store.dispatch);

        const state = store.getState();
        expect(state.selectedReportRowId).toBe("rowId")        
    })
});