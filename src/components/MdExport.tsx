import React, { FC } from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import {} from "./../redux/actionCreators";
import { PrimaryButton } from "./elements";

const mapStateToProps = (state: State) => ({
    transactionCount: state.transactions.length
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({}, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const MdExport: FC<Props> = ({transactionCount}) => {
  const exportReport = () => {};

  return (
    <div className="flex">
      <PrimaryButton text="Скопировать как MD таблицу" onClick={exportReport} disabled={transactionCount === 0} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MdExport);
