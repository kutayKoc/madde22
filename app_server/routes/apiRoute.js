var express=require('express');
var router=express.Router();

var ctrlApi=require('../controller/apiController');

router.get('/',ctrlApi.index);
router.get('/shows',ctrlApi.getShows);//collections taki tüm dokumanlari getir
router.get('/shows/list',ctrlApi.getListData);//preview için image,id,name key lerine göre veriyi ayarla
router.post('/shows/insertData',ctrlApi.insertData);//collection a yeni dokuman ekle
router.get('/shows/:id',ctrlApi.getShowsById);//id parametre değerine göre dokumanları getir
router.put('/shows/:id',ctrlApi.updateShowsById);//id parametresine göre dokumanları güncelle
router.delete('/shows/:id',ctrlApi.deleteShowsById);//id parametre değerine göre dokumani sil

module.exports=router;