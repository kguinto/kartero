import * as React from 'react';
import { Component, useState } from 'react';
import { css } from 'styled-components';

const Form = ({ onSubmit }): Component => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');

  return (
    <form
      css={css`
        border: 1px solid lightgray;
        padding: 4px;
      `}
      onSubmit={(e): void => {
        e?.preventDefault?.();

        onSubmit?.({ method, url });
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
    </form>
  );
};

export default Form;
