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
    let data = json.data
    let conf = json.configurationJson

    // variable declerations
    let keys = {}
    let sgpa = 0.0
    let cgpa = json['CGPA']
    let name = json['studentName']

    // format to search in the table
    let orderToShow = {
        'course_name': {
            type: 0,
            matcher: ['course Name',"courseName"]
        },
        'course_code': {
            type: 0,
            matcher: ['courseCode']
        },
        'course_choice': {
            type: 0,
            matcher: ['courseChoice']
        },
        'course_type': {
            type: 0,
            matcher: ['courseType']
        },
        'internal': {
            type: 1,
            matchers:
                [
                    ['Internal marks', 'TH SEC'],
                    ['Internal max marks', 'TH MAX'],
                    ['Internal percentage', 'TH %'],
                    ['Internal Pass', 'TH PASS'],
                ]
        },
        'external': {
            type: 1,
            matchers:
                [
                    ['External Marks', 'EXT SEC'],
                    ['External max marks', 'EXT MAX'],
                    ['External percentage', 'EXT %'],
                    ['External Pass', 'EXT PASS'],
                ]
        },
        'total':
        {
            type: 1,
            matchers: [
                ['Total Marks', 'SEC'],
                ['Total max marks', 'MAX'],
                ['Total percentage', '%'],
                ['Total pass', 'TOTAL PASS'],
            ]
        },
        'grade': {
            type: 0,
            matcher: ['GRADE',"Grade"]
        },
        'grade_points': {
            type: 0,
            matcher: ['GRADE POINTS', "Grade Points"]
        },
        'credits': {
            type: 0,
            matcher: ['CREDITS', "Credits"]
        },
        'obtained_credits': {
            type: 0,
            matcher: ['OBTAINED CREDITS', "Obtained Credits"]
        },
        'credit_points': {
            type: 0,
            matcher: ['CREDITS POINTS', "Credits Points"]
        },
        'course_credits': {
            type: 0,
            matcher: ['courseCredits']
        }
    }

    // skeliton response initialization
    let finalSubjectData = []

    // mapping all column names with column id from data
    for (const key in conf) {
        keys[conf[key].columnName] = key
    }

    // standardizing the column id for easy parsing and mapping
    for (let e in orderToShow) {

        if (orderToShow[e].type == 1) {
            for (let i = 0; i < orderToShow[e].matchers.length; i++) {

                let v = orderToShow[e].matchers[i].find(a => a in keys)

                let pos = keys[v]
                
                if (pos) {
                    orderToShow[e].matchers[i] = [pos]
                }
            }
        } else if (orderToShow[e].type == 0) {
            let v = orderToShow[e].matcher.find(a => a in keys)

            let pos = keys[v];
            if (pos ) {
                orderToShow[e].matcher = [pos]
            }
        }

    };

    // formatting data in the specified format
    for (const key in data) {
        let it = data[key]
        let current_subject_data = {}

        if (key == 'SGPA') {
            sgpa = it
            continue
        } else if (it) {

            // iterating over all columns and putting in its respective format
            for(let order_key in orderToShow){
                if(orderToShow[order_key].type == 1){
                    for(let _ in orderToShow[order_key].matchers){

                        const secured_marks_key = orderToShow[order_key].matchers[0].find(e => e in it)
                        const full_marks_key = orderToShow[order_key].matchers[1].find(e => e in it)
                        const percentage_key = orderToShow[order_key].matchers[2].find(e => e in it)
                        const final_result_key = orderToShow[order_key].matchers[3].find(e => e in it)

                        let secured = Math.trunc(it[secured_marks_key])
                        let full_marks = Math.trunc(it[full_marks_key])                        
                        let percentage = Math.trunc(it[percentage_key])

                        secured = isNaN(secured) ? "-" : secured
                        full_marks = isNaN(full_marks) ? "-" : full_marks
                        percentage = isNaN(percentage) ? "-" : percentage + "%"

                        let hl = (it[final_result_key] ?? "").toLowerCase()

                        let vn = '' + secured + " / " + full_marks + " / " + percentage

                        const idx = conf2.findIndex(x => x.field == order_key)

                        current_subject_data[conf2[idx].field] = [vn,hl]
                    }
                } else {
                    const key = orderToShow[order_key].matcher.find(x => x in it)
                    let vn = it[key]
                    
                    const idx = conf2.findIndex(x => x.field == order_key)

                    current_subject_data[conf2[idx].field] = vn
                }
            }
        }

        // pushing every data columns to the list
        finalSubjectData.push(current_subject_data)

    }

    return { data: { customFooter:json.customFooter, customHeader:json.customHeader, subjects: finalSubjectData, studentName: name, sgpa, cgpa }, "success":true, configurationJson: conf2 }
}

let conf2 = [
    { field: 'course_name', headerName: "Subject Name",displayInWebsite: true },
    { field: 'course_code', headerName: "Subject Code",displayInWebsite: true },
    { field: 'course_choice', headerName: "Course Choice", },
    { field: 'course_type', headerName: "Course Type", },
    { field: 'internal', headerName: "Internal", },
    { field: 'external', headerName: "External", },
    { field: 'total', headerName: "Total", },
    { field: 'grade', headerName: "Grade",displayInWebsite: true },
    { field: 'credits', headerName: "Credits",displayInWebsite: true },
    { field: 'grade_points', headerName: "Grade Points", },
    { field: 'obtained_credits', headerName: "Obtained Credits", },
    { field: 'credit_points', headerName: "Credits Points", },
    { field: 'course_credits', headerName: "Course Credits" },
]

module.exports = GetStudentResultController 