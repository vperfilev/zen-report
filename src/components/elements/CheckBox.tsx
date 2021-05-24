import React, { FC } from "react";

interface Props {
  checked: boolean;
  changed: (state: boolean) => void;
  enabled?: boolean;
  labelText?: string;
}
const CheckBox: FC<Props> = ({
  labelText,
  changed,
  checked,
  enabled,
}) => {
  return (
    <label className={"flex justify-start items-start" + (enabled ? "" : " opacity-20")}>
      <div className="bg-white border-2 rounded my-auto border-gray-400 w-4 h-4 flex mr-1">
        <input type="checkbox" className="opacity-0 absolute w-4 h-4" checked={checked}
          onChange={(e) => changed(e.target.checked)} disabled={!enabled} />
        <svg className="fill-current hidden w-3 h-3 text-blue-900 pointer-events-none" viewBox="0 0 20 20" >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
      <div className="select-none">{labelText}</div>
    </label>
  );
};

CheckBox.defaultProps = { enabled: true, labelText: "" };

export { CheckBox };
