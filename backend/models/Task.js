const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pendente', 'em andamento', 'concluida'], default: 'pendente' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dataConclusao: { type: Date },
}, { timestamps: true });

module.exports = model('Task', taskSchema);
