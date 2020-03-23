import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');

  return (
    <form
      css={css`
        display: flex;

        border: 1px solid lightgray;
        padding: 4px;
      `}
      onSubmit={e => {
        e?.preventDefault?.();

        onSubmit?.({ method, url });
      }}
    >
      <select
        value={method}
        onChange={e => {
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
        onChange={e => {
          if (e?.target?.value !== undefined) {
            setUrl(e?.target?.value);
          }
        }}
      />
      <button type="submit">{'Go'}</button>
    </form>
  );
};

export default Form;
