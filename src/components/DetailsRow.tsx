import * as React from 'react';

interface Props {
    title: string;
    value: string;
    mutedValue: boolean;
}

export default function DetailsRow ({title, value, mutedValue }: Props) {
  return (
    <div className="py-2 px-2">
        <span className="text-gray-900 mr-2 font-bold">{title}:&nbsp;</span>
        <span className={mutedValue ? "text-gray-500 text-sm" : "text-gray-600"}>{value}</span>
      </div>
  );
}
