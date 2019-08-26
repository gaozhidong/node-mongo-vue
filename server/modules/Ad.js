const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}, { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } })

module.exports = mongoose.model('Ad', schema)