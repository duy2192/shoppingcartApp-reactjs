import request from 'supertest';
import { BASE_URL } from '../src/constants';

let productPayload = {
  _id: null,
  name: 'test123',
  price: 20000000,
  description: 'test123',
  thumbnails: 'test123',
  categories: ['62d4c8cad549c457b062ae47'],
};
describe('Test Product Api', () => {
  beforeAll(async () => {
    const response = await request(BASE_URL).post('product/').send(productPayload);
    productPayload._id = response.body.results._id;
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    const response = await request(BASE_URL).delete(`product/${productPayload._id}`);
    expect(response.statusCode).toBe(200);
  });

  it('It should response 200 when get product list', async () => {
    const response = await request(BASE_URL).get('product/');
    expect(response.statusCode).toBe(200);
  });
  
});
