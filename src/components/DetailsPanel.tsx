import * as React from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import List from "./elements/List";
import { formatAmount, formatDate } from "../utils/formatters";

const mapStateToProps = (state: State) => ({ 
    transaction: state.transactions.find(t => t.id === state.selectedTransactionId)
 });
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function DetailsPanel({transaction}: Props) {
  return (
    <List header="Детали">
      {transaction && <div className="flex py-2 px-2">
        <div className="text-gray-900 mr-2 font-bold">Дата:</div>
        <span className="text-gray-600">{formatDate(transaction.time)}</span>
      </div>}
      {transaction && <div className="flex py-2 px-2">
        <div className="text-gray-900 mr-2 font-bold">Сумма:</div>
        <span className="text-gray-600">{formatAmount(transaction.amount)}</span>
      </div>}
      {transaction && <div className="py-2 px-2">
        <span className="text-gray-900 mr-2 font-bold">Категория: </span>
        <span className="text-gray-600">{`${transaction.category}${(transaction.category === "" || transaction.subCategory === "" ? "" : " / ")}${transaction.subCategory}`}</span>
      </div>}
      {transaction && <div className="py-2 px-2">
        <span className="text-gray-900 mr-2 font-bold">Счет: </span>
        <span className="text-gray-500">{transaction.account}</span>
      </div>}
      {transaction && <div className="py-2 px-2">
        <span className="text-gray-900 mr-2 font-bold">Место:</span>
        <span className="text-gray-500 text-sm">{transaction.place}</span>
      </div>}
      {transaction && <div className="py-2 px-2">
        <span className="text-gray-900 mr-2 font-bold">Коментарий:</span>
        <span className="text-gray-500 text-sm font-thin">{transaction.comment}</span>
      </div>}
    </List>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPanel);