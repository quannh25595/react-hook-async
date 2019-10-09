# React-hook-async

- Simple way to work with async in your react components, using new React hooks.
- Support chaining async task.
- Small with no dependency needed

## INSTALLATION

`yarn add react-hook-async`

or

 `npm i react-hook-async --save`

## Usage

Make an API call is common actions when working with React.

With hooks, we usually use something like `const [loading, setLoading] = useState(false)` to manipulate our UI: show a loading indicator, an error message, ... We are trying to make it a little bit easier when working with async data.

### Basic

#### Refresh your data when your query changed automatically

```js
import React, { useMemo, useCallback } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { useAsync } from 'react-hook-async';
import qs from 'query-string';

import SearchAuthor form './search';
import ListAuthor from './list';

const AuthorPage = (props) => {
  const query = useMemo(() => qs.parse(props.location.search), [
    props.location.search,
  ]);

  // useCallback for function memoization.
  // Read more at Dan Abramov's blog: https://overreacted.io/a-complete-guide-to-useeffect/#but-i-cant-put-this-function-inside-an-effect
  const fetchListAuthor = useCallback(() => axios({
    method: 'GET',
    url: 'http://example.com/author',
    params: query
  }), [
    query,
  ]);

  const fetchListAuthorAsync = useAsync(fetchListAuthor);

  const onSearch = values => {
    props.history.replace(`${props.location.pathname}?${queryString.stringify(value)}`);
  };

  const {loading, result} = fetchListAuthorAsync;

  return (
    <>
      <SearchAuthor onSearch={onSearch} />
      <ListAuthor loading={loading} data={result.data} />
    </>
  )
}

export default withRouter(AuthorPage);
```

### Dealing with Payload (POST, PUT, PATCH)

#### Without keeping data to tracking by useEffect :)

Just passing your custom api call function to `forceExecute` function

```jsx
import ...

const createAuthorApi = (data) => ({
  method: 'POST'
  url: 'http://example.com/author',
  data,
})

const AuthorPage = (props) => {

  ...

  const fetchListAuthorAsync = useAsync(fetchListAuthor);

  const onCreate = values => {
    insertAuthor
      .forceExecute(() => axios(createAuthorApi(values)))
      .then(result => {
        fetchListAuthorAsync.forceExecute()
      })
  };

  ...

  return (
    <>
      <AddAuthor onCreate={onCreate} />
      <ListAuthor loading={loading} data={result.data} />

      ...

    </>
  )
}

export default withRouter(AuthorPage);
```

### Chaining API (INSERT then REFRESH)

#### `forceExecute` return a `promise`, so you can continue your jobs

```jsx
import ...

const createAuthorApi = (data) => ({
  method: 'POST'
  url: 'http://example.com/author',
  data,
})

const AuthorPage = (props) => {

  ...

  const onCreate = values => {
    insertAuthor.forceExecute(() => axios(createAuthorApi(values)))
  };

  ...

  return (
    <>
      <AddAuthor onCreate={onCreate} />

      ...

    </>
  )
}

export default withRouter(AuthorPage);
```

## FAQ

Any pull requests & issues are warmly welcome :)

## License

MIT
