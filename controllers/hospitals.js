const sequelize = require('sequelize');

const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  models.Hospital.findAll({
    where: {},
  })
  .then((hospitals) => {
    res.json(hospitals);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.Hospital.findOne({
    where: { id: req.params.hospitalId },
  })
  .then((hospital) => {
    res.json(hospital);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const hospitalForm = req.body;
  models.Hospital.create(hospitalForm)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const hospitalForm = req.body;
  models.Hospital.update(
    hospitalForm,
    {
      where: { id: req.params.hospitalId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Hospital.destroy(
    {
      where: { id: req.params.hospitalId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findSchedule = function findSchedule(req, res) {
  models.Hospital.findAll({
    where: {},
    include: [
      {
        model: models.HospitalDepartment,
      },
    ],
  })
  .then((foundHospitals) => {
    const hospitals = [];
    for (let i = 0; i < foundHospitals.length; i += 1) {
      const hospital = foundHospitals[i].dataValues;

      if (hospital.HospitalDepartments) {
        hospital.departmentQuota = hospital.HospitalDepartments[0].quota;
      } else {
        hospital.departmentQuota = 0;
      }

      hospitals.push(hospital);
    }

    models.Course.findAll({
      where: {},
      group: ['hospital1Id'],
      attributes: ['hospital1Id', [sequelize.fn('COUNT', 'hospital1Id'), 'hospitalCount']],
    }).then((courseGroups) => {
      // console.log(JSON.stringify(courseGroups));
      for (let i = 0; i < courseGroups.length; i += 1) {
        const courseGroup = JSON.parse(JSON.stringify(courseGroups[i]));
        for (let j = 0; j < hospitals.length; j += 1) {
          const hospital = hospitals[j];
          if (hospital.id === parseInt(courseGroup.hospital1Id, 10)) {
            hospital.studentsInDepartmentCount = courseGroup.hospitalCount;
          } else {
            hospital.studentsInDepartmentCount = 0;
          }
        }
      }
      res.json(hospitals);
    });
  })
  .catch((err) => {
    sendError(err, res);
  });
};
