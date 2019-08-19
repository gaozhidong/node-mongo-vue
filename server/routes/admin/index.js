module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true,
  })

  // 提交分类 create
  router.post('/', async (req, res) => {
    const modelName = require('inflection').classify(req.params.resource)
    const Model = require(`../../modules/${modelName}`)
    const model = await Model.create(req.body)
    res.send(model)
  })

  // 更新分类  findByIdAndUpdate
  router.put('/:id', async (req, res) => {
    const modelName = require('inflection').classify(req.params.resource)
    const Model = require(`../../modules/${modelName}`)
    const model = await Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  
  //删除分类 findByIdAndDelete
  router.delete('/:id', async (req, res) => {
    const modelName = require('inflection').classify(req.params.resource)
    const Model = require(`../../modules/${modelName}`)
    const model = await Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true,
    })
  })

  // 获取分类列表 find
  router.get('/', async (req, res) => {
    const modelName = require('inflection').classify(req.params.resource)
    const Model = require(`../../modules/${modelName}`)
    const items = await Model.find().populate('parent').limit(10)
    res.send(items)
  })

  //获取详情 findById
  router.get('/:id', async (req, res) => {
    const modelName = require('inflection').classify(req.params.resource)
    const Model = require(`../../modules/${modelName}`)
    const model = await Model.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resource', router)
}