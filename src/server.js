
const app = require('./app');
const config = require('./config/config');

app.listen(config.port, () => {
  console.log(
    `OrbitOps API is running on http://localhost:${config.port}`
  );
});
