async function GetPublicResultTestListController(req, res) {
    const delay = process.env.TEST_RESPONSE_DELAY
    try {
        setTimeout(()=>{
            res.send(data);
        },delay)
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};

let data = {
    "data": {
        "2020": {
            "1": {
                "CE": 434,
                "ME": 436,
                "CSE": 438,
                "EE": 459,
                "ETC": 457
            },
            "2": {
                "CE": 460,
                "ETC": 463,
                "CSE": 465,
                "EE": 467,
                "ME": 504
            },
            "3": {
                "CE": 468,
                "ME": 473,
                "ETC": 474,
                "EE": 478,
                "CSE": 506
            },
            "4": {
                "CE": 479,
                "CSE": 480,
                "ME": 481,
                "ETC": 482,
                "EE": 484
            },
            "5": {
                "CE": 485,
                "CSE": 486,
                "EE": 489,
                "ME": 488,
                "ETC": 490
            },
            "6": {
                "CE": 512,
                "CSE": 513,
                "ME": 514,
                "EE": 516,
                "ETC": 517
            },
            "7": {
                "CE": 518,
                "CSE": 519,
                "ME": 520,
                "EE": 522,
                "ETC": 523
            },
            "8": {
                "ME": 596,
                "CSE": 600,
                "EE": 605,
                "ETC": 604,
                "CE": 606
            }
        },
        "2021": {
            "1": {
                "EE": 661,
                "ETC": 530,
                "ME": 638,
                "CSE": 645
            },
            "5": {
                "CSE": 625,
                "CE": 626,
                "ME": 627,
                "EE": 629,
                "ETC": 632
            }
        }
    },
    "type": "year -> sem -> branch -> ==ID== "
}

module.exports = GetPublicResultTestListController