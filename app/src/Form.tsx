import * as React from 'react';
import { Component, useState } from 'react';
import { css } from 'styled-components';

import useHeaderGroup from './useHeaderGroup';
import HeaderInputGroup from './HeaderInputGroup';
import BodyInput from './BodyInput';

const Form = ({ onSubmit }): Component => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');

  const [headerList, setHeader, removeHeader] = useHeaderGroup();

  const [body, setBody] = useState('');

  return (
    <form
      css={css`
        border: 1px solid lightgray;
        padding: 1em;
      `}
      onSubmit={(e): void => {
        e?.preventDefault?.();

        const headers = headerList.filter(
          ({ name, value }) => name !== '' && value !== ''
        );

        onSubmit?.({ method, url, headers, body });
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
            setMethod(e?.target?.value ?? 'GET');
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
            setUrl(e?.target?.value ?? '');
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
      {method === 'POST' && (
        <div
          css={css`
            margin-top: 1em;
          `}
        >
          <span>{'Body'}</span>
          <BodyInput value={body} onChange={setBody} />
        </div>
      )}
    </form>
  );
};

export default Form;
