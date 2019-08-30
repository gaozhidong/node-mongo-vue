module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../modules/AdminUser')
  const assert = require('http-assert')

  const router = express.Router({
    mergeParams: true,
  })
  // 登录校验中间件
  const authMiddleware = async (req, res, next) => {

    const token = String(req.headers.authorization || '').split(' ').pop() //后端使用小写来获取
    assert(token, 401, '请先登录')

    const { id } = jwt.verify(token, app.get('secret'))
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id) //挂载到req上，在后续可以使用

    assert(req.user, 401, '用户不存在')

    await next()
  }
  //获取model中间件
  const resourceMiddleware = async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../modules/${modelName}`)
    next()
  }

  // 提交 create
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 更新  findByIdAndUpdate
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //删除 findByIdAndDelete
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true,
    })
  })

  // 获取列表 find
  router.get('/', async (req, res) => {
    let pageNum = parseInt(req.query.pageNum) || 1 // 转换前端传入当前页码
    let pageSize = parseInt(req.query.pageSize) || 10 // 转换前端传入的每页大小
    let skip = (pageNum - 1) * pageSize // 实现分割查询的skip

    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }

    const items = await req.Model.find().setOptions(queryOptions).skip(skip).limit(pageSize)
    let all = items.length
    // res.send(items)
    res.json({
      status: 0,
      message: '请求成功',
      total: all,
      list: items
    })

  })

  //获取详情 findById
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resource', authMiddleware, resourceMiddleware, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  
  // upload.single()  单个文件的上传
  app.post('/admin/api/upload', authMiddleware, upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3333/uploads/${file.filename}`
    res.send(file)
  })


  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await AdminUser.findOne({ username }).select('+password')
    // 根据用户名找用户
    assert(user, 422, '用户不存在')

    const isValid = require('bcrypt').compareSync(password, user.password)

    // 校验密码
    assert(isValid, 422, '密码错误')

    // 返回token
    const token = jwt.sign({ id: user._id, }, app.get('secret'))

    res.send({ token })

  })

  // 错误处理

  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.status.code || 500).send({
      message: err.message
    })
  })
}