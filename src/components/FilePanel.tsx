import * as React from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { CSVReader } from 'react-papaparse';

import { PrimaryButton, SecondaryButton } from "./elements";
import { PutTransactions } from "./../redux/actionCreators";
import { Transaction } from "./../models";
import { genId } from "../utils/dataLogic";

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ PutTransactions }, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

function FilePanel({ PutTransactions }: Props) {
  const csvEl = React.useRef(null);
  
  const handleOnFileLoad = (data: any) => {
    const baseId = genId();
    const transactions = data
      .filter((x: any, index: number) => index > 3)
      .map((x: any, index: number) => parseTransaction(x.data, baseId + "-" + index))
      .filter((x:Transaction)=> x !== null);
      PutTransactions(transactions);
  };

  const parseTransaction = (data: any, id: string): Transaction | null => {
      const incomeAmount = parseNumber(data[8]);
      const outcomeAmount = parseNumber(data[5]);
      const amount = incomeAmount - outcomeAmount;
      if (amount === 0){
        return null;
      }

      const categoryNames: string[] = data[1] && data[1].split('/').map((x: string) => x.trim());
      const categoryName = categoryNames !== undefined ? categoryNames[0] : "";
      const subCategoryName = categoryNames !== undefined ? categoryNames[1] : "";
      
      return {
        account: amount < 0 ? data[4] : data[7],
        amount: amount,
        category: categoryName ?? "",
        subCategory: subCategoryName ?? "", 
        comment: data[3],
        place: data[2], 
        time: (new Date(data[0])).getTime(), 
        reportId: undefined,
        id: id,

      } as Transaction;
  };

  const parseNumber = (value: string): number => {
    if(!value){
      return 0;
    }
    const result = Number.parseFloat(value.replace(',', '.'));
    return isNaN(result) ? 0 : result;
  }
  
  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data: any) => {
    PutTransactions([]);
  };

  const handleRemoveFile = (ref: any, e: any) => {
    if (ref.current) {
      ref.current.removeFile(e);
    }
  };

  const handleOpenDialog = (ref: any, e: any) => {
    if (ref.current) {
      ref.current.open(e);
    }
  };

  return (
    <div className="flex-grow mb-3 ml-6 h-12 grid justify-items-stretch">
    <CSVReader
    ref={csvEl}
    onFileLoad={handleOnFileLoad}
    onError={handleOnError}
    noClick
    noDrag
    onRemoveFile={handleOnRemoveFile}
  >
    {({ file }: any) => (
    <div className="flex ml-auto">
      <div className="w-96 border-2 border-gray-300 mr-1 ml-32 align-middle p-2 justify-self-end">
      <p className="overflow-ellipsis overflow-hidden">{file && file.name}</p>
      </div>
      <div className="w-64 flex">
        <PrimaryButton text="Загрузить" onClick={(e)=>handleOpenDialog(csvEl, e)} />
        <SecondaryButton text="Очистить" onClick={(e)=>handleRemoveFile(csvEl, e)} />
      </div>
    </div>
    )}
    </CSVReader>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilePanel);
