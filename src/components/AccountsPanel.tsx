import React, {FC} from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { useTranslation } from "react-i18next";

import { List } from "./elements";
import { AccountLine } from "./";

const mapStateToProps = (state: State) => ({ accounts: state.accounts });
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const AccountsPanel: FC<Props> = ({ accounts }) => {
  const { t } = useTranslation();
  return (
    <div>
      <List header={t("accounts")}>
        {accounts.map((a) => (
          <AccountLine account={a} key={a.name} />
        ))}
      </List>
    </div>
  );
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(AccountsPanel);
export { connectedComponent as AccountsPanel};
