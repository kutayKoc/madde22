var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var shows=new Schema({
    id:Number,
    url:String,
    name:String,
    type:String,
    language:String,
    genres:[{
        type: String
    }],
    status:String,
    runtime:Number,
    premiered:String,
    officalSite:String,
    schedule:{
        time:String,
        days:[{
            type: String
        }],
    },
    rating:{
        average:Number,
    },
    weight:Number,
    network:{
        id:Number,
        name:String,
        country:{
            name:String,
            code:String,
            timezone:String
        }
    },
    webChannel:String,
    externals:{
        tvrage:Number,
        thetvdb:Number,
        imdb:String
    },
    image:{
        medium:String,
        original:String
    },
    summary:String,
    updated:Number,
    _links:{
        self:{
            href:String
        },
        previousepisode:{
            href:String
        }
    }
},{collection:'tvmaze'})
var shows=mongoose.model('shows',shows);
module.exports=shows;