import { MobileSubjectCard } from './SubjectCard';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';

export function MobileSubjectList({data}) {
    
    const [subjectData, setSubjectData] = useState([])
    const [titleData, setTitleData ] = useState([])
    

    useEffect(()=>{
        setTitleData(data.configurationJson || [])
        setSubjectData(data.data.subjects || [])
    },[data])

    return <>
        <div>
            <Stack direction='column' spacing={2}>
                {/* <Grid container spacing={2}  > */}
                    {subjectData.map((e) => (
                        <MobileSubjectCard  key={e[1]} data={e} title={titleData} />
                    ))}
                {/* </Grid> */}
            </Stack>
        </div>
    </>
}