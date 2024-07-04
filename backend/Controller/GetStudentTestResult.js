async function GetStudentTestResultController(req, res) {
    const delay = process.env.TEST_RESPONSE_DELAY
    try {
        setTimeout(()=>{
            res.json(data)
        },delay)
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};


let data = {
    "data": {
        "subjects": [
            {
                "course_name": "DATABASE ENGINEERING LAB",
                "course_code": "ETCSS301",
                "course_choice": "regular",
                "course_type": "Practical",
                "internal": [
                    "- / - / -",
                    ""
                ],
                "external": [
                    "60 / 100 / 60%",
                    "pass"
                ],
                "total": [
                    "60 / 100 / 60%",
                    "pass"
                ],
                "grade": "B",
                "grade_points": "7",
                "credit": "2",
                "obtained_credit": "2",
                "credit_points": "14",
                "course_credits": 2
            },
            {
                "course_name": "COMPILER DESIGN LAB",
                "course_code": "ETCSS302",
                "course_choice": "regular",
                "course_type": "Practical",
                "internal": [
                    "- / - / -",
                    ""
                ],
                "external": [
                    "70 / 100 / 70%",
                    "pass"
                ],
                "total": [
                    "70 / 100 / 70%",
                    "pass"
                ],
                "grade": "A",
                "grade_points": "8",
                "credit": "2",
                "obtained_credit": "2",
                "credit_points": "16",
                "course_credits": 2
            },
            {
                "course_name": "EVALUATION OF SUMMER INTERNSHIP-II",
                "course_code": "ETINS301",
                "course_choice": "regular",
                "course_type": "Practical",
                "internal": [
                    "- / - / -",
                    ""
                ],
                "external": [
                    "60 / 100 / 60%",
                    "pass"
                ],
                "total": [
                    "60 / 100 / 60%",
                    "pass"
                ],
                "grade": "B",
                "grade_points": "7",
                "credit": "1",
                "obtained_credit": "1",
                "credit_points": "7",
                "course_credits": 1
            },
            {
                "course_name": "COMPILER DESIGN",
                "course_code": "ETCST302",
                "course_choice": "regular",
                "course_type": "Theory",
                "internal": [
                    "10 / 50 / 20%",
                    "fail"
                ],
                "external": [
                    "68 / 100 / 68%",
                    "pass"
                ],
                "total": [
                    "78 / 150 / 52%",
                    "fail"
                ],
                "grade": "F",
                "grade_points": "0",
                "credit": "3",
                "obtained_credit": "0",
                "credit_points": "0",
                "course_credits": 3
            },
            {
                "course_name": "OPERATING SYSTEM",
                "course_code": "ETCST304",
                "course_choice": "regular",
                "course_type": "Theory",
                "internal": [
                    "0 / 50 / 0%",
                    "fail"
                ],
                "external": [
                    "69 / 100 / 69%",
                    "pass"
                ],
                "total": [
                    "69 / 150 / 46%",
                    "fail"
                ],
                "grade": "F",
                "grade_points": "0",
                "credit": "3",
                "obtained_credit": "0",
                "credit_points": "0",
                "course_credits": 3
            },
            {
                "course_name": "ESSENCE OF INDIAN TRADITIONAL KNOWLEDGE",
                "course_code": "ETMCT301",
                "course_choice": "regular",
                "course_type": "Theory",
                "internal": [
                    "0 / 50 / 0%",
                    "fail"
                ],
                "external": [
                    "80 / 100 / 80%",
                    "pass"
                ],
                "total": [
                    "80 / 150 / 53%",
                    "fail"
                ],
                "grade": "F",
                "grade_points": "0",
                "credit": "0",
                "obtained_credit": "0",
                "credit_points": "0",
                "course_credits": 0
            },
            {
                "course_name": "DATABASE ENGINEERING",
                "course_code": "ETCST301",
                "course_choice": "regular",
                "course_type": "Theory",
                "internal": [
                    "4 / 50 / 8%",
                    "fail"
                ],
                "external": [
                    "85 / 100 / 85%",
                    "pass"
                ],
                "total": [
                    "89 / 150 / 59%",
                    "fail"
                ],
                "grade": "F",
                "grade_points": "0",
                "credit": "3",
                "obtained_credit": "0",
                "credit_points": "0",
                "course_credits": 3
            },
            {
                "course_name": "SOFTWARE ENGINEERING",
                "course_code": "ETCST303",
                "course_choice": "regular",
                "course_type": "Theory",
                "internal": [
                    "6 / 50 / 12%",
                    "fail"
                ],
                "external": [
                    "73 / 100 / 73%",
                    "pass"
                ],
                "total": [
                    "79 / 150 / 52%",
                    "fail"
                ],
                "grade": "F",
                "grade_points": "0",
                "credit": "2",
                "obtained_credit": "0",
                "credit_points": "0",
                "course_credits": 2
            },
            {
                "course_name": "ADVANCE COMPUTER ARCHITECTURE",
                "course_code": "ETCST305",
                "course_choice": "elective",
                "course_type": "Theory",
                "internal": [
                    "0 / 50 / 0%",
                    "fail"
                ],
                "external": [
                    "78 / 100 / 78%",
                    "pass"
                ],
                "total": [
                    "78 / 150 / 52%",
                    "fail"
                ],
                "grade": "F",
                "grade_points": "0",
                "credit": "3",
                "obtained_credit": "0",
                "credit_points": "0",
                "course_credits": 3
            },
            {
                "course_name": "OPERATING SYSTEM LAB",
                "course_code": "ETCSS303",
                "course_choice": "regular",
                "course_type": "Practical",
                "internal": [
                    "- / - / -",
                    ""
                ],
                "external": [
                    "62 / 100 / 62%",
                    "pass"
                ],
                "total": [
                    "62 / 100 / 62%",
                    "pass"
                ],
                "grade": "B",
                "grade_points": "7",
                "credit": "2",
                "obtained_credit": "2",
                "credit_points": "14",
                "course_credits": 2
            },
            {
                "course_name": "EXTRA ACADEMIC ACTIVITIES",
                "course_code": "ETHSS301",
                "course_choice": "regular",
                "course_type": "Practical",
                "internal": [
                    "- / - / -",
                    ""
                ],
                "external": [
                    "60 / 100 / 60%",
                    "pass"
                ],
                "total": [
                    "60 / 100 / 60%",
                    "pass"
                ],
                "grade": "B",
                "grade_points": "7",
                "credit": "1",
                "obtained_credit": "1",
                "credit_points": "7",
                "course_credits": 1
            }
        ],
        "studentName": "Pratik Kullu",
        "sgpa": 2.64,
        "cgpa": 6.49
    },
    "configurationJson": [
        {
            "field": "course_name",
            "headerName": "Course Name"
        },
        {
            "field": "course_code",
            "headerName": "Course Code"
        },
        {
            "field": "course_choice",
            "headerName": "Course Choice"
        },
        {
            "field": "course_type",
            "headerName": "Course Type"
        },
        {
            "field": "internal",
            "headerName": "Internal"
        },
        {
            "field": "external",
            "headerName": "External"
        },
        {
            "field": "total",
            "headerName": "Total"
        },
        {
            "field": "grade",
            "headerName": "Grade"
        },
        {
            "field": "grade_points",
            "headerName": "Grade Points"
        },
        {
            "field": "credit",
            "headerName": "Credits"
        },
        {
            "field": "obtained_credit",
            "headerName": "Obtained Credits"
        },
        {
            "field": "credit_points",
            "headerName": "Credits Points"
        },
        {
            "field": "course_credits",
            "headerName": "Course Credits"
        }
    ]
}


module.exports = GetStudentTestResultController