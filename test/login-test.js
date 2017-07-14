const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const models = require('../models');

const should = chai.should();
chai.use(chaiHttp);

const SIGNIN_URL = '/api/security/signin';

const newUser = {
  username: 'yusuf',
  password: 'admin',
  name: 'Yusuf',
};

const newRole = {
  code: 'ADMIN',
  name: 'Admin',
};

describe('Test for user', function() {

  before(function(done) {
    const query = { where: {} };
    // models.User.destroy(query)
    // .then((destroyResult) => {
    //   models.Role.destroy(query)
    //   .then((destroyRoleResult) => {
    //     models.User.create(newUser)
    //     .then((createUserResult) => {
    //       models.Role.create(newRole)
    //       .then((createRoleResult) => {
    //         createUserResult.setRole(createRoleResult)
    //         .then(() => {
    //           done();
    //         });
    //       });
    //     });
    //   });
    let createdUser = null;
    models.User.destroy(query)
    .then((destroyResult) => {
      return models.Role.destroy(query);
    })
    .then((destroyRoleResult) => {
      return models.User.create(newUser);
    })
    .then((createUserResult) => {
      createdUser = createUserResult;
      return models.Role.create(newRole);
    })
    .then((createRoleResult) => {
      return createdUser.setRole(createRoleResult);
    })
    .then(() => {
      done();
    })
    .catch(destroyUserErr => done(destroyUserErr));
  });

  it('should return valid jwt token', function(done) {
    chai.request(app)
    .post(SIGNIN_URL)
    .send(newUser)
    .end((err, res) => {
      should.not.exist(err);
      res.should.have.status(200);
      res.body.status.should.equal('OK');
      res.body.token.should.not.empty;
      done();
    });
  });
});
