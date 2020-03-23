import React, { useState } from 'react';
import { css } from 'styled-components';

import Form from './Form';

const App = () => {
  const [response, setResponse] = useState();

  const invoke = (method, ...args) => {
    let stringifiedArgs = args.map(a =>
      typeof a === 'string' ? a : JSON.stringify(a)
    );

    window.setResponse = res => setResponse(res);

    window?.external?.invoke(
      JSON.stringify({
        method: method,
        args: stringifiedArgs,
      })
    );
  };

  const log = (...args) => invoke('log', ...args);
  const http = (...args) => invoke('http', ...args);

  const onSubmit = ({ method, url }) => {
    log('submitting', { method, url });

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
