# React-hook-async

- Simple way to work with async in your react components, using new React hooks.
- Support chaining async tasks.
- Small with no dependency needed

## INSTALLATION

`yarn add react-hook-async`

or

`npm i react-hook-async --save`

## Usage

Performing an async task is common actions when working with React.

With hooks, we usually use something like `const [loading, setLoading] = useState(false)` to manipulate our UI: show a loading indicator, an error message, ... This thing is trying to make your life a little bit easier when working with async data.

```js
import React, {useState} from 'react';
import axios from 'axios'
import { useAsync } from 'react-hook-async';

const Example = (props) => {

  const [text, setText] = useState("");

  const [apiData, fetchApi] = useAsync([], query => axios.get("<your_api_endpoint_here>", {
    params: {
      q: query
    }
  }))

  const onSearch = () => {
    fetchApi(text);
  };

  const {loading, result, error, lastFetch} = apiData;

  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)}/>
      {
        loading
        ? <div>Loading ...</div>
        : error
          ? <div>{error.message}</div>
          : <div>{result}</div>
      }
    </div>
  )
}

export default Example;
```

## API

- `useAsync(initValue, func) : [apiData, execute, reset]`

Params:

| Name        | Type            | Description                                                                       |
| ----------- | --------------- | --------------------------------------------------------------------------------- |
| `func`      | `() => Promise` | A function return promise. The value from promise will be set to `apiData.result` |
| `initValue` | `any`           | Initial value for `apiData.result`                                                |

Returned Value:

| Name      | Type                                                                  | Description                       |
| --------- | --------------------------------------------------------------------- | --------------------------------- |
| `apiData` | `{loading: boolean, error: null|Error, result: any, lastFetch: Date}` | Async task state                  |
| `execute` | `Function`                                                            | Function to perform an async task |
| `reset`   | `Function`                                                            | Function to reset `apiData`       |

## FAQ

Any pull requests & issues are warmly welcome :)
