import * as React from 'react';
import { Component, useEffect, useState } from 'react';
import { css } from 'styled-components';

import Form from './Form';

const App = (): Component => {
  const [response, setResponse] = useState();

  const invoke = (method, args): void => {
    const stringifiedArgs = args.map((a) =>
      typeof a === 'string' ? a : JSON.stringify(a)
    );

    window['external']['invoke'](
      JSON.stringify({
        method: method,
        args: stringifiedArgs,
      })
    );
  };

  useEffect(() => {
    window['setResponse'] = (res: string): void => setResponse(res);
  }, []);

  const onSubmit = ({ method, url, headers }): void => {
    console.log('submitting', { method, url, headers });

    invoke('http', [method, url, JSON.stringify(headers)]);
  };

  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        padding: 0.5em;

        box-sizing: border-box;
        overflow: hidden;

        font-family: sans-serif;
        font-size: 12px;
      `}
    >
      <Form onSubmit={onSubmit} />

      {response && (
        <pre
          css={css`
            height: 100%;
            border: 1px solid lightgray;
            padding: 4px;

            overflow: scroll;
          `}
        >
          {response}
        </pre>
      )}
    </div>
  );
};

export default App;
