import React from "react";
import { Provider } from "react-redux";
import FilePanel from "./components/FilePanel";
import { Logo } from "./components/Logo";
import  store  from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex mx-6 pb-2 border-b-2">
        <Logo />
        <FilePanel />
      </div>
    </Provider>
  );
}

export default App;
