const express = require('express');
const GetPublicResultList = require("./Controller/GetPublicResultList")
const GetStudentResult = require("./Controller/GetStudentResult")
const GetPublicResultTestList = require("./Controller/GetPublicResultTestList")
const GetStudentTestResult = require("./Controller/GetStudentTestResult")
const cors = require('cors')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())

// Handle Routes
app.get('/test/getResultList', GetPublicResultTestList)
app.post('/test/getStudentResult', GetStudentTestResult)
app.get('/api/getResultList', GetPublicResultList)
app.post('/api/getStudentResult', GetStudentResult)

// Starting Server to listen
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

