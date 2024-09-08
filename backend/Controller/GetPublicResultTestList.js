async function GetPublicResultTestListController(req, res) {
    const delay = process.env.TEST_RESPONSE_DELAY
    try {
        setTimeout(() => {
            res.send(data);
        }, delay)
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};

let data = {
    "info": "This is Dummy data, Use it for testing purpose only",
    "data": {
        "2020": {
            "1": {
                "CSE": {
                    "BACK": 1252
                },
                "EE": {
                    "BACK": 1253
                }
            },
            "3": {
                "ME": {
                    "BACK": 1289
                },
                "CSE": {
                    "BACK": 1295
                }
            },
            "5": {
                "ME": {
                    "BACK": 776
                },
                "EE": {
                    "BACK": 1392
                },
                "CE": {
                    "BACK": 954
                },
                "CSE": {
                    "REGULAR": 998,
                    "BACK": 1391
                }
            },
            "6": {
                "ME": {
                    "BACK": 1447
                },
                "ETC": {
                    "BACK": 1450
                },
                "CSE": {
                    "BACK": 1451
                },
                "CE": {
                    "BACK": 1453
                },
                "EE": {
                    "BACK": 1454
                }
            },
            "8": {
                "ME": {
                    "REGULAR": 596
                },
                "CSE": {
                    "REGULAR": 600
                },
                "EE": {
                    "REGULAR": 605
                },
                "ETC": {
                    "REGULAR": 604
                },
                "CE": {
                    "REGULAR": 606
                }
            }
        },
        "2021": {
            "1": {
                "ME": {
                    "REGULAR": 638
                },
                "CSE": {
                    "REGULAR": 645
                },
                "EE": {
                    "REGULAR": 661
                },
                "CE": {
                    "BACK": 1283
                }
            },
            "2": {
                "ETC": {
                    "REGULAR": 608
                },
                "CSE": {
                    "REGULAR": 681
                }
            },
            "3": {
                "CE": {
                    "REGULAR": 609,
                    "BACK": 1303
                },
                "EE": {
                    "REGULAR": 652,
                    "BACK": 1300
                },
                "ETC": {
                    "REGULAR": 617,
                    "BACK": 1301
                },
                "CSE": {
                    "REGULAR": 646,
                    "BACK": 1302
                },
                "ME": {
                    "REGULAR": 659,
                    "BACK": 1298
                }
            },
            "4": {
                "CE": {
                    "REGULAR": 618
                },
                "CSE": {
                    "REGULAR": 619
                },
                "EE": {
                    "REGULAR": 622
                },
                "ETC": {
                    "REGULAR": 623
                },
                "ME": {
                    "REGULAR": 660
                }
            },
            "5": {
                "CSE": {
                    "REGULAR": 625
                },
                "CE": {
                    "REGULAR": 626
                },
                "ME": {
                    "REGULAR": 627
                },
                "EE": {
                    "REGULAR": 629
                },
                "ETC": {
                    "REGULAR": 632
                }
            }
        },
        "2022": {
            "1": {
                "CSE": {
                    "REGULAR": 1005,
                    "BACK": 1304
                },
                "CE": {
                    "REGULAR": 1038,
                    "BACK": 1305
                },
                "ME": {
                    "REGULAR": 1043,
                    "BACK": 1335
                },
                "ETC": {
                    "REGULAR": 1044,
                    "BACK": 1336
                },
                "EE": {
                    "REGULAR": 1118,
                    "BACK": 1307
                }
            },
            "2": {
                "CSE": {
                    "REGULAR": 1071
                },
                "CE": {
                    "REGULAR": 1072
                },
                "EE": {
                    "REGULAR": 1076
                },
                "ME": {
                    "REGULAR": 1077
                },
                "ETC": {
                    "REGULAR": 1078
                }
            },
            "3": {
                "CSE": {
                    "REGULAR": 1079
                },
                "CE": {
                    "REGULAR": 1120
                },
                "EE": {
                    "REGULAR": 1122
                },
                "ME": {
                    "REGULAR": 1123
                },
                "ETC": {
                    "REGULAR": 1124
                }
            }
        },
        "2023": {
            "1": {
                "CE": {
                    "REGULAR": 1048
                },
                "ME": {
                    "REGULAR": 1050
                },
                "CSE": {
                    "REGULAR": 1052
                },
                "EE": {
                    "REGULAR": 1064
                },
                "ETC": {
                    "REGULAR": 1066
                }
            }
        }
    },
    "type": "year -> sem -> branch -> Regular/Back -> ==ID== "
}

module.exports = GetPublicResultTestListController