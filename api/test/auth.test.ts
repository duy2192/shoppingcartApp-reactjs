import request from 'supertest';
import {BASE_URL} from '../src/constants';

const userPayload = {
  email: 'test123@gmail.com',
  password: 'test123',
  repeatPassword: 'test123',
  username: 'test123',
};
describe('Test Auth', () => {
  afterAll(async()=>{
    const response = await request(BASE_URL).delete('auth/').send(userPayload);
    expect(response.statusCode).toBe(200);
  })

  it('It should response 200 when register', async () => {
    const response = await request(BASE_URL).post('auth/register').send(userPayload);
    expect(response.statusCode).toBe(200);
  });

  it('It should response 200 when login', async () => {
    const response = await request(BASE_URL).post('auth/login').send({
      identifier: 'test123',
      password: 'test123',
    });
    expect(response.statusCode).toBe(200);
  });


});
