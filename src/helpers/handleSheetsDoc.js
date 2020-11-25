const dotenv = require('dotenv');
const {GoogleSpreadsheet} = require('google-spreadsheet');
dotenv.config();

// document ID to work with
const sheets_id= process.env.SHEETS_ID;
// api key from the google dev console
const key = process.env.API_KEY

module.exports = {};

module.exports.getDoc = async (index) => {
  // get document by id
  const doc = new GoogleSpreadsheet(sheets_id);
  // auth by api key
  await doc.useApiKey(key);
  // wait till it loads the doc information
  await doc.loadInfo();
  // get the tab by index and return the sheet data
  const sheet = await doc.sheetsByIndex[index];
  return sheet
}


module.exports.buildData = (rows) => {
  // reduce empty strings and rows that we don't need and return a clean array
  const rows_data = rows.reduce((arr, row, i) => {
    if (!!rows[i]._rawData && i >= 2){
      arr.push(rows[i]._rawData )
    }
    return arr;
  }, []);

  // get the header values to use a keynames when building the object data
  let key_names = rows[0]._sheet.headerValues;

  // clean the image portion of the array and gather just the images information
  const images = rows_data.map((value, i)=>{
    return value.slice(2)
  })
  
  // build the object
  const data = {
    [key_names[0]]: rows_data[0][0],
    [key_names[1]]: rows_data[0][1],
    ['images']: images
  }

  return data;
}