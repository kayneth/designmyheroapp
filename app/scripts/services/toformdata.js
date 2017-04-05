'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.toFormData
 * @description
 * # toFormData
 * Factory in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
  .factory('toFormData', function () {
    // Service logic
    // ...
      var methods = {};

    // formData - instance of FormData object
    // data - object to post
    methods.getFormData = function (formData, data, previousKey) {
      if (data instanceof Object) {
          Object.keys(data).forEach(function (key) {
              const value = data[key];
              if (value instanceof Object && !Array.isArray(value)) {
                  return methods.getFormData(formData, value, key);
              }
              if (previousKey) {
                  key = previousKey[key];
              }
              if (Array.isArray(value)) {
                value.forEach(function(val) {
                  formData.append(''+key+'[]', val);
                });
              } else {
                  formData.append(key, value);
              }
      });
      }
    };

    methods.log = function (formdata) {
        // for (var pair of formdata.entries()) {
        //     console.log(pair[0   ]+ ', ' + pair[1]);
        // }
    };

    // Public API here
    return methods;
  });
