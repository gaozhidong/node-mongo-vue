module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../modules/Category')

  // 提交分类 create
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })

  // 更新分类  findByIdAndUpdate
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  
  //删除分类 findByIdAndDelete
  router.delete('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true,
    })
  })

  // 获取分类列表 find
  router.get('/categories', async (req, res) => {
    const items = await Category.find().populate('parent').limit(10)
    res.send(items)
  })

  //获取详情 findById
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api', router)
}