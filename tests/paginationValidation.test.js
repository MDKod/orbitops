
const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../src/app');

test('Pagination should return the correct number of tasks per page', async () => {
  const taskData = [
    { title: 'Task 1', assignee: 'Meryem', priority: 'low' },
    { title: 'Task 2', assignee: 'Meryem', priority: 'medium' },
    { title: 'Task 3', assignee: 'Meryem', priority: 'high' },
    { title: 'Task 4', assignee: 'Meryem', priority: 'urgent' },
    { title: 'Task 5', assignee: 'Meryem', priority: 'low' },
  ];

  // 1. Create five tasks
  for (const task of taskData) {
    const createResponse = await request(app)
      .post('/api/tasks')
      .send(task);

    assert.equal(createResponse.status, 201);
  }

  // 2. Retrieve three pages
  const firstPage = await request(app)
    .get('/api/tasks?page=1&limit=2');

  const secondPage = await request(app)
    .get('/api/tasks?page=2&limit=2');

  const thirdPage = await request(app)
    .get('/api/tasks?page=3&limit=2');

  // 3. Verify task counts
  assert.equal(firstPage.body.data.length, 2);
  assert.equal(secondPage.body.data.length, 2);
  assert.equal(thirdPage.body.data.length, 1);

  // 4. Verify pagination metadata
  assert.equal(firstPage.body.pagination.totalTasks, 5);
  assert.equal(firstPage.body.pagination.totalPages, 3);

  assert.equal(firstPage.body.pagination.currentPage, 1);
  assert.equal(secondPage.body.pagination.currentPage, 2);
  assert.equal(thirdPage.body.pagination.currentPage, 3);

  // 5. Verify unique task IDs
  const allTaskIds = [
    ...firstPage.body.data.map((task) => task.id),
    ...secondPage.body.data.map((task) => task.id),
    ...thirdPage.body.data.map((task) => task.id),
  ];

  assert.equal(new Set(allTaskIds).size, 5);

  // 6. Verify task order
  assert.deepEqual(
    [
      ...firstPage.body.data,
      ...secondPage.body.data,
      ...thirdPage.body.data,
    ].map((task) => task.title),
    ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']
  );
});
