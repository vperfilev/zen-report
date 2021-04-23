import React, { FC, useEffect, useState } from "react";

import { formatAmount } from "../utils/formatters";
import { IconButton } from "./elements/IconButton";

export interface Props {
  title: string;
  amount: number;
  editType?: "none" | "hideIcon" | "title" | "amount";
  onChanged?: (value: string|number) => void;
}

const getIcon = (editType: string | undefined, isEditMode: boolean, handleButtonClick: ()=>void): JSX.Element | null => {
    const iconType=isEditMode ? "done" : "edit";
    switch (editType) {
        case "hideIcon": return <span className="ml-2 w-6 h-6"></span>;
        case "title":
        case "amount": 
            return <span className="ml-2"><IconButton iconType={iconType} onClick={handleButtonClick} /></span>;
    }
    return null;
}


const AmountRow: FC<Props> = ({ title, amount, editType, onChanged}) => {
    const [isEditMode, setEditMode] = useState(false);
    const [titleValue, setTitleValue] = useState(title);
    useEffect(() => { setTitleValue(title)}, [title] )

    const [amountValue, setAmountValue] = useState((amount ?? 0).toFixed(2));
    useEffect(() => { setAmountValue(amount.toString()) }, [amount] )

    const handleButtonClick = ()=>{
        if(isEditMode){
            setEditMode(false);
            if (onChanged !== undefined){
            if (editType === "amount")
            {
                const value = Number.parseFloat(amountValue);
                onChanged(value === Number.NaN ? 0 : value);
            }
            else if (editType === "title")
                onChanged(titleValue);
            }
        }else{
            setEditMode(true);
        }
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountValue(event.target.value);
      };
      
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
      };

    

  return (
    <div className="flex py-2 px-2">
        {isEditMode && editType === "title" ?
        <input className="border-2 border-gray-500 w-32" value={amountValue} type="number" onChange={handleTitleChange}></input> :
      <span className="flex-grow truncate text-gray-700">{titleValue}:&nbsp;</span>
  }
      {isEditMode && editType === "amount" ?
        <input className="border-2 border-gray-300 w-32 appearance-none h-6"  value={amountValue} type="text" onChange={handleAmountChange}></input> :
          <span className="text-gray-700">{formatAmount(amount)}</span>}
      {getIcon(editType, isEditMode, handleButtonClick)}
    </div>
  );
};

AmountRow.defaultProps = { editType: "none"};

export default AmountRow;
