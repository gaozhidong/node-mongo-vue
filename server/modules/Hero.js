const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String, },
  title: { type: String },
  //数组表示是多个值 mongoose.SchemaTypes.ObjectId 关联   ref是 指向谁
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  //英雄评分
  scores: {
    difficult: { type: Number }, //难度
    skills: { type: Number },//技能
    attack: { type: Number },//攻击
    survival: { type: Number },//生存
  },
  //技能列表
  skills: [{
    icon: { type: String }, //图标
    name: { type: String }, //姓名
    description: { type: String }, //描述
    tips: { type: String }, //提示
  }],
  // 怎么样出装备
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 使用技巧
  usageTips: { type: String },
  // 对战技巧
  battleTips: { type: String },
  // 团战技巧
  teamTips: { type: String },
  // 英雄关系
  partners: [{
    hero: {type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
    description: {type: String}
  }],
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}, { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } })

module.exports = mongoose.model('Hero', schema)