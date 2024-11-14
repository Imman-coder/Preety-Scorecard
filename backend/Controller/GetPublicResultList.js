const axios = require('axios');
const { CreateConfigForPublicList } = require('./Utils');


/**
 * The function `GetPublicResultListController` asynchronously retrieves a publicly available list from
 * a server, parses the response data, and sends it to the client, handling errors appropriately.
 * @param req - The `req` parameter in the `GetPublicResultListController` function typically
 * represents the request object, which contains information about the incoming HTTP request such as
 * headers, parameters, body, etc. This parameter is used to extract data sent by the client to the
 * server.
 * @param res - The `res` parameter in the `GetPublicResultListController` function is the response
 * object that will be used to send the response back to the client making the request. It is typically
 * provided by the Express.js framework in Node.js and contains methods for sending data back to the
 * client, such as
*/
async function GetPublicResultListController(req, res) {
    try {
        // creating config to make request to the server for publicly available list
        let config = CreateConfigForPublicList(9999)
        
        // make the request
        const response = await axios.request(config)
        
        // parse the response data to suitable format and send to client
        res.send(parseResponse(response.data));
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
}


/**
 * The function `parseResponse` extracts information from a data object and organizes it into a
 * structured format based on a specific pattern in the data.
 * @param data - The `data` parameter is an object containing a property `resultList`, which is an
 * array of items. Each item in the `resultList` array has a `title` property that contains information
 * about the item. The `title` property is expected to follow a specific format that includes
 * information about
 * @returns The `parseResponse` function is returning a structured object `newli` that contains parsed
 * data from the input `data`. The object has a `data` property that stores information organized by
 * year, semester, branch, and an ID extracted from the input data. The `type` property provides a
 * template or format for how the data is structured within the `data` property.
*/
function parseResponse(data) {

    const regex = /(MTECH|BTECH|PhD).*(\d).*(20\d\d).*(CSE|CE|ME|EE|EEE|ETC|EPS) {1,3}(RESULT|(BACK) RESULT|(SPL) RESULT)/gm;
    
    // skeliton response initialization
    let newli = { "data": {}, "type": "year -> sem -> branch -> Regular/Back -> ==ID== " }
    
    // shorthand decleration
    let li = data.data.resultList
    
    // Iterate over all items
    for (const key in li) {
        let it = li[key]
        let name = it.title

        // using regex to extract information
        let m = name.matchAll(regex)

        m = [...m][0]

        // if not found any then go to next
        if( m === undefined) {
            console.log(name);
            continue
        }  

        // console.log(m);

        
        let course = m[1].toUpperCase()
        let sem = m[2]
        let year = m[3]
        let branch = m[4]
        let isBack = (m[6] !== undefined) ? "BACK" : "REGULAR"
        
        if(m[7] || course === "PHD" || course === "MTECH") continue

        // Safety check handle to prevent error
        if (newli["data"][year] === undefined)
            newli["data"][year] = {}
        if (newli["data"][year][sem] === undefined)
            newli["data"][year][sem] = {}
        if (newli["data"][year][sem][branch] === undefined)
            newli["data"][year][sem][branch] = {}
        if (newli["data"][year][sem][branch][isBack] === undefined)
            newli["data"][year][sem][branch][isBack] = {}

        // copying data to new variable for easy management
        newli["data"][year][sem][branch][isBack] = parseInt(key)
    }

    return newli;
}

module.exports = GetPublicResultListController