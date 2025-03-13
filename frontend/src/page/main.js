import React, { useState, useEffect, Fragment } from 'react';
import { useMediaQuery } from 'react-responsive'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from '../api/axios';
import { Dropdown } from './components/dropdownMenu';
import { DesktopSubjectList } from './components/desktop/SubjectList';
import { MobileSubjectList } from './components/mobile/SubjectList';
import { Box, Snackbar } from '@mui/material';



import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Printer from "./Printer";

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
}

export default function Main({ setPrinterRef }) {

    const [publicResultList, setPublicResultList] = useState({})
    const [studentResult, setStudentResult] = useState({ data: {} })
    const [errorMsg, setErrorMsg] = useState("")

    const [year, setYear] = useState("")
    const [sem, setSem] = useState("")
    const [branch, setBranch] = useState("")
    const [type, setType] = useState("")
    const [regdno, setregdno] = useState("")
    const [LoadingUserData, setLoadingUserData] = useState(false)
    const [LoadingPublicData, setLoadingPublicData] = useState(false)

    async function fetchPublicResultList() {
        let makeRequest = async () => {
            const response = await axios.get("/getResultList")

            setPublicResultList(response.data)
        }

        setLoadingPublicData(true)
        await makeRequest()
        setLoadingPublicData(false)
    }

    async function fetchStudentResult() {

        const makeRequest = async () => {

            const response = await axios.post("/getStudentResult", JSON.stringify({
                result_id: publicResultList.data[year][sem][branch][type],
                registration_number: regdno
            }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            setStudentResult(response.data)

            setPrinterRef(<Printer daa={{
                resultTitle: "BTECH 3RD SEM 2021 A.B. CSE RESULT",
                hallTicketNo: "DRMU2101229080",
                data: response.data.data,
                configurationJson: response.data.configurationJson,
                CGPA: response.data.data.cgpa,
                success: response.data.success,
                studentName: response.data.data.studentName,
                customHeader: response.data.data.customHeader,
                customFooter: response.data.data.customFooter
            }} />)
        }

        try {
            setLoadingUserData(true)
            await makeRequest()
        } catch (error) {
            setErrorMsg("Something went wrong, Try again!")
        } finally {
            setLoadingUserData(false)
        }
    }

    useEffect(() => {
        fetchPublicResultList()
    }, [])


    const card = (
        <Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    {studentResult.data.studentName || "Student Name"}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {studentResult.data.regdNo}
                </Typography>
                <Typography variant="body2">
                    CGPA : {studentResult.data.cgpa || "-"}
                    <br />
                    SGPA : {studentResult.data.sgpa || "-"}
                </Typography>
            </CardContent>
        </Fragment>
    );



    return <>

        {LoadingPublicData ?
            <div className="loader">
                LOADING...
            </div>
            : (
                <>

                    <Snackbar
                        open={errorMsg}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        autoHideDuration={3000}
                        onClose={()=>{setErrorMsg("")}}
                        severity="error"
                        message="Holy smokes! Something seriously bad happened."
                        // action={action}
                    />

                    <Box m={2}>
                        <div>
                            <div className='dropmenu'>
                                <div className='ids'>

                                    <Dropdown
                                        label={"Select Year"}
                                        k={"year"}
                                        items={Object.keys(publicResultList.data || [])}
                                        getter={year}
                                        setter={setYear}
                                    />

                                    <Dropdown
                                        label={"Select Semester"}
                                        k={"sem"}
                                        items={Object.keys((year !== "" && publicResultList.data && publicResultList.data[year]) || [])}
                                        getter={sem}
                                        setter={setSem}
                                    />
                                </div>
                                <div className='ids'>

                                    <Dropdown
                                        label={"Select Branch"}
                                        k={"branch"}
                                        items={Object.keys((publicResultList.data && publicResultList.data[year] && publicResultList.data[year][sem]) || [])}
                                        getter={branch}
                                        setter={setBranch}
                                    />
                                    <Dropdown
                                        label={"Select Type"}
                                        k={"type"}
                                        items={Object.keys((publicResultList.data && publicResultList.data[year] && publicResultList.data[year][sem] && publicResultList.data[year][sem][branch]) || [])}
                                        getter={type}
                                        setter={setType}
                                    />
                                </div>


                            </div>

                            <div className='low-col'>

                                <TextField
                                    id="registrationBox"
                                    margin="normal"
                                    label="Registration Number"
                                    size="small"
                                    type='number'
                                    variant="outlined"
                                    value={regdno}

                                    onChange={(e) => {
                                        setregdno(e.target.value.toString());
                                    }}
                                />

                                <Button variant='contained' onClick={fetchStudentResult}
                                    disabled={(publicResultList.data === undefined || type === "" || year === "" || sem === "" || branch === "" || regdno.length != 10 || LoadingUserData)}>
                                    {LoadingUserData ? "Loading..." : "Get Result"}
                                </Button>

                            </div>
                        </div>


                        <Card sx={{ my: 2 }} variant="outlined">{card}</Card>


                        <Desktop>
                            <DesktopSubjectList
                                data={studentResult}
                                isLoadingUserData={LoadingUserData}
                            />
                        </Desktop>

                        <Mobile>
                            <MobileSubjectList
                                data={studentResult}

                            />
                        </Mobile>
                    </Box>
                </>
            )}
    </>


}