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

    // skeliton response initialization
    let newli = { "data": {}, "type": "year -> sem -> branch -> Regular/Back -> ==ID== " }
    
    // shorthand decleration
    let li = data.data.resultList
    
    // Iterate over all items
    for (const key in li) {
        let it = li[key]
        let name = it.title

        let extractedInfo;
        try {
            // using regex to extract information
            extractedInfo = extractInfo(name)
            
        } catch (error) {
            continue;
        }

        // if not found any then go to next
        if( extractedInfo === undefined) {
            console.log(name);
            continue
        }  

        // console.log(m);

        
        let course = extractedInfo[0].toUpperCase()
        let sem = extractedInfo[1]
        let year = extractedInfo[2]
        let branch = extractedInfo[3]
        let isBack = extractedInfo[4] ? "BACK" : "REGULAR"
        
        if(extractedInfo[7] || course === "PHD" || course === "MTECH") continue

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

function extractInfo(name){
    const course_regex  = /MTECH|BTECH|PhD/gm;
    const sem_regex = /(\d)(ST|ND|RD|TH|SEM)/gi;
    const year_regex = /20\d\d/gm;
    const branch_regex = /\b(CE|ME|EEE|EE|ETC|SE|EECSE|EPS|CSE\(DS\)|CSE\(CS\)|CSE\(AIML\)|CSE\(IOT\)|CSE\(IT\)|CSE|ETCSE|MSD)\b/gm;
    const back_regex = /(BACK)/gm;

    
    const course = name.match(course_regex)[0];
    const sem = [...name.matchAll(sem_regex)][0][1];
    const year = name.match(year_regex)[0];
    const branch = name.match(branch_regex)[0];
    const back = name.match(back_regex) === null ? false : true;
    
    return([course,sem,year,branch,back])
}

module.exports = GetPublicResultListController