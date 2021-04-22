import React, {FC} from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import {List} from "./elements";
import { ReportType } from "../models";
import { getSelectedAccountsTransactions } from "../utils/datalogic";
import AmountRow from "./AmountRow";

const mapStateToProps = (state: State) => ({ 
    incomeAmount: getSelectedAccountsTransactions(state.transactions, state.accounts, ReportType.income).reduce<number>((a, t) => a+t.amount, 0),
    outcomeAmount: -1 * getSelectedAccountsTransactions(state.transactions, state.accounts, ReportType.outcome).reduce<number>((a, t) => a+t.amount, 0),
    savings: state.savings
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const ReportTotal: FC<Props> = ({incomeAmount, outcomeAmount, savings}) =>{
    return (
        <List header="Баланс">
            <AmountRow title="Доход" value={Math.abs(incomeAmount)}/>
            <AmountRow title="Отложено" value={savings}/>
            <AmountRow title="Расход" value={Math.abs(outcomeAmount)}/>
            <AmountRow title="Баланс" value={incomeAmount - savings - outcomeAmount}/>
        </List>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportTotal);