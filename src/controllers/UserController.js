import authConfig from '../config/auth';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import moment from 'moment';

module.exports = {
  async index(req, res){
    
    let users = await User.find().sort('-createdAt');
    
    if(req.params.id){
      users = await User.findById(req.params.id);
    }
    if(!users){
      return res.json({mensagem: 'Nenhum usuário encontrado'});
    }

    return res.json(users);
  },
  async store(req, res){
           
    const userByEmail = await User.findOne({ email: req.body.email });
    
    if (userByEmail) {
      return res.status(401).json({ mensagem: 'E-mail já existente' });
    }
    
    const senha = crypto.createHash('md5').update(req.body.senha).digest('hex');
    
    const { nome, email, telefones } = req.body

    const post = await User.create({
      nome,
      email,
      senha,
      telefones,
      token: jwt.sign({ nome }, authConfig.secret),
      ultimo_login: moment().format()
    });

    return res.json(post);
  }

}