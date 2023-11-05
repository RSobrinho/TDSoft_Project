import request from 'supertest'
import app from '../server'

describe('GET /', () => {
    it('responds with Hello World!', async () => {
        const response = await request(app).get('/');
        expect(response.text).toEqual('Hello World!');
        expect(response.statusCode).toBe(200);
      });
})