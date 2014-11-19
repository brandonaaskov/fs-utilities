angular.module('fs.utils', []).factory('utils', function() {
  var isTrueObject = function(obj) {
    if (_.isUndefined(obj)) {
      return false
    }

    if (_.isObject(obj) && !_.isFunction(obj) && !_.isArray(obj) && !_.isElement(obj)) {
      return true
    }

    return false
  }

  var isValidNumber = function(number) {
    if (_(number).isNumber() && !_(number).isNaN()) {
      return true
    }

    return false
  }

  var makeNumber = function(text) {
    var possibleNumber = parseInt(text, 10)

    if (isValidNumber(possibleNumber)) {
      return possibleNumber
    }
    else {
      return text
    }
  }

  var findValue = function(obj, propToFind) {
    if (!_.isString(propToFind) || _.isEmpty(propToFind)) {
      throw new Error("The second argument supplied to validProperty() should be a string of the property name that you're looking for.")
    }

    var foundValue = null

    _.find(obj, function(value, key) {
      if (String(key).toLowerCase() === String(propToFind).toLowerCase()) {
        foundValue = value
      }
      else if (_.isObject(value) && !_.isElement(value)) {
        foundValue = findValue(value, propToFind)
      }
      if (foundValue != null) {
        return foundValue
      }
    })

    return foundValue
  }

  var findValues = function(obj, arrOfValues) {
    if (!_.isArray(arrOfValues)) {
      throw new Error("findValues() expects an array of strings for property names to find")
    }

    var foundValues = {}

    _.each(arrOfValues, function(propToFind) {
      return foundValues[propToFind] = findValue(this, propToFind)
    }, obj)

    return foundValues
  }

  var override = function(startWith, overrideWith) {
    var cleaned = {}

    if (!_.isObject(startWith || !_.isObject(overrideWith))) {
      throw new Error("Both arguments supplied to override() should be shallow objects.")
    }

    cleaned = _.defaults(startWith, overrideWith)

    angular.forEach(startWith, function(value, key) {
      return angular.forEach(overrideWith, function(overrideItemValue, overrideItemKey) {
        if (key === overrideItemKey) {
          return cleaned[key] = overrideItemValue
        }
      })
    })

    return cleaned
  }

  return publicAPI = {
    isTrueObject: isTrueObject,
    is_valid_number: isValidNumber,
    makeNumber: makeNumber,
    findValue: findValue,
    findValues: findValues,
    override: override
  }
})
