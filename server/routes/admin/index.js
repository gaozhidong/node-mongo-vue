module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../modules/Category')

// 提交分类
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })

  // 获取分类列表
  router.get('/categories',async (req,res)=>{
    const items = await Category.find(req.body)
    res.send(items)
  })


  app.use('/admin/api',router)
}