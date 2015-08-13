/**
 * A minimalistic helper to make requests to the MyGeotab API.
 */
(function () {
  'use strict';

  /**
   * The default timeout for requests
   * @type {number}
   */
  var timeout = 300000; // 5 minutes

  /**
   * The jsonp name space
   * @type {string}
   */
  var JSONP_REQUESTS_PROPERTY_STR = 'geotabJSONP';

  /**
   * Get endpoint for host name
   * @param host {string} - the host name (ex. 'my.geotab.com')
   * @returns {string}
   */
  var getEndpoint = function (host) {
    return 'https://' + host + '/apiv1';
  };

  /**
   *  Construct an XMLHttpRequest POST request for a MyGeotab API call
   *  @param {String} server - the host name (ex. 'my.geotab.com')
   *  @param {String} method - the name of the API method
   *  @param {Object} params - the method parameters
   *  @return {Object} - a promise that will supply the results
   */
  var post = function (server, method, params) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      var errorString;
      xhr.open('POST', getEndpoint(server), true);

      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.addEventListener('abort', function (e) {
        reject(Error(e));
      });

      xhr.onreadystatechange = function () {
        var data,
          error,
          result;

        if (xhr.readyState === 4) {

          if (xhr.status !== 200) {
            if (xhr.responseText) {
              errorString = xhr.responseText;
            } else if (xhr.target || xhr.status === 0) {
              errorString = 'Network Error: Couldn\'t connect to the server. Please check your network connection and try again.';
            }
            reject(Error(errorString));
          }

          try {
            data = JSON.parse(xhr.responseText);

            if (data && data.error) {
              error = data.error.errors && data.error.errors.length ? data.error.errors[0] : data.error;
              reject(error);
            } else {
              result = data.result;
              resolve(result);
            }
          } catch (e) {
            reject(e);
          }

        }
      };

      // create JSON string payload
      var rpcString;
      try {
        rpcString = JSON.stringify({
          method: method || '',
          params: params
        });
      } catch (e) {
        reject(e);
        return;
      }

      xhr.timeout = timeout;
      xhr.send('JSON-RPC=' + encodeURIComponent(rpcString));
    });
  };

  /**
   *  Cleans up the call with the given unique ID
   *  @private
   *  @param {String} uid The unique ID of the response callback
   */
  var cleanupCall = function (uid) {
    // Remove this function once we're done with it
    var script = document.getElementById(uid);
    if (script) {
      script.parentNode.removeChild(script);
      // Manually garbage-collect the script
      for (var prop in script) {
        if (script.hasOwnProperty(prop)) {
          delete script[prop];
        }
      }
    }
    delete window[JSONP_REQUESTS_PROPERTY_STR][uid];
  };

  /**
   *  Construct a JSONP request for a MyGeotab API call
   *  @param {String} server - the host name (ex. 'my.geotab.com')
   *  @param {String} method - the name of the API method
   *  @param {Object} params - the method parameters
   *  @return {Object} - a promise that will supply the results
   */
  var jsonp = function (server, method, params) {
    return new Promise(function (resolve, reject) {
      var uid = 'json' + (Math.random() * 100).toString().replace(/\./g, '');
      var buildParamString = function () {
        var query = [];

        params = params || {};

        for (var key in params) {
          if (params.hasOwnProperty(key)) {
            query.push.apply(query, ['&', encodeURIComponent(key), '=', encodeURIComponent(JSON.stringify(params[key]))]);
          }
        }

        return query.join('');
      };
      var timeoutTimer;

      window[JSONP_REQUESTS_PROPERTY_STR][uid] = function JSONPResponse(data) {
        // Clear timeout timer first
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
          timeoutTimer = null;
        }

        // Try to handle the response from the server
        try {
          if (data && data.error) {
            reject(Error(data.error));
          } else {
            resolve(data.result);
          }
        } finally {
          cleanupCall(uid);
        }
      };

      document.getElementsByTagName('body')[0].appendChild((function () {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.id = uid;
        s.async = 'async';
        s.src = getEndpoint(server) + '/' + method + '?JSONP=' + JSONP_REQUESTS_PROPERTY_STR + '.' + uid + buildParamString();
        s.onerror = function JSONPError(error) {
          try {
            reject(Error(error));
          } finally {
            cleanupCall(uid);
          }
        };
        return s;
      })());

      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
      }


      timeoutTimer = setTimeout(function () {
        if (window[JSONP_REQUESTS_PROPERTY_STR].hasOwnProperty(uid)) {
          window[JSONP_REQUESTS_PROPERTY_STR][uid]({
            error: {
              name: 'JSONPTimeout',
              message: 'Could not complete the JSONP request in a timely manner (' + timeout + 's)',
              target: document.getElementById(uid)
            }
          });
          window[JSONP_REQUESTS_PROPERTY_STR][uid] = function () {
            cleanupCall(uid);
          };
        }
      }, timeout);

    });
  };

  var api = {
    post: post,
    jsonp: jsonp
  };

  if (!window.geotab) {
    window.geotab = {};
  }

  window.geotab.api = api;

  return api;
}());
