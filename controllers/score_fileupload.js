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

const processUpload = (req, res, uploadType) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "scoreFile") is used to retrieve the uploaded file
  const scoreFile = req.files.scoreFile;

  // Use the mv() method to place the file somewhere on your server
  let uploadFolder = 'pre_test';
  if (uploadType === 'POSTTEST') {
    uploadFolder = 'post_test';
  }

  const fileName = `${FILE_UPLOAD_FOLDER}/${uploadFolder}/${shortid.generate()}.xlsx`;
  scoreFile.mv(fileName, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName)
        .then(() => {
          const worksheet = workbook.getWorksheet(1);
          const promises = [];
          const scoreDate = moment().toDate();
          for (let i = 6; i <= Constant.MAX_SCORE_UPLOADED_ROW + 6; i += 1) {
            const departmentCode = worksheet.getCell(`B${i}`).value;
            const newSid = worksheet.getCell(`C${i}`).value;
            if (departmentCode === null) {
              break;
            }

            const scoreValue = parseFloat(worksheet.getCell(`G${i}`).value.result);

            const promise = new Promise((resolve, reject) => {
              models.Score.findOne({
                where: {},
                include: [
                  {
                    model: models.Course,
                    where: {
                      status: 1,
                    },
                    include: [
                      {
                        model: models.Student,
                        where: {
                          newSid,
                        },
                      },
                      {
                        model: models.Department,
                        where: {
                          code: departmentCode,
                        },
                      },
                    ],
                  },
                  {
                    model: models.ScoreType,
                    where: {
                      code: uploadType,
                    },
                  },
                ],
              }).then((foundScore) => {
                if (foundScore) {
                  foundScore.scoreValue = scoreValue;
                  foundScore.scoreDate = scoreDate;
                  foundScore.save()
                  .then(() => {
                    resolve({ newSid, found: true });
                  });
                } else {
                  models.Course.findOne({
                    where: {
                      status: 1,
                    },
                    include: [
                      {
                        model: models.Student,
                        where: {
                          newSid,
                        },
                      },
                      {
                        model: models.Department,
                        where: {
                          code: departmentCode,
                        },
                      },
                    ],
                  })
                  .then((foundCourse) => {
                    if (foundCourse) {
                      models.ScoreType.findOne({
                        where: {
                          code: uploadType,
                        },
                      })
                      .then((foundScoreType) => {
                        models.Score.create({
                          scoreValue,
                          scoreDate,
                          CourseId: foundCourse.id,
                          ScoreTypeId: foundScoreType.id,
                        })
                        .then(() => {
                          resolve({ newSid, found: true });
                        });
                      });
                    } else {
                      resolve({ newSid, found: false });
                    }
                  });
                }
              })
              .catch((errFindCourse) => {
                reject(errFindCourse);
              });
            });

            promises.push(promise);
          }

          Promise.all(promises)
          .then((uploadResult) => {
            fs.unlink(fileName, (errDeleteFile) => {
              if (errDeleteFile) throw errDeleteFile;
              res.json(uploadResult);
            });
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

exports.preTestUpload = function (req, res) {
  processUpload(req, res, 'PRETEST');
};

exports.postTestUpload = function (req, res) {
  processUpload(req, res, 'POSTTEST');
};
