const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  token: String,
  ultimo_login: Date,
  telefones:[{
    numero: Number,
    ddd: Number
  }]
},{  
  timestamps: true,
})

module.exports = mongoose.model('User', UserSchema);