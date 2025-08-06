const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/users');

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
    console.log('server running on http://localhost:3000');
});