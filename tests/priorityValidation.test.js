
const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../src/app');

const validPriorities = ['low', 'medium', 'high', 'urgent'];

for (const priority of validPriorities) {
  test(`GET /api/tasks?priority=${priority} should return 200`, async () => {
    const response = await request(app)
      .get(`/api/tasks?priority=${priority}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
  });
}

test('Invalid priority should return 400', async () => {
  const response = await request(app)
    .get('/api/tasks?priority=invalid');

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
});

test('Uppercase priority should return 400', async () => {
  const response = await request(app)
    .get('/api/tasks?priority=HIGH');

  assert.equal(response.status, 400);
});

test('Empty priority should return 400', async () => {
  const response = await request(app)
    .get('/api/tasks?priority=');

  assert.equal(response.status, 400);
});

test('Repeated priority parameters should return 400', async () => {
  const response = await request(app)
    .get('/api/tasks?priority=high&priority=low');

  assert.equal(response.status, 400);
});
