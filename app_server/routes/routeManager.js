var routeApi=require('./apiRoute');
var routeHome=require('./homeRoute')



module.exports=(app)=>{
    app.use('/',routeHome);
    app.use('/api',routeApi);
}