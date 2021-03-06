import React, {FC} from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { CSVReader } from "react-papaparse";
import * as objStore from "store";
import { useTranslation } from "react-i18next";
import { ParseResult } from 'papaparse';

import { PrimaryButton, SecondaryButton } from "./elements";
import { putTransactions } from "./../redux/actionCreators";
import { Transaction } from "./../models";
import { genId } from "../utils/dataFunc";
import ym from "../utils/yandexMetrica";

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ putTransactions }, dispatch);

type Props = ReturnType<typeof mapDispatchToProps>;

const FilePanel: FC<Props> = ({ putTransactions }) => {
  const csvEl = React.useRef(null);
  const { t } = useTranslation();

  const handleOnFileLoad = (data: ParseResult<any>[]) => {
    const baseId = genId();
    const transactions = data
      .filter((x: any, index: number) => index > 3)
      .map((x: any, index: number) =>
        parseTransaction(x.data, baseId + "-" + index)
      )
      .filter((x: Transaction | null) => x !== null);

    const deselectedAccounts = (objStore.get("disabled-accounts") ?? []) as Array<string>;
    
    ym("reachGoal", "OpenData");
    putTransactions(transactions as Transaction[], deselectedAccounts);
  };

  const parseTransaction = (data: any, id: string): Transaction | null => {
    const incomeAmount = parseNumber(data[8]);
    const outcomeAmount = parseNumber(data[5]);
    const amount = incomeAmount - outcomeAmount;
    if (amount === 0) {
      return null;
    }

    const categoryNames: string[] = data[1] && data[1].split("/").map((x: string) => x.trim());
    const categoryName = categoryNames !== undefined ? categoryNames[0] : "";
    const subCategoryName = categoryNames !== undefined ? categoryNames[1] : "";

    return {
      account: amount < 0 ? data[4] : data[7],
      amount: amount,
      category: categoryName ?? "",
      subCategory: subCategoryName ?? "",
      comment: data[3],
      place: data[2],
      time: new Date(data[0]).getTime(),
      reportId: undefined,
      id: id,
    } as Transaction;
  };

  const parseNumber = (value: string): number => {
    if (!value) {
      return 0;
    }
    const result = Number.parseFloat(value.replace(",", "."));
    return isNaN(result) ? 0 : result;
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data: any) => {
    putTransactions([]);
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
    <div className="flex-grow mb-3 h-12 mt-6">
      <CSVReader
        ref={csvEl}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noProgressBar={true}
        noDrag
        onRemoveFile={handleOnRemoveFile}
      >
        {({ file }: any) => (
          <div className="flex flex-row-reverse mx-auto mt-5">
            <div className="flex w-64">
              <PrimaryButton text={t("file-load")} onClick={(e) => handleOpenDialog(csvEl, e)} />
              <SecondaryButton text={t("file-clear")} onClick={(e) => handleRemoveFile(csvEl, e)} />
            </div>
            <div className="w-80 py-auto border-2 border-gray-300 mr-1 align-middle px-2 overflow-ellipsis overflow-hidden">
              {file && file.name}
            </div>
          </div>
        )}
      </CSVReader>
    </div>
  );
}

const connectedComponent = connect(null, mapDispatchToProps)(FilePanel);
export { connectedComponent as FilePanel};