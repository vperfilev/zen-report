import * as React from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { List } from "./elements";
import { formatAmount, formatDate } from "../utils/formatters";
import DetailsRow from "./DetailsRow";

const mapStateToProps = (state: State) => ({ 
    transaction: state.transactions.find(t => t.id === state.selectedTransactionId)
 });
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function DetailsPanel({transaction}: Props) {
  return (
    <List header="Детали">
      {transaction && <DetailsRow title="Дата" value={formatDate(transaction.time)} mutedValue={false}/>}
      {transaction && <DetailsRow title="Сумма" value={formatAmount(transaction.amount)} mutedValue={false}/>}
      {transaction && <DetailsRow title="Категория" value={`${transaction.category}${(transaction.category === "" || transaction.subCategory === "" ? "" : " / ")}${transaction.subCategory}`} mutedValue={false}/>}
      {transaction && <DetailsRow title="Счет" value={transaction.account} mutedValue={false}/>}
      {transaction && <DetailsRow title="Место" value={transaction.place} mutedValue={true}/>}
      {transaction && <DetailsRow title="Коментарий" value={transaction.comment} mutedValue={true}/>}
    </List>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPanel);