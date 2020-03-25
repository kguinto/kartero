import * as React from 'react';
import { Component } from 'react';

const BodyInput = ({ className, value, onChange }): Component => {
  const rows = value?.match(/\n/g)?.length + 1;

  return (
    <textarea
      css={css`
        display: flex;

        min-height: 4em;
        height: 100%;
        width: 100%;

        border: 1px solid lightgray;
      `}
      className={className}
      rows={rows}
      value={value}
      onChange={(e): void => {
        const newValue = e?.target?.value ?? '';

        onChange(newValue);
      }}
    />
  );
};

export default BodyInput;
