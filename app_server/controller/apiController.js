//shows modelimizi import ediyoruz
var shows=require('../models/shows');

// /api url sinde sadece api view ini gösteriyoruz
module.exports.index=(req,res)=>{
    res.render("api");
}

//tüm dökümanları getir
module.exports.getShows=(req,res)=>{
    //tüm dokumanlar içerisinde ara
    shows.find({},(err,result)=>{
        if(err){
            //hata varsa
            res.status(404).send(error);
        } else{
            if(!result){
                //result değeri dönmüyorsa
                res.status(400).send("BAD REQUEST");
            }else{
                //result değeri varsa
                res.status(200).send(result);
            }
        }
    });
}

//id parametresini alarak eşleşen dökümanı getir
module.exports.getShowsById=(req,res)=>{
    //parametreden id değerini al
    var id=req.params.id;
    if(!id){
        //id değeri yoksa
        res.status(400).send("parametre değeri boş olamaz");
    }else{
        //tek bir kayit ara id değerine göre
        shows.findOne({id:id},(err,result)=>{
            if(err){
                //hata varsa
                res.status(404).send(err);
            }else{
                if(!result){
                    // hata yoksa ama result değeri yoksa
                    res.status(400).send("BAD REQUEST.");
                }else{
                    //result değeri dönüyorsa
                    res.status(200).send(result);
                }
            }
        })
    }
}

//id parametre değerini alarak collections tan eşlesen dökümanı güncelle
module.exports.updateShowsById=(req,res)=>{
    var id=req.params.id;
    var name=req.body.name;
    if(!id){
        res.status(400).send("parametre değeri boş olamaz");
    }else{
       if(!name){
           res.status(400).send("update edilecek değer boş olamaz");
       }else{
        shows.findOne({id:id},(err,result)=>{
            if(err){
                res.status(404).send(err);
            }else{
                if(!result){
                    res.status(400).send("BAD REQUEST.");
                }else{
                    shows.update({id:result.id},{$set: {name :name }},(erru,resultu)=>{
                        if(err){
                            res.status(404).send(erru);
                        }else{
                            res.status(200).send(resultu);
                        }
                    })
                }
            }
        })
       }
    }
}

//collection a yeni bir döküman ekle
module.exports.insertData=(req,res)=>{
    //json formatında veri post edildi
    var data=req.body.data;
    //json formatındaki data değişkenimiz içerisinden tüm alanlar dolacak şekilde verileri alıyoruz   
    var new_show=new shows({
        id:data.id,
        url:data.url,
        name:data.name,
        type:data.type,
        language:data.language,
        genres:data.genres,
        status:data.status,
        runtime:data.runtime,
        premiered:data.premiered,
        officalSite:data.officalSite,
        schedule:{
            time:data.schedule.time,
            days:data.schedule.days,
        },
        rating:{
            average:data.rating.average,
        },
        weight:data.weight,
        network:{
            id:data.network.id,
            name:data.network.name,
            country:{
                name:data.network.country.name,
                code:data.network.country.code,
                timezone:data.network.country.timezone
            }
        },
        webChannel:data.webChannel,
        externals:{
            tvrage:data.externals.tvrage,
            thetvdb:data.externals.thetvdb,
            imdb:data.externals.imdb
        },
        image:{
            medium:data.image.medium,
            original:data.image.original
        },
        summary:data.summary,
        updated:data.updated,
        _links:{
            self:{
                href:data._links.self.href
            },
            previousepisode:{
                href:data._links.previousepisode.href
            }
        }
    })
    //new _show objemizi kullanarak  dökümanı kaydediyoruz
    new_show.save((err,result)=>{
        if(err){
            res.status(404).send(err);
        }else{
            res.status(200).send(result);
        }
    })
}

//id parametresini kullanarak bir kaydı silme
module.exports.deleteShowsById=(req,res)=>{
    var id=req.params.id;
    //parametre olan id değişkenini al
    if(!id){
        //id yoksa 
        res.status(400).send("BAD REQUEST");
    }else{
        //id değişkenini kullanarak sadece 1 tane kayit silmek icin
        shows.deleteOne({id:id},(err,result)=>{
            if(err){
                //silme isleminde hata varsa
                res.status(404).send(err);
            }else{
                //herhangi bir hata yoksa
                res.status(200).send(result);
            }
        })
    }
}

//preview kısmındaki listeleme için id, name, image kısımlarını getiriyoruz sadece
module.exports.getListData=(req,res)=>{
    //aggregate i kullanarak sadece içimize yarayacak alanları listeliyoruz
    shows.aggregate([
        {$unwind:"$image"},
        {$project:
            {
                id:1,
                _id:1,
                name:1,
                image:1
            }
        },
        {
            $sort:{'id':-1}
        }
    ],(err,result)=>{
        if(err){
            res.status(404).send(err);
        }else{
            res.status(200).send(result);
        }
    })
}


