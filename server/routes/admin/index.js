module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true,
  })

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
    const queryOptions = {}
    if(req.Model.modelName === 'Category'){
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  //获取详情 findById
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resource',async(req,res,next)=>{
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../modules/${modelName}`)
    next()
  }, router)
}