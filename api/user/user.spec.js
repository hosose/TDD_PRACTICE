//test
const request = require('supertest');
const should = require('should');
const app = require('../../index');

describe('Get/ users는', () => {
  describe('성공시', () => {
    it('유저 객체를 감은 배열로 응답한다.', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it('offset부터 응답한다.', (done) => {
      request(app)
        .get('/users?offset=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
    it('최대 limit 갯수만큼 응답한다.', (done) => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });
  describe('실패시', () => {
    it('limit이 숫자형이 아니면 400응답', (done) => {
      request(app).get('/users?limit=two').expect(400).end(done);
    });
    it('offset이 숫자형이 아니면 400응답', (done) => {
      request(app).get('/users?offset=two').expect(400).end(done);
    });
  });
});

describe(' users/:id 는', () => {
  describe('GET 성공시', () => {
    it('id가 1인 유저 객체를 반환한다', (done) => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1);
          done();
        });
    });
  });
  describe('DELETE 성공시', () => {
    it('id가 1인 유저 객체를 반환한다', (done) => {
      request(app).delete('/users/1').expect(204).end(done);
    });
  });
  describe('GET 실패시', () => {
    it('id가 숫자가 아닐경우 400에러', (done) => {
      request(app).get('/users/one').expect(400).end(done);
    });
    it('id로 유저를 찾을 수 없을 경우 404에러', (done) => {
      request(app).get('/users/999').expect(404).end(done);
    });
  });
  describe('DELETE 실패시', () => {
    it('id가 숫자가 아닐경우 400에러', (done) => {
      request(app).delete('/users/one').expect(400).end(done);
    });
  });
});
describe('POST /users', () => {
  describe('성공시', () => {
    let name = 'hosose';
    let body;
    before((done) => {
      request(app)
        .post('/users')
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it('생성된 유저 객체 반환', () => {
      body.should.have.property('id');
    });
    it('입력한 name 반환', () => {
      body.should.have.property('name', name);
    });
  });
  describe('실패시', () => {
    it('name 파라미터 누락 400 반환', (done) => {
      request(app).post('/users').send({}).expect(400).end(done);
    });
    it('name 파라미터가 영어가 아니면 400 반환', (done) => {
      let name = '호소세';
      request(app).post('/users').send({ name }).expect(400).end(done);
    });
    it('입력한 name이 중복이면 409 반환', (done) => {
      let name = 'tony'; //es6문법
      request(app).post('/users').send({ name }).expect(409).end(done);
    });
  });
});

describe('PUT /user/:id', () => {
  describe('성공시', () => {
    it('변경된 이름을 응답한다.', (done) => {
      let name = 'sayho';
      request(app)
        .put('/users/3')
        .send({ name })
        .expect(201)
        .end((err, res) => {
          res.body.should.have.property('name', name);
          done();
        });
    });
  });
  describe('실패시', () => {
    it('정수가 아닌 id일 경우 400', (done) => {
      let name = 'sayho';
      request(app).put('/users/three').send({ name }).expect(400).end(done);
    });
    it('name이 없을 경우 400응답', (done) => {
      request(app).put('/users/3').expect(400).end(done);
    });
    it('없는 유저일 경우 404응답', (done) => {
      let name = 'sayho';
      request(app).put('/users/4').send({ name }).expect(404).end(done);
    });
    it('이름이 중복인 경우 409응답', (done) => {
      let name = 'jerry';
      request(app).put('/users/3').send({ name }).expect(409).end(done);
    });
  });
});
