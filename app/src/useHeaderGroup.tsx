import { useReducer } from 'react';

interface Header {
  name: string;
  value: string;
}

interface UseHeaderGroupResult {
  0: Header[];
  1: (index: number, header: Header) => void;
  2: (index: number) => void;
}

const isEmpty = (header: Header): void => {
  return header.name === '' && header.value === '';
};

const useHeaderGroup = (): UseHeaderGroupResult => {
  const reducer = (headerList, action): Header[] => {
    if (action.type === 'remove') {
      const newHeaderList = headerList
        .slice(0, action.index)
        .concat(headerList.slice(action.index + 1, headerList.length));

      return newHeaderList;
    } else if (action.type === 'change') {
      const newHeaderList = headerList.slice();

      console.log('change', {
        action,
      });

      // change header at index
      newHeaderList[action.index] = {
        name: action.header.name,
        value: action.header.value,
      };

      // add an empty header if last one is not empty
      if (action.index === headerList.length - 1 && !isEmpty(action.header)) {
        console.log('adding new header');

        newHeaderList.push({
          name: '',
          value: '',
        });
      } else if (
        newHeaderList.length >= 2 &&
        isEmpty(newHeaderList[newHeaderList.length - 1]) &&
        isEmpty(newHeaderList[newHeaderList.length - 2])
      ) {
        newHeaderList.pop();
      }

      console.log({ newHeaderList });

      return newHeaderList;
    }
  };

  const [headerList, dispatch] = useReducer(reducer, [{ name: '', value: '' }]);

  const setHeader = (index, header): void => {
    dispatch({
      type: 'change',
      index,
      header,
    });
  };

  const removeHeader = (index): void => {
    dispatch({
      type: 'remove',
      index,
    });
  };

  return [headerList, setHeader, removeHeader];
};

export default useHeaderGroup;
