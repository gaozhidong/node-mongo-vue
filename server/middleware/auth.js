module.exports = options => {

  const jwt = require('jsonwebtoken')
  const AdminUser = require('../modules/AdminUser')
  const assert = require('http-assert')

  return async (req, res, next) => {

    const token = String(req.headers.authorization || '').split(' ').pop() //后端使用小写来获取
    assert(token, 401, '请先登录')

    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id) //挂载到req上，在后续可以使用

    assert(req.user, 401, '用户不存在')

    await next()
  }
}