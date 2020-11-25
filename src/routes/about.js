
const express = require('express');
const router = express.Router();
const data_handler = require('../helpers/handleSheetsDoc')

router.get("/",  (req, res) => {
//please, see the getDoc function in helpers/handleSheetsDoc.js
  data_handler.getDoc(2).then((sheet)=>{
    return rows = sheet.getRows(); 
  })
  .then((rows)=>{
//please, see the buildData function in helpers/handleSheetsDoc.js
    const data = data_handler.buildData(rows);
    res.render('main', {
      layout: 'index', 
      title:'About', 
      data: data, 
      listExists: true, // don't render the main file if the object is not there
      titleDescription: true, // for the sections that include extra titles and descriptions
      actionsNeeded: false // to render the action's buttons in the home
    });
  })
  .catch((err)=>{
    console.log('error:  ', err);
  })
});

module.exports = router;
