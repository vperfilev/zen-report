import React, {FC} from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useTranslation } from "react-i18next";

import { List } from "./elements";
import { ReportType } from "../models";
import { getSelectedAccountsTransactionsAmount } from "../utils/dataFunc";
import { AmountRow } from "./";

const mapStateToProps = (state: State) => ({ 
    incomeAmount: getSelectedAccountsTransactionsAmount(state.transactions, state.accounts, ReportType.income),
    outcomeAmount: -1 * getSelectedAccountsTransactionsAmount(state.transactions, state.accounts, ReportType.outcome),
    savings: state.savings
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const ReportTotal: FC<Props> = ({incomeAmount, outcomeAmount, savings}) =>{
    const { t } = useTranslation();
    return (
        <List header={t("total-balance")}>
            <AmountRow title={t("total-income")} amount={Math.abs(incomeAmount - savings)}/>
            <AmountRow title={t("total-outcome")} amount={Math.abs(outcomeAmount)}/>
            <AmountRow title={t("total-balance")} amount={incomeAmount - savings - outcomeAmount}/>
        </List>
    );
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ReportTotal);
export { connectedComponent as ReportTotal};