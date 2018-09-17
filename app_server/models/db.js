var mongoose=require('mongoose');
mongoose.Promise=require('bluebird');
//veritabanına bağlanmak için
mongoose.connect('mongodb://url/database', {
    auth: {
      user: 'username',
      password: 'password'
    },
    useNewUrlParser:true
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
