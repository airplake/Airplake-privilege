# airplake-privilege
An ExpressJS interface for the privilege module.

## Install

```bash
npm install airplake-privilege --save
```


## Example Usage

```javascript
// 角色  路由  method 配置
let config = {
  'pathMap':{
    '/my/test/path': 'my:test:path:list',
    '/my/test/path/:id': 'my:test:path:item',
    '/my/other/:id': 'my:other:item',
    '/my/other': 'my:other:list',
    '/my/other/:id/action': 'my:other:item:action'
  },
  'roleMap':{
    'root': {
      '*': [ 'get', 'post', 'put', 'delete' ] // root can access all
    },
    'reader': {
      'my:test:path:list': [ 'get' ],
      'my:test:path:item': [ 'get' ],
      'my:other:item': [ 'get' ],
      'my:other:list': [ 'get' ]
    },
    'writer': {
      'my:test:path:list': [ 'get' ],
      'my:test:path:item': [ 'get', 'post', 'put', 'delete' ],
      'my:other:item': [ 'get', 'post', 'put', 'delete' ],
      'my:other:item:action': [ 'post' ],
      'my:other:list': [ 'get' ]
    }
  }
}

const app  = require('express')()
const airplakePrivilege = require('airplake-privilege')({
  config: config,
  contextToRoles: (ctx, done) => {
    done(null, [ctx.headers['x-role']])// 这里需要将当前角色取出来
  }
});

app.use(airplakePrivilege); // 需要放在所有路由之前

```
