const FormData = require('form-data');

/**
 * The function `createConfigFromForm` generates a configuration object with headers and data for
 * making a POST request to a specified URL, with some headers set to spoof as a regular Chrome client.
 * @param data - The `data` parameter in the `createConfigFromForm` function likely represents form
 * data that will be sent in a POST request. This form data could include key-value pairs of the form
 * fields that the user has filled out on a web form.
 * @returns The function `createConfigFromForm` is returning a configuration object that includes the
 * following properties:
 */
function createConfigFromForm(data) {

    // Using the link from .env file ip presnt
    let url = process.env.SERVER_URL || "https://portal.vmedulife.com/api/assessment/publicLink.php"

    // generating config to spoof as a regular chrome client
    return {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'host': 'portal.vmedulife.com',
            'connection': 'keep-alive',
            'sec-ch-ua-platform': '"Windows"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
            'accept': 'application/json',
            'sec-ch-ua': '"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
            ...data.getHeaders(),
            'sec-ch-ua-mobile': '?0',
            'sec-gpc': '1',
            'accept-language': 'en-GB,en;q=0.8',
            'origin': 'https://portal.vmedulife.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://portal.vmedulife.com/public/assessment/',
            'accept-encoding': 'gzip, deflate, br, zstd',
        },
        data : data
    };

}

/**
 * The function `CreateConfigForStudentResult` creates a configuration for fetching a student's
 * scorecard details based on the provided result ID and registration number.
 * @param result_id - The `result_id` parameter is used to identify the specific result for which the
 * configuration is being created. It could be a unique identifier for a particular exam or assessment.
 * @param registration_number - The `registration_number` parameter is used to generate the admission
 * number for a student. In the provided function `CreateConfigForStudentResult`, it is used to create
 * the admission number by appending "DRMU" before the registration number.
 * @returns A function named `CreateConfigForStudentResult` is being returned. This function takes two
 * parameters `result_id` and `registration_number`, creates a JSON data object with specific key-value
 * pairs, encodes the JSON data to base64, appends it to a FormData object along with another key-value
 * pair, and then returns the FormData object.
 */
let CreateConfigForStudentResult = (result_id, registration_number) => {

    // JSON data to send
    let fd = { "institute_url": "driems-soet-cuttack", "result_id": result_id, "admission_number": "DRMU" + registration_number, "search_type": "university_number" }

    // creating new form data
    let data = new FormData();

    // encoding the JSON data to base64 and adding it as data
    data.append('data', btoa(JSON.stringify(fd)));

    // setting form to fetch student scorecard details
    data.append('getStudentResult', 'true');

    // creating form and returning it
    return createConfigFromForm(data)
}



/**
 * The function `CreateConfigForPublicList` creates a configuration for fetching a public result list
 * with a specified count.
 * @param [count=100] - The `count` parameter in the `CreateConfigForPublicList` function specifies the
 * limit of items to be included in the public result list. By default, if no value is provided for
 * `count`, it is set to 100. You can adjust this parameter to control how many items are displayed
 * @returns A function named `CreateConfigForPublicList` is being returned. This function takes an
 * optional parameter `count` with a default value of 100. Inside the function, it creates a JSON
 * object `fd` with specific key-value pairs. It then creates a new FormData object, encodes the JSON
 * data to base64, appends it to the FormData object, and sets another key-value pair
 */
let CreateConfigForPublicList = (count=100) => {

    // JSON data to send
    let fd = { "institute_url": "driems-soet-cuttack", "aca_yr": "", "sid": "", "page_index": 1, "limit": count }
    
    // creating new form data
    let data = new FormData();

    // encoding it JSON data to base64 and adding it as data
    data.append('data', btoa(JSON.stringify(fd)));

    // setting form data to fetch Public Result List
    data.append('getResultListForPublicPage', 'true');

    // creating form and returning it
    return createConfigFromForm(data)

}
module.exports = {CreateConfigForPublicList, CreateConfigForStudentResult}