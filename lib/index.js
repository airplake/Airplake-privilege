const parseurl = require('parseurl')
const Privilege = require('privilege')
const createError = require('http-errors')

module.exports = function (options) {
  let notAuthorized, pathMap, privilege, roleMap, _ref, _ref1
  pathMap = ((_ref = options.config.pathMap) != null ? _ref.getToken : void 0) ? options.config.pathMap : Privilege.PermissionMap.fromJson(options.config.pathMap)
  roleMap = ((_ref1 = options.config.roleMap) != null ? _ref1.check : void 0) ? options.config.roleMap : Privilege.RoleMap.fromJson(options.config.roleMap)
  notAuthorized = options.notAuthorized ? options.notAuthorized : (req, res, next) => {
    return next(createError(403, 'Forbidden'))
  }
  privilege = Privilege({
    pathMap: pathMap,
    roleMap: roleMap,
    contextToRoles: options.contextToRoles
  })
  return (req, res, next) => {
    let pathname
    if (!req.originalUrl && !req.url) {
      return notAuthorized(req, res, next)
    }
    pathname = parseurl.original(req).pathname
    return privilege(req, pathname, req.method, (err, allowed) => {
      if (err) {
        return next(err)
      } else if (!allowed) {
        return notAuthorized(req, res, next)
      } else {
        return next()
      }
    })
  }
}
