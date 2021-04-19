import * as React from "react";

export interface IFilePanelProps {}

export function FilePanel(props: IFilePanelProps) {
  return (
    <div className="flex-grow flex self-end mb-3 ml-6">
      <div className="flex-grow border-2 border-gray-300 mr-1 ml-32">
        fileName.csv
      </div>
      <div className="w-64 flex">
        <button className="focus:outline-none flex-grow text-white text-sm py-1 mr-1 px-5 bg-blue-900 hover:bg-blue-600 hover:shadow-md">
          Select file
        </button>
        <button className="focus:outline-none text-white flex-grow text-sm py-1 px-5 bg-red-900 hover:bg-red-600 hover:shadow-md">
          Clear file
        </button>
      </div>
    </div>
  );
}
