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

    var isObject = function(e) {
        return (typeof e === "object" && !Array.isArray(e) && e !== null);
    };

    var isFunction = function(f) {
        return (f && typeof f === 'function');
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

    var getResponse = function(xhr) {
        if (xhrResponseIsJSON(xhr))
            return JSON.parse(xhr.responseText);
        return xhr.responseText;
    };

    function Request(method, url, data, config) {
        this.successCallback = null;
        this.errorCallback = null;

        var self = this;
        var xhr = getXHR(), response;

        xhr.open(method, url, true);

        if (isObject(data)) {
            data = JSON.stringify(data);
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        var onSuccess = function() {
            response = getResponse(xhr);
            if (isFunction(self.successCallback))
                self.successCallback(response);
        };

        var onError = function() {
            response = getResponse(xhr);
            if (isFunction(self.errorCallback)) {
                self.errorCallback({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    response: response
                });
            }
        };

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                onSuccess();
            } else {
                onError();
            }
        };

        xhr.onerror = function() {
            onError();
        };

        xhr.send(data);
    }

    Request.prototype.then = function(success, error) {
        this.successCallback = success;
        this.errorCallback = error;
        return this;
    };

    Request.prototype.success = function(callback) {
        this.successCallback = callback;
        return this;
    };

    Request.prototype.error = function(callback) {
        this.errorCallback = callback;
        return this;
    };

    return {
        'get': function(url, config) {
            return new Request('GET', url, null, config);
        },
        'head': function(url, config) {
            return new Request('HEAD', url, null, config);
        },
        'post': function(url, data, config) {
            return new Request('POST', url, data, config);
        },
        'put': function(url, data, config) {
            return new Request('PUT', url, data, config);
        },
        'delete': function(url, config) {
            return new Request('DELETE', url, null, config);
        },
        'patch': function(url, data, config) {
            return new Request('PATCH', url, data, config);
        }
    };
}());
