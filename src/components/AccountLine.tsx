import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { AccountSelectionChange } from "./../redux/actionCreators";
import { Account } from "./../models";
import { CheckBox } from "./elements";

interface OwnProps {
    account: Account;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({ AccountSelectionChange }, dispatch );
const mapStateToProps = () => ({});

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>,
  ownProps: OwnProps
) => {
  return { ...ownProps, ...stateProps, ...dispatchProps };
};

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mergeProps>;

function AccountRow({ account, AccountSelectionChange }: Props) {
  return (
    <div className="flex py-2 px-2">
      <CheckBox checked={account.isSelected} changed={(state: boolean) => AccountSelectionChange(account.name, state)} />
      <div className="w-1 mx-1" style={{ backgroundColor: account.colour }}></div>
      <span className="flex-grow text-gray-600 truncate">{account.name}</span>
    </div>
  );
}

export default connect(  mapStateToProps, mapDispatchToProps, mergeProps)(AccountRow);
