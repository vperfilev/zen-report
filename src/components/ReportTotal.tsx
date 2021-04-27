import React, {FC} from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { List } from "./elements";
import { ReportType } from "../models";
import { getSelectedAccountsTransactionsAmount } from "../utils/dataLogic";
import { AmountRow } from "./";

const mapStateToProps = (state: State) => ({ 
    incomeAmount: getSelectedAccountsTransactionsAmount(state.transactions, state.accounts, ReportType.income),
    outcomeAmount: -1 * getSelectedAccountsTransactionsAmount(state.transactions, state.accounts, ReportType.outcome),
    savings: state.savings
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const ReportTotal: FC<Props> = ({incomeAmount, outcomeAmount, savings}) =>{
    return (
        <List header="Баланс">
            <AmountRow title="Доход" amount={Math.abs(incomeAmount - savings)}/>
            <AmountRow title="Расход" amount={Math.abs(outcomeAmount)}/>
            <AmountRow title="Баланс" amount={incomeAmount - savings - outcomeAmount}/>
        </List>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportTotal);