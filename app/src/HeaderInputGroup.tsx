import * as React from 'react';
import { Component, ChangeEvent } from 'react';

import noop from './noop';

const HeaderInputGroup = ({
  className,
  headerList,
  setHeader,
  removeHeader,
}): Component => {
  return (
    <div className={className}>
      <span>{'Headers'}</span>
      {headerList.map(({ name, value }, i) => (
        <HeaderInput
          key={`${i}`}
          header={{ name, value }}
          onChange={(newHeader): void => setHeader(i, newHeader)}
          onDelete={
            i === headerList.length - 1 ? null : (): void => removeHeader(i)
          }
        />
      ))}
    </div>
  );
};

interface HeaderInputProps {
  name: string;
  value: string;
  onChange: (h: Header) => void;
}

const HeaderInput = ({
  header: { name, value },
  onChange,
  onDelete,
}): Component => {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <input
        css={css`
          width: 100%;
        `}
        type="text"
        value={name}
        onChange={(e: ChangeEvent): void => {
          e.preventDefault();

          const newName = e?.target?.value || '';

          onChange({ name: newName, value });
        }}
      />
      <input
        css={css`
          width: 100%;

          margin-left: 0.5em;
        `}
        type="text"
        value={value}
        onChange={(e: ChangeEvent): void => {
          e.preventDefault();

          const newValue = e?.target?.value || '';

          onChange({ name, value: newValue });
        }}
      />
      <button
        type="button"
        css={css`
          max-width: 2em;
          width: 100%;

          margin-left: 0.5em;

          visibility: ${onDelete ? 'visible' : 'hidden'};
        `}
        onClick={onDelete ?? noop}
      >
        {'X'}
      </button>
    </div>
  );
};

export default HeaderInputGroup;
