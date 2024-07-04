import { FailChip, PassChip } from "./chips";



const sortComparator = (a, b) => {
    if (a == b) return 0
    return a > b ? 1 : -1
}

export let columns_data = [
    {
        id: 0,
        field: 'course_name',
        headerName: "Course Name",
        minWidth: 300,
        hideable: false,
    },
    {
        id: 1,
        field: 'course_code',
        headerName: "Course Code",
        hideable: false,
    },
    {
        id: 2,
        field: 'course_choice',
        headerName: "Course Choice",
    },
    {
        id: 3,
        field: 'course_type',
        headerName: "Course Type",
    },
    {
        id: 4,
        field: 'internal',
        headerName: "Internal",
        minWidth: 160,
        hideable: false,
        sortComparator: sortComparator,
        renderCell: (data) => (
            data.value[1] === "pass" ? PassChip(data.value[0]) : (data.value[1] === "fail" ? FailChip(data.value[0]) : <>{data.value[0]}</>)
        ),
    },
    {
        id: 5,
        field: 'external',
        headerName: "External",
        minWidth: 160,
        hideable: false,
        renderCell: (data) => (
            data.value[1] === "pass" ? PassChip(data.value[0]) : (data.value[1] === "fail" ? FailChip(data.value[0]) : <>{data.value[0]}</>)
        ),
    },
    {
        id: 6,
        field: 'total',
        headerName: "Total",
        minWidth: 160,
        hideable: false,
        renderCell: (data) => (
            data.value[1] === "pass" ? PassChip(data.value[0]) : (data.value[1] === "fail" ? FailChip(data.value[0]) : <>{data.value[0]}</>)
        ),
    },
    {
        id: 7,
        field: 'grade',
        headerName: "Grade",
    },
    {
        id: 8,
        field: 'grade_points',
        headerName: "Grade Points",
    },
    {
        id: 9,
        field: 'credit',
        headerName: "Credits",
    },
    {
        id: 10,
        field: 'obtained_credit',
        headerName: "Obtained Credits",
    },
    {
        id: 11,
        field: 'credit_points',
        headerName: "Credits Points",
    },
    {
        id: 12,
        field: 'course_credits',
        headerName: "Course Credits"
    },
]