import * as React from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { CSVReader } from 'react-papaparse';

import { PrimaryButton, SecondaryButton } from "./elements";
import { PutTransactions } from "./../redux/actionCreators";
import { ReportType, Transaction } from "./../models";
import { genId } from "../utils/datalogic";

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
      if (data[4] && data[7]) {
          return null
      }

      const transactionType = data[8] == null ? ReportType.outcome : ReportType.outcome;
      const time = (new Date(data[0])).getTime();
      
      const categoryNames: string[] = data[1] && data[1].split('/').map((x: string) => x.trim());
      const categoryName = categoryNames !== undefined ? categoryNames[0] : "";
      const subCategoryName = categoryNames !== undefined ? categoryNames[1] : "";
      
      const income = (new Number((data[5] ?? '0').replace(',', '.'))).valueOf();
      const outcome = (new Number((data[8] ?? '0').replace(',', '.'))).valueOf();

      const payee = data[2];
      const comment = data[3];
      return {
        account: data[4] + data[7],
        amount: outcome - income,
        category: categoryName ?? "",
        subCategory: subCategoryName ?? "", 
        comment: comment,
        place: payee, 
        time: time, 
        reportId: undefined,
        id: id,

      } as Transaction;
  };
  
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
    <CSVReader
    ref={csvEl}
    onFileLoad={handleOnFileLoad}
    onError={handleOnError}
    noClick
    noDrag
    onRemoveFile={handleOnRemoveFile}
  >
    {({ file }: any) => (
    <div className="flex-grow flex self-end mb-3 ml-6">
      <div className="flex-grow border-2 border-gray-300 mr-1 ml-32 align-middle p-2">
      {file && file.name}
      </div>
      <div className="w-64 flex">
        <PrimaryButton text="Загрузить" onClick={(e)=>handleOpenDialog(csvEl, e)} />
        <SecondaryButton text="Очистить" onClick={(e)=>handleRemoveFile(csvEl, e)} />
      </div>
    </div>
    )}
    </CSVReader>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilePanel);
