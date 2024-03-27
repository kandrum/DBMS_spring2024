const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoute = require('./services/login');
const registerRoute = require('./services/register');
const autoinsurence =require('./services/auto');
const getquoteauto =require('./services/quote_auto');
const healthinsurence =require('./services/health');
const getquotehealth =require('./services/quote_health');

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use(loginRoute);
app.use(registerRoute);
app.use(autoinsurence);
app.use(getquoteauto);
app.use(healthinsurence);
app.use(getquotehealth);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
