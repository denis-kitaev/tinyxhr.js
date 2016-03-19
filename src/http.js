var http = (function() {
    'use strict';

    var getXHR = function() {
        var xhr;
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (E) {
                xhr = false;
            }
        }
        if (!xhr && typeof XMLHttpRequest != 'undefined') {
            xhr = new XMLHttpRequest();
        }
        return xhr;
    };

    var isObject = function(item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    };

    var xhrResponseIsJSON = function(xhr) {
        var contentType = xhr.getResponseHeader('Content-Type');
        return (contentType === 'application/json');
    };

    var serialize = function(obj, prefix) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push(typeof v == "object" ?
                    serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    };

    var request = function(method, url, data, config) {
        var xhr = getXHR();
        xhr.open(method, url, true);

        if (isObject(data)) {
            data = JSON.stringify(data);
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        return new Promise(function(resolve, reject) {
            var response, responseIsJson;
            xhr.send(data);

            xhr.onreadystatechange = function() {
                if (xhr.readyState !== 4) return;

                responseIsJson = xhrResponseIsJSON(xhr);
                response = (responseIsJson) ? JSON.parse(xhr.responseText) : xhr.responseText;

                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(response);
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        response: xhr.response,
                        data: response
                    });
                }
            };
        });
    };

    return {
        'get': function(url, config) {
            return request('GET', url, null, config);
        },
        'head': function(url, config) {
            return request('HEAD', url, null, config);
        },
        'post': function(url, data, config) {
            return request('POST', url, data, config);
        },
        'put': function(url, data, config) {
            return request('PUT', url, data, config);
        },
        'delete': function(url, config) {
            return request('DELETE', url, null, config);
        },
        'patch': function(url, data, config) {
            return request('PATCH', url, data, config);
        }
    };
}());
