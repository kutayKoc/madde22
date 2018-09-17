//projemizde kullanacağımız ara yazılımları import ediyoruz
var express=require('express');
var path=require('path');
var ejslayouts=require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app=express();
var db=require('./app_server/models/db');
//görüntü motoru olarak ejs yi dahil ettik
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./app_server/views'));
app.use(ejslayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
//public klasörümüz css,js,font gibi dosyalarımızın tutulduğu kısım, bu yüzden u bölgeyi public yaparak herkese açık yapıyoruz
app.use('/public',express.static(path.join(__dirname,'public')));
//projemizin daha düzenli olması için yönlendiricimizi başka dosyada çalıştırıyoruz
require('./app_server/routes/routeManager')(app);
//uygulamamızın çalıştırılacağı url ve port
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
console.log("app running")