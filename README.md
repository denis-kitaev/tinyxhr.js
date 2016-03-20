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

If you want to add callback only to success request, you can just write:

```js
var data = {
    title: 'My Awesome Title',
    text: 'This is my article ..'
};
http.post('/api/articles/', data)
    .success(function(article) {
        articles.push(article);
    });
```

Or only to error request:

```js
http.delete('/api/articles/10/')
    .error(function() {
        alert('Something went wrong!');
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
