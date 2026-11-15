const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../src/app');

test('Priority and pagination should work together', async () => {
  const response = await request(app)
    .get('/api/tasks?priority=high&page=2&limit=5');

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.pagination.currentPage, 2);
  assert.equal(response.body.pagination.limit, 5);
  assert.ok(Array.isArray(response.body.data));
});

test('Pagination metadata should use default values', async () => {
  const response = await request(app)
    .get('/api/tasks');

  assert.equal(response.status, 200);
  assert.equal(response.body.pagination.currentPage, 1);
  assert.equal(response.body.pagination.limit, 10);
});