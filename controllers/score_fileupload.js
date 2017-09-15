const Excel = require('exceljs');
const models = require('../models');
const moment = require('moment');
const Constant = require('../Constant');
const shortid = require('shortid');
const fs = require('fs');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

const FILE_UPLOAD_FOLDER = process.env.FILE_UPLOAD_FOLDER || Constant.FILE_UPLOAD_FOLDER;

exports.preTestUpload = function (req, res) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "scoreFile") is used to retrieve the uploaded file
  const scoreFile = req.files.scoreFile;

  // Use the mv() method to place the file somewhere on your server
  const fileName = `${FILE_UPLOAD_FOLDER}/pre_test/${shortid.generate()}.xlsx`;
  scoreFile.mv(fileName, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
        .then(() => {
          const worksheet = workbook.getWorksheet(2);
          const cell = worksheet.getCell('B12').value;
          console.log('========>', cell);

          fs.unlink(fileName, (errDeleteFile) => {
            if (errDeleteFile) throw errDeleteFile;
            res.send('OK');
          });
        })
        .catch((errReadExcel) => {
          fs.unlink(fileName, (errDeleteFile) => {
            if (errDeleteFile) throw errDeleteFile;
            res.status(500).send(errReadExcel.message);
          });
        });
  });
};
