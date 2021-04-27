import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

import { BlockDivider } from "./components/elements";
import {
  Logo,
  AccountsPanel,
  FilePanel,
  DetailsPanel,
  IncomeReport,
  MdExport,
  OutcomeReport,
  ReportTotal,
  TransactionList,
} from "./components";

function App() {
  return (
    <Provider store={store}>
      <div className="flex mx-6 pb-2 border-b-2 space-y-">
        <Logo />
        <FilePanel />
      </div>
      <div className="flex items-stretch pt-4">
        <div className="w-1/4 border-gray-300 ml-5 border-r-2 pr-5 flex-shrink-0">
          <IncomeReport />
          <BlockDivider />
          <OutcomeReport />
          <BlockDivider />
          <ReportTotal />
          <BlockDivider />
          <MdExport />
        </div>
        <div className="flex-grow divide-y-2 divide-gray-300 truncate mx-6">
          <TransactionList />
        </div>
        <div className="w-1/4 mr-5 border-l-2 pl-5 border-gray-300 flex-shrink-0">
          <AccountsPanel />
          <BlockDivider />
          <DetailsPanel />
        </div>
      </div>
    </Provider>
  );
}

export default App;
