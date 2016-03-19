# tinyxhr.js
A small javascript library for making http requests

### Installation

Via bower
```sh
$ bower install tinyxhr.js
```

### Usage
```js
http.get('/api/apticles/')
    .then(function(data) {
        console.log('Success');
        console.log(data);
    }, function(err) {
        console.log('Error');
        console.log(err);
    });
```

### API
List of methods:
* `http.get(url, [config])`
* `http.head(url, [config])`
* `http.post(url, data, [config])`
* `http.put(url, data, [config])`
* `http.delete(url, [config])`
* `http.patch(url, data, [config])`

If data is a javascript object, it will be converted to json string and
`Content-Type` header will set to `application/json`.
If response's `Content-Type` header is `application/json` then response data
will be converted to javascript object.
