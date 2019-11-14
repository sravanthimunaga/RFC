var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1edp7bkIN9Hnlj351ilAYvIahWZ3a2-NrFdebQJJbrsY');

// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {
    if (err) console.log(err);
    doc.getInfo(function (err, info) {
        console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
        let sheet = info.worksheets[0];
        console.log('sheet #1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);

        var newrow = {
            title: 'banana',
            type: 'fruit',
            url: 'http://example.com'
        };
        doc.addRow(1, newrow, function( err, rows ){
            if (err) console.log(err);
            console.log(rows);

        });

    })
});