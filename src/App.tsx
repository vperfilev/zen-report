import React from "react";
import { FilePanel } from "./components/FilePanel";
import { Logo } from "./components/Logo";

function App() {
  return (
    <div className="flex mx-6 pb-2 border-b-2">
      <Logo />
      <FilePanel />
    </div>
  );
}

export default App;
