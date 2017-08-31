const Excel = require('exceljs');
const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Seminar.findAndCountAll({
    where: {
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
    limit,
    offset,
  })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findAllParticipants = function findAllParticipants(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Participant.findAndCountAll({
    where: {
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
    limit,
    offset,
  })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.Seminar.findOne({
    where: { id: req.params.seminarId },
  })
  .then((seminar) => {
    res.json(seminar);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const seminarForm = req.body;
  models.Seminar.create(seminarForm)
  .then((seminar) => {
    res.json(seminar);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const seminarForm = req.body;
  models.Seminar.update(
    seminarForm,
    {
      where: { id: req.params.seminarId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Seminar.destroy(
    {
      where: { id: req.params.seminarId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.fileUpload = function fileUpload(req, res) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "seminarFile") is used to retrieve the uploaded file
  const seminarFile = req.files.seminarFile;

  // Use the mv() method to place the file somewhere on your server
  const fileName = '/Users/myyusuf/Documents/Test/file_upload/seminar_file.xlsx';
  seminarFile.mv(fileName, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
        .then(() => {
          const worksheet = workbook.getWorksheet(1);
          const cellValue = worksheet.getCell('B6').value;
          console.log('==========> ', cellValue);

          return res.send('File uploaded!');
        });
  });
};
