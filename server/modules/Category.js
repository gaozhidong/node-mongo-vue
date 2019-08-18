const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parents: {type: mongoose.SchemaTypes.ObjectId, ref:'Category' },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}, { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } })

module.exports = mongoose.model('Category', schema)