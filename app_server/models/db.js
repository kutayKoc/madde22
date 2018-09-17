var mongoose=require('mongoose');
mongoose.Promise=require('bluebird');
//veritabanına bağlanmak için
mongoose.connect('mongodb://ds159812.mlab.com:59812/madde22', {
    auth: {
      user: 'kutaykoc',
      password: 'kutay2828'
    },
    useNewUrlParser:true
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));