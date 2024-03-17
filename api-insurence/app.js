const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoute = require('./services/login');
const registerRoute = require('./services/register');

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use(loginRoute);
app.use(registerRoute);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
