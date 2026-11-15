
const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../src/app');

test('GET /api/tasks should return 200', async () => {
  const response = await request(app)
    .get('/api/tasks');

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(
    response.body.message,
    'Tasks retrieved successfully'
  );
  assert.ok(Array.isArray(response.body.data));
});

test('POST /api/tasks should create a new task', async () => {
  const response = await request(app)
    .post('/api/tasks')
    .send({
      title: 'Test Task',
      description: 'Testing task creation',
      assignee: 'Meryem',
      priority: 'high',
    });

  assert.equal(response.status, 201);
  assert.equal(response.body.success, true);
  assert.equal(
    response.body.message,
    'Task created successfully'
  );

  assert.ok(response.body.data.id);
  assert.equal(response.body.data.title, 'Test Task');
  assert.equal(response.body.data.description, 'Testing task creation');
  assert.equal(response.body.data.assignee, 'Meryem');
  assert.equal(response.body.data.priority, 'high');
  assert.equal(response.body.data.status, 'pending');
});

test('POST /api/tasks should reject an empty title', async () => {
  const response = await request(app)
    .post('/api/tasks')
    .send({
      title: '',
      description: 'Testing invalid task',
      assignee: 'Meryem',
      priority: 'high',
    });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Task title is required.');
});


test('GET /api/tasks/:id should return an existing task', async () => {
  const createResponse = await request(app)
    .post('/api/tasks')
    .send({
      title: 'Find Task',
      description: 'Testing task retrieval',
      assignee: 'Meryem',
      priority: 'medium',
    });

  const taskId = createResponse.body.data.id;

  const response = await request(app)
    .get(`/api/tasks/${taskId}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.message, 'Task retrieved successfully');
  assert.equal(response.body.data.id, taskId);
  assert.equal(response.body.data.title, 'Find Task');
});

test('GET /api/tasks/:id should return 404 for non-existing task', async () => {
  const response = await request(app)
    .get('/api/tasks/non-existing-id');

  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Task not found');
});

test('DELETE /api/tasks/:id should delete an existing task', async () => {
  const createResponse = await request(app)
    .post('/api/tasks')
    .send({
      title: 'Task to Delete',
      description: 'Testing task deletion',
      assignee: 'Meryem',
      priority: 'low',
    });

  const taskId = createResponse.body.data.id;

  const response = await request(app)
    .delete(`/api/tasks/${taskId}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.message, 'Task deleted successfully');
  assert.equal(response.body.data.id, taskId);
  assert.equal(response.body.data.title, 'Task to Delete');
});

test('DELETE /api/tasks/:id should remove the task permanently', async () => {
  const createResponse = await request(app)
    .post('/api/tasks')
    .send({
      title: 'Task to Remove',
      description: 'Verify deletion',
      assignee: 'Meryem',
      priority: 'medium',
    });

  const taskId = createResponse.body.data.id;

  const deleteResponse = await request(app)
    .delete(`/api/tasks/${taskId}`);

  assert.equal(deleteResponse.status, 200);

  const getResponse = await request(app)
    .get(`/api/tasks/${taskId}`);

  assert.equal(getResponse.status, 404);
  assert.equal(getResponse.body.success, false);
  assert.equal(getResponse.body.message, 'Task not found');
});



