import React, { FC } from "react";
import { DoneIcon, EditIcon } from "../icons";

interface Props {
    iconType: "edit" | "done" 
    onClick: () => void
}

function getIcon(type: string):JSX.Element {
    switch (type) {
        case "edit": return <EditIcon/>
        case "done": return <DoneIcon/>
        default: return <div></div>
    }
}

export const IconButton: FC<Props> = ({onClick, iconType}) => {
  return (
    <button className="focus:outline-none w-6 h-6 flex items-center px-1 text-gray-300 hover:text-gray-700"
        onClick={onClick}>
      {getIcon(iconType)}
    </button>
  );
}
