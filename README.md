# tinyxhr.js
A small javascript library for making http requests

### Installation

Via bower
```sh
$ bower install tinyxhr.js
```

### How to use
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
