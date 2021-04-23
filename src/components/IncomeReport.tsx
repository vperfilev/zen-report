import React, {FC} from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { SetSavingsAmount } from "./../redux/actionCreators"
import {List} from "./elements";
import { AmountRow } from "./";
import { getSelectedAccountsTransactionsAmount } from "../utils/datalogic";
import { ReportType } from "../models";

const mapStateToProps = (state: State) => ({ 
    savings: state.savings,
    unreported: getSelectedAccountsTransactionsAmount(state.transactions, state.accounts, ReportType.income)
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({ SetSavingsAmount }, dispatch );
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const IncomeReport: FC<Props> = ({savings, unreported, SetSavingsAmount}) =>{
    return (
        <>
        <List header="Доходы">
            <AmountRow title="Прочее" amount={unreported} editType="hideIcon" />
            <AmountRow title="Отложено" amount={savings} editType="amount" onChanged={(value) => SetSavingsAmount(value as number)} />
        </List>
        <div>
            
        </div>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomeReport);