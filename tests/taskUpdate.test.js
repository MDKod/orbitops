
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

test('PUT /api/tasks/:id should update an existing task', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .put(`/api/tasks/${task.id}`)
    .send({
      title: 'Updated Task',
      priority: 'high',
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(
    response.body.message,
    'Task updated successfully'
  );
  assert.equal(response.body.data.title, 'Updated Task');
  assert.equal(response.body.data.priority, 'high');
  assert.equal(response.body.data.id, task.id);
});

test('PUT /api/tasks/:id should return 404 for non-existing task', async () => {
  const response = await request(app)
    .put('/api/tasks/non-existing-id')
    .send({
      title: 'Updated Task',
    });

  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Task not found');
});

test('PUT /api/tasks/:id should return 400 for empty body', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .put(`/api/tasks/${task.id}`)
    .send({});

  assert.equal(response.status, 400);
});

test('PUT /api/tasks/:id should return 400 for invalid priority', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .put(`/api/tasks/${task.id}`)
    .send({
      priority: 'urgent-invalid',
    });

  assert.equal(response.status, 400);
});

test('PUT /api/tasks/:id should return 400 for unknown fields', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .put(`/api/tasks/${task.id}`)
    .send({
      unknownField: 'unexpected',
    });

  assert.equal(response.status, 400);
});

test('PUT /api/tasks/:id should return 400 when changing task ID', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .put(`/api/tasks/${task.id}`)
    .send({
      id: 'new-task-id',
    });

  assert.equal(response.status, 400);
});

test('PUT /api/tasks/:id should reject an empty title', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .put(`/api/tasks/${task.id}`)
    .send({
      title: '   ',
    });

  assert.equal(response.status, 400);
});

test('PUT /api/tasks/:id should reject an invalid dueDate', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .put(`/api/tasks/${task.id}`)
    .send({
      dueDate: 'not-a-valid-date',
    });

  assert.equal(response.status, 400);
});

test('PUT /api/tasks/:id should reject a non-string description', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .put(`/api/tasks/${task.id}`)
    .send({
      description: 123,
    });

  assert.equal(response.status, 400);
});

test('PUT /api/tasks/:id should reject an empty assignee', async () => {
  const task = await createTestTask();

  const response = await request(app)
    .put(`/api/tasks/${task.id}`)
    .send({
      assignee: '',
    });

  assert.equal(response.status, 400);
});
