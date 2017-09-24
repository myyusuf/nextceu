const Excel = require('exceljs');
const models = require('../models');
const moment = require('moment');
const Constant = require('../Constant');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const dateRange = req.query.dateRange;
  let startDate = null;
  let endDate = null;
  if (dateRange) {
    startDate = moment(dateRange[0].replace(/"/g, ''));
    endDate = moment(dateRange[1].replace(/"/g, ''));
  } else {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    startDate = moment(firstDay);
    endDate = moment(lastDay);
  }
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Seminar.findAndCountAll({
    where: {
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
      eventDate: {
        $gte: startDate.toDate(),
        $lte: endDate.toDate(),
      },
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
  const seminarId = req.params.seminarId;
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Participant.findAndCountAll({
    where: {
      SeminarId: parseInt(seminarId, 10),
    },
    include: [
      {
        model: models.Student,
        where: {
          $or: [
            { name: { $ilike: searchText } },
            { oldSid: { $ilike: searchText } },
            { newSid: { $ilike: searchText } },
          ],
        },
      },
    ],
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
  seminarForm.eventTime = moment(seminarForm.eventTime).format('hh:mm:ss a');
  if (seminarForm.speaker) {
    seminarForm.speakerId = parseInt(seminarForm.speaker, 10);
  }
  if (seminarForm.moderator) {
    seminarForm.moderatorId = parseInt(seminarForm.moderator, 10);
  }
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
  seminarForm.eventTime = moment(seminarForm.eventTime).format('hh:mm:ss a');
  if (seminarForm.speaker) {
    seminarForm.speakerId = parseInt(seminarForm.speaker, 10);
  }
  if (seminarForm.moderator) {
    seminarForm.moderatorId = parseInt(seminarForm.moderator, 10);
  }
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
  const seminarId = req.params.seminarId;

  // Use the mv() method to place the file somewhere on your server
  const fileName = `${Constant.FILE_UPLOAD_FOLDER}/seminar_file_${seminarId}.xlsx`;
  seminarFile.mv(fileName, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
        .then(() => {
          models.Participant.destroy(
            {
              where: { SeminarId: seminarId },
            })
          .then(() => {
            const worksheet = workbook.getWorksheet(1);
            const promises = [];
            const participants = {};

            for (let i = 2; i <= Constant.MAX_SEMINAR_UPLOADED_ROW; i += 1) {
              const cellA = worksheet.getCell(`A${i}`).value;
              if (cellA === null) {
                break;
              } else {
                const newSid = cellA; // .replace(/\s/, '');
                const seminarTime = worksheet.getCell(`C${i}`).value;

                const participant = participants[newSid];
                const seminarTimeMoment = moment(seminarTime, 'DD/MM/YYYY HH:mm:ss');
                if (participant) {
                  participant.rows.push(seminarTimeMoment);
                } else {
                  participants[newSid] = {
                    rows: [seminarTimeMoment],
                  };
                }
              }
            }

            const filteredParticipants = [];
            const particpantKeys = Object.keys(participants);
            for (let i = 0; i < particpantKeys.length; i += 1) {
              const participant = participants[particpantKeys[i]];
              const firstSeminarTime = participant.rows[0];
              const lastSeminarTime = participant.rows[participant.rows.length - 1];
              const delta = lastSeminarTime.diff(firstSeminarTime, 'minutes');
              if (delta >= 60) {
                filteredParticipants.push({
                  newSid: particpantKeys[i],
                });
              }
            }

            for (let i = 0; i < filteredParticipants.length; i += 1) {
              const filteredParticipant = filteredParticipants[i];
              const promise = new Promise((resolve, reject) => {
                models.Student.findOne({
                  where: { newSid: filteredParticipant.newSid },
                })
                .then((student) => {
                  if (student) {
                    models.Participant.create({
                      StudentId: student.id,
                      SeminarId: seminarId,
                    })
                    .then(() => {
                      resolve();
                    });
                  } else {
                    resolve();
                  }
                })
                .catch((createParticipantErr) => {
                  reject(createParticipantErr);
                });
              });
              promises.push(promise);
            }

            Promise.all(promises)
            .then(() => (
              res.send(`${filteredParticipants.length} created`)
            ));
          });
        });
  });
};
