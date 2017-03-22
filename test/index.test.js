
import test from 'ava'
import airplakePrivilege from '../lib'

let privilege = null

let root = {
  roles: ['root']
}

let user1 = {
  roles: ['role-one']
}

let config = {
  'pathMap': {
    '/my/test/path': 'my:test:path:list',
    '/my/test/path/:id': 'my:test:path:item',
    '/my/other/:id': 'my:other:item',
    '/my/other': 'my:other:list',
    '/my/other/:id/action': 'my:other:item:action'
  },
  'roleMap': {
    'root': {
      '*': [ 'get', 'post', 'put', 'delete' ] // root can access all
    },
    'role-one': {
      'my:test:path:list': [ 'get' ],
      'my:test:path:item': [ 'get' ],
      'my:other:item': [ 'get' ],
      'my:other:list': [ 'get' ]
    }
  }
}

test.before(t => {
  privilege = airplakePrivilege({
    config: config
  })
})

test('should allow access for an GET request', t => {
  var req
  req = {
    originalUrl: '/my/test/path',
    method: 'GET',
    user: user1
  }
  return privilege(req, {}, function (err) {
    t.is(err, undefined)
    t.pass()
  })
})

test('should allow access for an GET request', t => {
  var req
  req = {
    originalUrl: '/my/test/path',
    method: 'GET',
    user: root
  }
  return privilege(req, {}, function (err) {
    t.is(err, undefined)
    t.pass()
  })
})
