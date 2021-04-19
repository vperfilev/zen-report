import * as React from 'react';

interface IComponentTitleProps {
    text: string
}

export function ComponentTitle ({text}: IComponentTitleProps) {
  return (
    <div className="text-xl text-blue-900 font-semibold mb-2">{text}</div>   
  );
}
