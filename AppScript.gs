//appscript for google sheet รวบรวมข้อมูลอาหารและร้านอาหาร
//https://docs.google.com/spreadsheets/d/1kYzlLEp7O98uqW53ZtRc3JKDj3huD8-RAqNWx5MUuY0/edit?usp=sharing

function onOpen() {
  // Add a custom menu to the spreadsheet.
  var ui = SpreadsheetApp.getUi(); // Or DocumentApp, SlidesApp, or FormApp.

  // ui.createMenu('Run-Script')
  // .addItem('Push Data', 'write')
  // .addItem('Get Data','read')
  // .addToUi()

  ui.createMenu("Run-Script").addItem("Push Data", "write").addToUi();
}

// curl -X POST 'https://tjrtjnqhpcjqwzuvymgs.supabase.co/rest/v1/Foods' \
// -H "apikey: SUPABASE_KEY" \
// -H "Authorization: Bearer SUPABASE_KEY" \
// -H "Content-Type: application/json" \
// -H "Prefer: return=minimal" \
// -d '{ "some_column": "someValue", "other_column": "otherValue" }'

const APIURL = "https://tjrtjnqhpcjqwzuvymgs.supabase.co/rest/v1/Foods";
const APIKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqcnRqbnFocGNqcXd6dXZ5bWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNjgyNjcsImV4cCI6MjAxMzY0NDI2N30.1_SfC3KA6GxfYj93QUI8gKWUXZev7NpetVzqlnDuuMY";

var sheet = SpreadsheetApp.getActiveSpreadsheet();
var writeSheet = sheet.getSheetByName("การตอบแบบฟอร์ม 1");
var writeSheetLastRow = writeSheet.getLastRow();
// var readSheet = sheet.getSheetByName('Read')
// var readSheetLastRow = readSheet.getLastRow()

function write() {
  for (var i = 2; i <= writeSheetLastRow; i++) {
    //https://stackoverflow.com/questions/15557392/how-do-i-display-images-from-google-drive-on-a-website
    var imgUrl =
      "https://drive.google.com/uc?export=view&id=" +
      writeSheet
        .getRange(i, 6)
        .getValue()
        .replace("https://drive.google.com/open?id=", "");

    UrlFetchApp.fetch(APIURL, {
      method: "POST",
      headers: {
        apikey: APIKEY,
        Authorization: `Bearer ${APIKEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      payload: JSON.stringify([
        {
          id: i - 1,
          name: writeSheet.getRange(i, 5).getValue(),
          description: writeSheet.getRange(i, 12).getValue(),
          price: writeSheet.getRange(i, 14).getValue(),
          spicy_level: writeSheet.getRange(i, 10).getValue(),
          sweet_level: writeSheet.getRange(i, 8).getValue(),
          salty_level: writeSheet.getRange(i, 9).getValue(),
          isVegetable: writeSheet.getRange(i, 7).getValue(),
          restaurant_name: writeSheet.getRange(i, 4).getValue(),
          area: writeSheet.getRange(i, 3).getValue(),
          imgUrl: imgUrl,
          calories: writeSheet.getRange(i, 13).getValue(),
        },
      ]),
    });
  }
}
