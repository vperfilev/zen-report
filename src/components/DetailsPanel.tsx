import * as React from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useTranslation } from "react-i18next";

import { List } from "./elements";
import { formatAmount, formatDate } from "../utils/formatters";
import { DetailsRow } from "./";

const mapStateToProps = (state: State) => ({ 
    transaction: state.transactions.find(t => t.id === state.selectedTransactionId)
 });
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function DetailsPanel({transaction}: Props) {
  const { t } = useTranslation();
  return (
    <List header={t("details")}>
      {transaction && <DetailsRow title={t("date")} value={formatDate(transaction.time)} mutedValue={false}/>}
      {transaction && <DetailsRow title={t("amount")} value={formatAmount(transaction.amount)} mutedValue={false}/>}
      {transaction && <DetailsRow title={t("category")} value={`${transaction.category}${(transaction.category === "" || transaction.subCategory === "" ? "" : " / ")}${transaction.subCategory}`} mutedValue={false}/>}
      {transaction && <DetailsRow title={t("subcategory")} value={transaction.account} mutedValue={false}/>}
      {transaction && <DetailsRow title={t("place")} value={transaction.place} mutedValue={true}/>}
      {transaction && <DetailsRow title={t("commentary")} value={transaction.comment} mutedValue={true}/>}
    </List>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPanel);