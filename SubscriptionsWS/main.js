const express=require('express');
const subscriptionsController=require('./controllers/subscriptionsController');
const membersController=require('./controllers/membersController');
const cors = require('cors');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
require('./configs/database');
app.use('/api/subscriptions',subscriptionsController);
app.use('/api/members',membersController);
app.listen(8000);