import * as React from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { List } from "./elements";
import { AccountLine } from "./";

const mapStateToProps = (state: State) => ({ accounts: state.accounts });
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function AccountsPanel({ accounts }: Props) {
  return (
    <div>
      <List header="Счета">
        {accounts.map((a) => (
          <AccountLine account={a} key={a.name} />
        ))}
      </List>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPanel);
