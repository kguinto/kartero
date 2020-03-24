import * as React from 'react';
import { Component, useEffect, useState } from 'react';
import { css } from 'styled-components';

import Form from './Form';

const App = (): Component => {
  const [response, setResponse] = useState();

  const invoke = (method, args): void => {
    const stringifiedArgs = args.map(a =>
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

  const http = (method, url): void => invoke('http', [method, url]);

  const onSubmit = ({ method, url }): void => {
    console.log('submitting', { method, url });

    http(method, url);
  };

  return (
    <div>
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
