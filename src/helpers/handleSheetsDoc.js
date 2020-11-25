const dotenv = require('dotenv');
const {GoogleSpreadsheet} = require('google-spreadsheet');
dotenv.config();

const sheets_id= process.env.SHEETS_ID;
const key = process.env.API_KEY

module.exports = {};

module.exports.getDoc = async (index) => {
  const doc = new GoogleSpreadsheet(sheets_id);
  await doc.useApiKey(key);
  await doc.loadInfo();
  const sheet = await doc.sheetsByIndex[index];
  return sheet
}


module.exports.buildData = (rows) => {
  const rows_data = rows.reduce((arr, row, i) => {
    if (!!rows[i]._rawData && i >= 2){
      arr.push(rows[i]._rawData )
    }
    return arr;
  }, []);
  let key_names = rows[0]._sheet.headerValues;

  const images = rows_data.map((value, i)=>{
    return value.slice(2)
  })
  
  const data = {
    [key_names[0]]: rows_data[0][0],
    [key_names[1]]: rows_data[0][1],
    ['images']: images
  }

  return data;
}