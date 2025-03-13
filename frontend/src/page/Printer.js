import ReactHtmlParser from 'html-react-parser';
import {Button} from "@mui/material";
import {useReactToPrint} from "react-to-print";
import {useRef} from "react";


function Printer({daa}) {

    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({contentRef});

    const props = {
        instituteLogo: "",
        instituteName: ""
    }

    const replaceStudentGradeCardParameters = (inp) => {
        if (!inp) return "";
        let options = {day: 'numeric', month: 'long', year: 'numeric'};
        let date = new Date().toLocaleDateString('en-GB', options);

        inp = inp.replaceAll("{Todays_Date}", date)
        inp = inp.replaceAll("{Result_Title}", daa.resultTitle)
        inp = inp.replaceAll("{Todays_Date}", date)

        return inp
    }


    const state = {
        // resultTitle: daa.resultTitle,
        // resultId: props.resultId,
        // instituteUrl: props.instituteUrl,
        instituteLogo: "",
        instituteName: "",
        // customColumnConfiguration: props.customColumnConfiguration,
        // filterApplied: false,
        // tempFilterAdmissionNumber: '',
        filterAdmissionNumber: daa.hallTicketNo,
        // admissionNumberWarning: '',
        // selectedFieldType: props.customColumnConfiguration !== undefined ? props.customColumnConfiguration[0] : 'hall_ticket',
        // searchInputPlaceholder: 'Roll Number (Hall Ticket Number)',
        resultDetails: daa.data,
        configurationJSON: daa.configurationJson,
        studentCGPA: daa.CGPA,
        // resultFetching: false,
        isResultPublished: daa.success,
        studentName: daa.studentName,
        // isValidAdmissionNumber: '',

        customHeaderDesign: replaceStudentGradeCardParameters(daa.customHeader),
        customFooterDesign: daa.customFooter,
        // parameters: {},
        // groupName: '',
        // academicYear: '',
        // academicBranch: '',
        // semesterNumber: '',
    };
    console.log(state)


    return <>
        <div className="resultDetailsTable col-md-12 table-responsive prints " ref={contentRef}>
            {
                state.customHeaderDesign !== "" ?
                    <div className="customHeaderDesign">
                        {ReactHtmlParser(state.customHeaderDesign, {
                            replace: ({attribs}) => attribs?.id === 'remove' && <></>,
                        })}
                    </div>
                    :
                    <>
                        <div className="college-info">
                            <img className="response-college-logo" alt="college-logo" src={state.instituteLogo}/>
                            <p className="response-college-name">{ReactHtmlParser(state.instituteName)}</p>
                        </div>
                    </>
            }
            <div className="studentDetails col-md-12">
                <div className="result-admission-number" style={{marginRight: 20}}>
                                    <span>
                                        <span style={{fontWeight: 'bold'}}>Hall Ticket Number: </span>
                                        <span>{state.filterAdmissionNumber}</span>
                                    </span>
                </div>
                <div className="result-student-name">
                    <span style={{fontWeight: 'bold'}}>Student Name: </span>
                    <span>{state.studentName}</span>
                </div>
            </div>
            <div className="col-md-12">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        {/*<th rowSpan="2" style={{padding: 5}}>Subject Code</th>*/}
                        {/*<th rowSpan="2" style={{padding: 5}}>Subject Name</th>*/}
                        {state.configurationJSON.map((e) => {
                            if (e.displayInWebsite !== undefined && e.displayInWebsite === true) {
                                return (
                                    <th style={{padding: 5}}>
                                        {e.headerName}
                                    </th>
                                );
                            }
                        })
                        }
                        {

                            // Object.keys(state.configurationJSON).map((colId, index) => {
                            //     let columnDetails = state.configurationJSON[colId];
                            //     let colSpan = 0;
                            //     if (columnDetails.subCol !== undefined && Object.keys(columnDetails.subCol).length > 0) {
                            //         Object.keys(columnDetails.subCol).map(subColId => {
                            //             let subColDetails = columnDetails.subCol[subColId];
                            //             if (subColDetails.displayInWebsite !== undefined && subColDetails.displayInWebsite === true) {
                            //                 colSpan = colSpan + 1;
                            //             }
                            //         })
                            //     }
                            //     if (columnDetails.displayInWebsite !== undefined && columnDetails.displayInWebsite === true) {
                            //         return (
                            //             <th style={{padding: 5}} colSpan={colSpan}
                            //                 rowSpan={columnDetails.subCol !== undefined ? 1 : 2}>
                            //                 {columnDetails.columnName}
                            //             </th>
                            //         );
                            //     }
                            // })
                        }
                        {/* <th rowSpan="2" style={{ padding: 5 }}>Credits</th> */}
                    </tr>
                    {/*<tr>*/}
                    {/*    {Object.keys(state.configurationJSON).length > 0 &&*/}
                    {/*        Object.keys(state.configurationJSON).map(colId => {*/}
                    {/*            let columnDetails = state.configurationJSON[colId];*/}
                    {/*            if (columnDetails.subCol !== undefined && Object.keys(columnDetails.subCol).length > 0) {*/}
                    {/*                return Object.keys(columnDetails.subCol).map(subColId => {*/}
                    {/*                    let subColumnDetails = columnDetails.subCol[subColId];*/}
                    {/*                    if (subColumnDetails.displayInWebsite !== undefined && subColumnDetails.displayInWebsite === true) {*/}
                    {/*                        return (*/}
                    {/*                            <th style={{padding: 5}}>*/}
                    {/*                                {subColumnDetails.columnName}*/}
                    {/*                            </th>*/}
                    {/*                        );*/}
                    {/*                    }*/}
                    {/*                })*/}
                    {/*            }*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*</tr>*/}
                    </thead>
                    <tbody>
                    {
                        state.isResultPublished && state.resultDetails.subjects.length>0 ?
                            <>
                                {
                                    state.resultDetails.subjects.map(result => {
                                        if (result !== 0) {
                                            return (
                                                <tr>
                                                    {/*<td style={{padding: 5}}>{result.courseCode}</td>*/}
                                                    {/*<td style={{padding: 5}}>{result.subjectName}</td>*/}
                                                    {state.configurationJSON.map((col, i) => {

                                                        if (col.displayInWebsite !== undefined && col.displayInWebsite === true) {
                                                            return (<td
                                                                style={{padding: 5}}>{result[col.field]}</td>)
                                                        }

                                                        // if (typeof result[colId] == 'object') {
                                                        //     return columnDetails.subCol !== undefined && Object.keys(columnDetails.subCol).map((subColId, subKeyIndex) => {
                                                        //         let subColDetails = columnDetails.subCol[subColId];
                                                        //         if (subColDetails.displayInWebsite !== undefined && subColDetails.displayInWebsite === true) {
                                                        //             return (
                                                        //                 <td style={{padding: 5}}>{result[colId][subColId]}</td>
                                                        //             );
                                                        //         }
                                                        //     })
                                                        // } else {
                                                        //     if (columnDetails.displayInWebsite !== undefined && columnDetails.displayInWebsite === true) {
                                                        //         return (
                                                        //             <td style={{padding: 5}}>{typeof result[colId] != 'object' ? result[colId] : ''}</td>
                                                        //         );
                                                        //     }
                                                        // }
                                                    })}
                                                    {/* <td style={{ padding: 5 }}>{result.credits}</td> */}
                                                </tr>
                                            );
                                        }
                                    })
                                }
                                {
                                    state.resultDetails['sgpa'] !== undefined && state.resultDetails['sgpa'] > 0 &&
                                    <tr>
                                        <td style={{padding: 5}}></td>
                                        <td style={{padding: 5}}>{props.averageGradePointTitle !== undefined ? props.averageGradePointTitle : "SGPA"}</td>
                                        <td style={{padding: 5}}>{state.resultDetails['sgpa']}</td>
                                        {
                                            state.studentCGPA !== '' &&
                                            <>
                                                <td style={{padding: 5}}>CGPA</td>
                                                <td style={{padding: 5}}>{state.studentCGPA}</td>
                                            </>
                                        }
                                    </tr>
                                }
                            </>
                            :
                            <tr>
                                <td style={{padding: 5}} colSpan="20">Result is not yet published. Kindly contact your
                                    exam
                                    in-charge.
                                </td>
                            </tr>
                    }
                    </tbody>
                </table>
            </div>
            {
                state.customFooterDesign && state.customFooterDesign !== "" &&
                <div className="customFooterDesign">
                    {ReactHtmlParser(state.customFooterDesign)}
                </div>
            }
        </div>


        <Button onClick={reactToPrintFn} variant="contained">Print</Button>
    </>
}


export default Printer;