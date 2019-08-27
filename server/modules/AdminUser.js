const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, //默认不查密码
    set(val){
      return require('bcrypt').hashSync(val,10)
    }
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}, { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } })

module.exports = mongoose.model('AdminUser', schema)