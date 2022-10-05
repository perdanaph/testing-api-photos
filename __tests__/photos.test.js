const request = require('supertest');
const app = require('./../app');
const { sequelize } = require('./../models/index');
const { queryInterface } = sequelize;
const { hash } = require('./../helpers/hash');
const { sign } = require('../helpers/jwt');

const user = {
  username: 'perdanaph',
  email: 'perdanaph@mail.com',
  password: 'password',
  createdAt: new Date(),
  updatedAt: new Date()
};
const userToken = sign({ id: 1, email: user.email });
const userNotExistsToken = sign({ id: 99, email: 'notexists@mail.com' });

const defaultPhoto = {
  title: 'Default Photo',
  caption: 'Default Photo caption',
  image_url: 'http://image.com/defaultphoto.png',
  createdAt: new Date(),
  updatedAt: new Date(),
  UserId: 1
};

const nextPhoto = {
  title: 'Phototok',
  caption: 'Photo ini adalah phototok',
  image_url: 'http://image.com/phototok.png',
  UserId: 1
};

beforeAll(async () => {
  await queryInterface.bulkDelete('Photos', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  });
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  });
  const hashedUser = { ...user };
  hashedUser.password = hash(hashedUser.password);
  await queryInterface.bulkInsert('Users', [hashedUser]);
  await queryInterface.bulkInsert('Photos', [defaultPhoto]);
});

afterAll(async () => {
  sequelize.close();
});

<<<<<<< HEAD
=======


describe('GET /photos', () => {
  test('should return HTTP status code 200', async () => {
    const { body } = await request(app)
      .get('/photos')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    expect(body.length).toBe(1);
    expect(body[0]).toEqual({
      id: 1,
      title: defaultPhoto.title,
      caption: defaultPhoto.caption,
      image_url: defaultPhoto.image_url,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      UserId: 1
    });
  });

  test('should return HTTP status code 401 when no authorization', async () => {
    const { body } = await request(app)
      .get('/photos')
      .expect(401);
    expect(body.message).toMatch(/unauthorized/i);
  });

  test('should return HTTP status code 401 when no token provided', async () => {
    const { body } = await request(app)
      .get('/photos')
      .set('Authorization', 'Bearer ')
      .expect(401);
    expect(body.message).toMatch(/invalid token/i);
  });

  test('should return HTTP status code 401 when no token provided', async () => {
    const { body } = await request(app)
      .get('/photos')
      .set('Authorization', 'Bearer wrong.token.input')
      .expect(401);
    expect(body.message).toMatch(/invalid token/i);
  });

  test('should return HTTP status code 401 when user does not exist', async () => {
    const { body } = await request(app)
      .get('/photos')
      .set('Authorization', `Bearer ${userNotExistsToken}`)
      .expect(401);
    expect(body.message).toMatch(/unauthorized/i);
  });
});
>>>>>>> 8456af101d59cddc0732f5ae56d2fc61e763496d

describe('GET /photos/:id', () => {
  test('should return HTTP status code 200', async () => {
    const result = []
    const { body } = await request(app)
      .get('/photos/'+1)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
<<<<<<< HEAD
    expect(body.length).toBe(1);
    expect(body[0]).toEqual({
=======
    result.push(body);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
>>>>>>> 8456af101d59cddc0732f5ae56d2fc61e763496d
      id: 1,
      title: defaultPhoto.title,
      caption: defaultPhoto.caption,
      image_url: defaultPhoto.image_url,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      User: {
        id: 1,
        username: user.username,
        email: user.email
      }
    });
  });

  test('should return HTTP status code 401 when no authorization', async () => {
    const { body } = await request(app)
      .get('/photos/'+1)
      .expect(401);
    expect(body.message).toMatch(/unauthorized/i);
  });

  test('should return HTTP status code 401 when no token provided', async () => {
    const { body } = await request(app)
      .get('/photos/'+1)
      .set('Authorization', 'Bearer ')
      .expect(401);
    expect(body.message).toMatch(/invalid token/i);
  });

  test('should return HTTP status code 401 when no token provided', async () => {
    const { body } = await request(app)
      .get('/photos/'+1)
      .set('Authorization', 'Bearer wrong.token.input')
      .expect(401);
    expect(body.message).toMatch(/invalid token/i);
  });

  test('should return HTTP status code 401 when user does not exist', async () => {
    const { body } = await request(app)
      .get('/photos/'+1)
      .set('Authorization', `Bearer ${userNotExistsToken}`)
      .expect(401);
    expect(body.message).toMatch(/unauthorized/i);
  });

  test('should return HTTP status code 404 when data not exist', async () => {
    const { body } = await request(app)
      .get('/photos/'+99)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(404);
    expect(body.message).toMatch('data not found');
  });
});

describe('POST /photos', () => {
  test('should return HTTP status code 201 when success create new photo', async () => {
    const { body } = await request(app)
      .post('/photos')
      .set('Authorization', `Bearer ${userToken}`)
<<<<<<< HEAD
      .expect(200);
    result.push(body);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      id: 1,
      title: defaultPhoto.title,
      caption: defaultPhoto.caption,
      image_url: defaultPhoto.image_url,
=======
      .send({ title: nextPhoto.title, caption: nextPhoto.caption, image_url: nextPhoto.image_url, UserId: 1 })
      .expect(201);
    expect(body).toEqual({
      id: 2, 
      title: nextPhoto.title,
      caption: 'PHOTO 3 http://image.com/photo3.png',
      image_url: nextPhoto.image_url,
>>>>>>> 8456af101d59cddc0732f5ae56d2fc61e763496d
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      UserId: 1
    });
  });

  test('should return HTTP status code 401 when no authorization', async () => {
    const { body } = await request(app)
      .get('/photos')
      .expect(401);
    expect(body.message).toMatch(/unauthorized/i);
  });

  test('should return HTTP status code 401 when no token provided', async () => {
    const { body } = await request(app)
      .get('/photos')
      .set('Authorization', 'Bearer ')
      .expect(401);
    expect(body.message).toMatch(/invalid token/i);
  });

  test('should return HTTP status code 401 when no token provided', async () => {
    const { body } = await request(app)
      .get('/photos')
      .set('Authorization', 'Bearer wrong.token.input')
      .expect(401);
    expect(body.message).toMatch(/invalid token/i);
  });

  test('should return HTTP status code 401 when user does not exist', async () => {
    const { body } = await request(app)
      .get('/photos')
      .set('Authorization', `Bearer ${userNotExistsToken}`)
      .expect(401);
    expect(body.message).toMatch(/unauthorized/i);
  });

  test('should return HTTP status code 400 when user does not fill in data', async () => {
    const { body } = await request(app)
      .post('/photos')
      .set('Authorization', `Bearer ${userToken}`)
      .send({})
      .expect(400);
    expect(body.message).toMatch(/Bad Request, Data must be notEmpty/i);
  });
<<<<<<< HEAD
});

describe('POST /photos', () => {
  test('should return HTTP status code 201 when success create new photo', async () => {
    const { body } = await request(app)
      .post('/photos')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: nextPhoto.title, caption: nextPhoto.caption, image_url: nextPhoto.image_url, UserId: 1 })
      .expect(201);
    expect(body).toEqual({
      id: 2, 
      title: nextPhoto.title,
      caption: 'PHOTOTOK http://image.com/phototok.png',
      image_url: nextPhoto.image_url,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      UserId: 1
    });
  });

  test('should return HTTP status code 401 when no authorization', async () => {
    const { body } = await request(app)
      .get('/photos')
      .expect(401);
    expect(body.message).toMatch(/unauthorized/i);
  });

  test('should return HTTP status code 401 when no token provided', async () => {
    const { body } = await request(app)
      .get('/photos')
      .set('Authorization', 'Bearer ')
      .expect(401);
    expect(body.message).toMatch(/invalid token/i);
  });

  test('should return HTTP status code 401 when no token provided', async () => {
    const { body } = await request(app)
      .get('/photos')
      .set('Authorization', 'Bearer wrong.token.input')
      .expect(401);
    expect(body.message).toMatch(/invalid token/i);
  });

  test('should return HTTP status code 401 when user does not exist', async () => {
    const { body } = await request(app)
      .get('/photos')
      .set('Authorization', `Bearer ${userNotExistsToken}`)
      .expect(401);
    expect(body.message).toMatch(/unauthorized/i);
  });
=======
>>>>>>> 8456af101d59cddc0732f5ae56d2fc61e763496d
})