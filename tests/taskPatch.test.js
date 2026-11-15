
const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../src/app');

const createTestTask = async () => {
  const response = await request(app)
    .post('/api/tasks')
    .send({
      title: 'Original Task',
      description: 'Original description',
      assignee: 'Test User',
      priority: 'medium',
    });

  assert.equal(response.status, 201);

  return response.body.data;
};

test('PATCH /api/tasks/:id should partially update an existing task', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .patch(`/api/tasks/${task.id}`)
    .send({
      title: 'Patched Task',
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(
    response.body.message,
    'Task partially updated successfully'
  );

  assert.equal(response.body.data.title, 'Patched Task');
  assert.equal(response.body.data.description, 'Original description');
  assert.equal(response.body.data.assignee, 'Test User');
  assert.equal(response.body.data.priority, 'medium');
  assert.equal(response.body.data.id, task.id);
});

test('PATCH /api/tasks/:id should preserve existing fields when updating multiple fields', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .patch(`/api/tasks/${task.id}`)
    .send({
      title: 'Updated Title',
      priority: 'high',
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.data.title, 'Updated Title');
  assert.equal(response.body.data.priority, 'high');
  assert.equal(response.body.data.description, 'Original description');
  assert.equal(response.body.data.assignee, 'Test User');
  assert.equal(response.body.data.id, task.id);
});

test('PATCH /api/tasks/:id should return 404 for non-existing task', async () => {
  const response = await request(app)
    .patch('/api/tasks/non-existing-id')
    .send({
      title: 'Patched Task',
    });

  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Task not found');
});

test('PATCH /api/tasks/:id should reject attempts to change task ID', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .patch(`/api/tasks/${task.id}`)
    .send({
      id: 'new-task-id',
      title: 'Patched Task',
    });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Invalid update fields.');
});
