/* eslint-env mocha */

var assert = require('assert')
var assertRejects = require('./')
var AssertionError = require('assert').AssertionError

describe('assertRejects', function () {
  it('any rejection', function () {
    return assertRejects(Promise.reject(new Error('test')))
  })

  it('instanceof rejection', function () {
    return assertRejects(Promise.reject(new Error('test')), Error)
  })

  it('regex rejection', function () {
    return assertRejects(Promise.reject(new Error('test')), /test/)
  })

  it('function rejection', function () {
    return assertRejects(Promise.reject(new Error('test')), function () { return true })
  })

  it('no rejection', function () {
    return assertRejects(Promise.resolve('test')).then(
      function () { throw new Error('Expected rejection') },
      function (err) {
        assert.ok(err instanceof AssertionError)
        assert.equal(err.message, 'Missing expected rejection.')
      }
    )
  })

  it('no instanceof rejection', function () {
    return assertRejects(Promise.resolve('test'), Error).then(
      function () { throw new Error('Expected rejection') },
      function (err) {
        assert.ok(err instanceof AssertionError)
        assert.equal(err.message, 'Missing expected rejection (Error).')
      }
    )
  })

  it('no regex rejection', function () {
    return assertRejects(Promise.resolve('test'), /test/).then(
      function () { throw new Error('Expected rejection') },
      function (err) {
        assert.ok(err instanceof AssertionError)
        assert.equal(err.message, 'Missing expected rejection.')
      }
    )
  })

  it('no function rejection', function () {
    return assertRejects(Promise.resolve('test'), function () { return true }).then(
      function () { throw new Error('Expected rejection') },
      function (err) {
        assert.ok(err instanceof AssertionError)
        assert.equal(err.message, 'Missing expected rejection.')
      }
    )
  })

  it('unmatched instanceof rejection', function () {
    return assertRejects(Promise.reject(new Error('test')), SyntaxError).then(
      function () { throw new Error('Expected rejection') },
      function (err) {
        assert.ok(err instanceof Error)
        assert.equal(err.message, 'test')
      }
    )
  })

  it('unmatched regex rejection', function () {
    return assertRejects(Promise.reject(new Error('test')), /random/).then(
      function () { throw new Error('Expected rejection') },
      function (err) {
        assert.ok(err instanceof Error)
        assert.equal(err.message, 'test')
      }
    )
  })

  it('unmatched function rejection', function () {
    return assertRejects(Promise.reject(new Error('test')), function () { return false }).then(
      function () { throw new Error('Expected rejection') },
      function (err) {
        assert.ok(err instanceof Error)
        assert.equal(err.message, 'test')
      }
    )
  })

  it('custom message', function () {
    return assertRejects(Promise.resolve('test'), null, 'Test message.').then(
      function () { throw new Error('Expected rejection') },
      function (err) {
        assert.ok(err instanceof AssertionError)
        assert.equal(err.message, 'Missing expected rejection. Test message.')
      }
    )
  })
})
