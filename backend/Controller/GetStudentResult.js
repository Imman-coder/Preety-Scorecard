const axios = require("axios");
const { CreateConfigForStudentResult } = require("./Utils");

/**
 * The function `GetStudentResultController` is an asynchronous function that extracts required
 * information from the request body, makes a request to a server for student score information, and
 * sends the parsed response data to the client.
 * @param req - The `req` parameter in the `GetStudentResultController` function is an object
 * representing the HTTP request. It contains information about the request made by the client, such as
 * request headers, parameters, body, and other details. This object is typically provided by the
 * Express.js framework when handling HTTP requests
 * @param res - The `res` parameter in the `GetStudentResultController` function is the response object
 * that will be used to send the response back to the client who made the request. It is typically used
 * to send HTTP responses with data or error messages.
 * @returns The function `GetStudentResultController` returns a response to the client based on the
 * result of the operation. If the required information (`result_id` and `registration_number`) is not
 * found in the request body, a 400 status with a message informing the client is returned. If an error
 * occurs during the process, a 500 status with the message 'An error occurred' is sent. Otherwise
 */
async function GetStudentResultController(req, res) {
    try {
        // extracting required information
        let { result_id, registration_number } = req.body

        console.log(req.body);

        // if required information not found then inform to client
        if (result_id == undefined | registration_number == undefined)
            return res
                .status(400)
                .json({ success: false, message: "result_id and registration_number are required " });

        // creating config to make request to the serve for the student score information
        let config = CreateConfigForStudentResult(result_id, registration_number)

        // make the request to the server
        const response = await axios.request(config)

        // Check if anything fails
        if (response.data.isValidAdmissionNumber == 'false') {
            return res.status(400).json({ success: false, message: "Invalid Registration Number" })
        }

        // parsing the data
        const data = parseResponse(response.data)
        
        // adding registration number to the response
        data.data.regdNo = registration_number

        // send response to client
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};
/**
 * The function `parseResponse` takes a JSON object as input, processes the data according to a
 * specific configuration, and returns a structured response with subject details, student name, SGPA,
 * and CGPA.
 * @param json - The `parseResponse` function takes a JSON object as input and processes it to extract
 * relevant data in a specified format. Here's a breakdown of what the function does:
 * @returns The `parseResponse` function is returning an object with two properties:
 * 1. `data`: Contains an object with the following keys:
 *    - `subjects`: An array of objects representing the formatted data for each subject.
 *    - `studentName`: The name of the student.
 *    - `sgpa`: The SGPA value.
 *    - `cgpa`: The CGPA value.
 * 2. `configuraionJson`: contain an array of objects representing the respective column names to be shown.
 */

function parseResponse(json) {
    // shorthand declerations
    data = json.data
    let conf = json.configurationJson

    // variable declerations
    let keys = {}
    let sgpa = 0.0
    let cgpa = json['CGPA']
    let name = json['studentName']

    // format to search in the table
    let orderl = [
        'courseName',
        'courseCode',
        'courseChoice',
        'courseType',
        [
            'Internal',
            'Internal marks',
            'Internal max marks',
            'Internal percentage',
            'Internal Pass',
        ], [
            'External',
            'External Marks',
            'External max marks',
            'External percentage',
            'External Pass',
        ], [
            'Total',
            'Total Marks',
            'Total max marks',
            'Total percentage',
            'Total pass',
        ],
        'Grade',
        'Grade Points',
        'Credits',
        'Obtained Credits',
        'Credits Points',
        'courseCredits'
    ]

    // skeliton response initialization
    let fdata = []

    // mapping all column names with column id from data
    for (const key in conf) {
        keys[key] = conf[key].columnName
    }

    // standardizing the column id for easy parsing
    for (let i = 0; i < orderl.length; i++) {

        if (orderl[i] instanceof Array) {
            for (let j = 1; j < orderl[i].length; j++) {
                let pos = Object.values(keys).indexOf(orderl[i][j])
                if (pos > -1) {
                    orderl[i][j] = Object.keys(keys)[pos]
                }
            }
        } else {
            let pos = Object.values(keys).indexOf(orderl[i])
            if (pos > -1) {
                orderl[i] = Object.keys(keys)[pos]
            }
        }

    }

    // formatting data in the specified format
    for (const key in data) {
        let it = data[key]
        let lda = {}

        if (key == 'SGPA') {
            sgpa = it
            continue
        } else if (it) {

            // iterating over all columns and putting in its respective format
            orderl.forEach((e, i) => {
                if (e instanceof Array) {
                    let v1 = Math.trunc(it[e[1]])
                    let v2 = Math.trunc(it[e[2]])
                    let v3 = Math.trunc(it[e[3]])

                    v1 = isNaN(v1) ? "-" : v1
                    v2 = isNaN(v2) ? "-" : v2
                    v3 = isNaN(v3) ? "-" : v3 + "%"

                    let hl = (it[e[4]] ?? "").toLowerCase()

                    let vn = '' + v1 + " / " + v2 + " / " + v3
                    lda[conf2[i].field] = [vn,hl]
                } else {
                    let vn = it[e]

                    lda[conf2[i].field] = vn
                }

            });
        }

        // pushing every data columns to the list
        fdata.push(lda)

    }

    return { data: { subjects: fdata, studentName: name, sgpa, cgpa }, configurationJson: conf2 }
}

let conf2 = [
    { field: 'course_name', headerName: "Course Name", },
    { field: 'course_code', headerName: "Course Code", },
    { field: 'course_choice', headerName: "Course Choice", },
    { field: 'course_type', headerName: "Course Type", },
    { field: 'internal', headerName: "Internal", },
    { field: 'external', headerName: "External", },
    { field: 'total', headerName: "Total", },
    { field: 'grade', headerName: "Grade", },
    { field: 'grade_points', headerName: "Grade Points", },
    { field: 'credit', headerName: "Credits", },
    { field: 'obtained_credit', headerName: "Obtained Credits", },
    { field: 'credit_points', headerName: "Credits Points", },
    { field: 'course_credits', headerName: "Course Credits" },
]

module.exports = GetStudentResultController 