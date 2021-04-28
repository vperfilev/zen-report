import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import * as objStore from "store";

import { AccountSelectionChange } from "./../redux/actionCreators";
import { Account } from "./../models";
import { AccountIcon, CheckBox } from "./elements";

interface OwnProps {
  account: Account;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({ AccountSelectionChange }, dispatch);
const mapStateToProps = () => ({});

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>,
  ownProps: OwnProps
) => {
  return { ...ownProps, ...stateProps, ...dispatchProps };
};

type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mergeProps>;

function AccountRow({ account, AccountSelectionChange }: Props) {
  const onAccountChanged = (state: boolean): void => {
    const deselected = (objStore.get('disabled-accounts') ?? []) as Array<string>;
    const newDeselectedAccounts = deselected.filter(a => a !== account.name);
    if (!state){
      newDeselectedAccounts.push(account.name);
    }
    objStore.set('disabled-accounts', newDeselectedAccounts);
    AccountSelectionChange(account.name, state)
  }

  return (
    <div className="flex py-2 px-2">
      <CheckBox
        checked={account.isSelected}
        changed={onAccountChanged}
      />
      <AccountIcon colour={account.colour}/>
      <span className="flex-grow text-gray-600 truncate">{account.name}</span>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AccountRow);
