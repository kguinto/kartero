import * as React from 'react';
import { Component, useState } from 'react';
import { css } from 'styled-components';

import HeaderInputGroup from './HeaderInputGroup';
import useHeaderGroup from './useHeaderGroup';

const Form = ({ onSubmit }): Component => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');

  const [headerList, setHeader, removeHeader] = useHeaderGroup();

  return (
    <form
      css={css`
        border: 1px solid lightgray;
        padding: 4px;
      `}
      onSubmit={(e): void => {
        e?.preventDefault?.();

        const headers = headerList.filter(
          ({ name, value }) => name !== '' && value !== ''
        );

        onSubmit?.({ method, url, headers });
      }}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        <select
          value={method}
          onChange={(e): void => {
            if (e?.target?.value) setMethod(e?.target?.value);
          }}
        >
          <option value="GET">{'GET'}</option>
          <option value="POST">{'POST'}</option>
        </select>
        <input
          type="text"
          placeholder="http://0.0.0.0:3000/"
          css={css`
            width: 100%;
          `}
          value={url}
          onChange={(e): void => {
            if (e?.target?.value !== undefined) {
              setUrl(e?.target?.value);
            }
          }}
        />
        <button type="submit">{'Go'}</button>
      </div>
      <HeaderInputGroup
        css={css`
          margin-top: 1em;
        `}
        headerList={headerList}
        setHeader={setHeader}
        removeHeader={removeHeader}
      />
    </form>
  );
};

export default Form;
