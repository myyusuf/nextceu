const Excel = require('exceljs');
const models = require('../models');
const moment = require('moment');

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
  const seminarId = req.params.seminarId;
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Participant.findAndCountAll({
    where: {
      SeminarId: parseInt(seminarId, 10),
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
  const seminarId = req.params.seminarId;

  // Use the mv() method to place the file somewhere on your server
  const fileName = `/Users/myyusuf/Documents/Test/file_upload/seminar_file_${seminarId}.xlsx`;
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

            for (let i = 2; i < 10; i += 1) {
              const cellA = worksheet.getCell(`A${i}`).value;
              if (cellA === null) {
                break;
              } else {
                const oldSid = cellA; // .replace(/\s/, '');
                const seminarTime = worksheet.getCell(`C${i}`).value;

                const participant = participants[oldSid];
                const seminarTimeMoment = moment(seminarTime, 'DD/MM/YYYY HH:mm:ss');
                const seminarDateMoment = moment(seminarTime, 'DD/MM/YYYY');
                if (participant) {
                  participant.rows.push(seminarTimeMoment);
                } else {
                  participants[oldSid] = {
                    rows: [seminarTimeMoment],
                    date: seminarDateMoment,
                  };
                }
              }

              // const promise = new Promise((resolve, reject) => {
              //   models.Student.findOne({
              //     where: { oldSid },
              //   })
              //   .then((student) => {
              //     if (student) {
              //       models.Participant.create({
              //         StudentId: student.id,
              //         SeminarId: seminarId,
              //       })
              //       .then(() => {
              //         resolve();
              //       });
              //     } else {
              //       resolve();
              //     }
              //   })
              //   .catch((err2) => {
              //     reject(err2);
              //   });
              // });
              //
              // promises.push(promise);
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
                  oldSid: particpantKeys[i],
                  date: participant.date,
                });
              }
            }

            for (let i = 0; i < filteredParticipants.length; i += 1) {
              const filteredParticipant = filteredParticipants[i];
              const promise = new Promise((resolve, reject) => {
                models.Student.findOne({
                  where: { oldSid: filteredParticipant.oldSid },
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
