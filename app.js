const express = require('express');
const rootRouter = require('./api/routes/rootRouter');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log('connected to MongoDB'),
);

app.use(cors());
app.use(express.json());

rootRouter(app);

app.listen(process.env.PORT, () => console.log('Server up'));
