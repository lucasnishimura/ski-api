import localStorage from 'localStorage';
import User from '../models/User';
import crypto from 'crypto';
import moment from 'moment';

class SessionController {
  async index(req,res) {
    return res.status(200).json({ mensagem: 'Olá! Bem-vindo a API! Suas rotas são: /users/id, /signUp, /signIn' });
  }

  async store(req, res) {
    const { email, senha } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }
    
    const password = crypto.createHash('md5').update(senha).digest('hex');
    if(password != user.senha){
        return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    const now = moment().format();
    user.ultimo_login = now;                                         
    localStorage.setItem('token', user.token);
    localStorage.setItem('last_access', user.ultimo_login);
    await user.save();

    return res.json(user);
  }
}

export default new SessionController();
