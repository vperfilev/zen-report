import * as React from "react";

export interface ILogoProps {}

export function Logo(props: ILogoProps) {
  return (
    <>
      <div className="font-mono font-extrabold text-5xl text-blue-900 animate-pulse  mb-2 ml-2 mt-2 mr-2 filter blur-sm">
        ZenReport
      </div>
      <div className="font-mono font-extrabold text-5xl text-white absolute left-0 top-0 mb-2 mr-2 ml-10 mt-4  ">
        ZenReport
      </div>
    </>
  );
}
