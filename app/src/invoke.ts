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

export default invoke;
