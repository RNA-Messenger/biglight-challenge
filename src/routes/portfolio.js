
const express = require('express');
const router = express.Router();
const data_handler = require('../helpers/handleSheetsDoc')

router.get("/",  (req, res, next) => {
  data_handler.getDoc(1).then((sheet)=>{
    return rows = sheet.getRows(); 
  })
  .then((rows)=>{
    const data = data_handler.buildData(rows);
    res.render('main', {
      layout: 'index', 
      title:'Portfolio', 
      data: data, 
      listExists: true,
      titleDescription: true,
      actionsNeeded: false
    });
  })
  .catch((err)=>{
    console.log('error:  ', err);
  })
});

module.exports = router;
