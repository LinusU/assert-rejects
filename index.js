var assert = require('assert')
var isRegexp = require('is-regexp')

function expectedException (actual, expected) {
  if (!actual) return false
  if (!expected) return true
  if (isRegexp(expected)) return expected.test(actual)

  try {
    if (actual instanceof expected) return true
  } catch (_) {
    // Ignore. The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) return false

  return expected.call({}, actual) === true
}

module.exports = function assertRejects (promise, error, message) {
  if (typeof promise.then !== 'function') {
    throw new TypeError('"promise" argument must be a promise')
  }

  if (typeof error === 'string') {
    message = error
    error = null
  }

  message = (error && error.name ? ' (' + error.name + ')' : '') + (message ? '. ' + message : '.')

  function onFullfilled () {
    assert.fail(false, error, 'Missing expected rejection' + message)
  }

  function onRejected (err) {
    if (!expectedException(err, error)) throw err
  }

  return promise.then(onFullfilled, onRejected)
}
