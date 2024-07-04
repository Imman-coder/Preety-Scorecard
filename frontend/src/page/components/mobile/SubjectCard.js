import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { FailChip, PassChip } from '../common/chips';
import { columns_data } from '../common/utils';

export function MobileSubjectCard({ data }) {



    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    {data[columns_data[0].field]}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data[columns_data[1].field]}
                </Typography>
                <Typography variant="body2">
                    Internal:
                    {data[columns_data[4].field][1] === "pass" ? PassChip(data[columns_data[4].field][0]) : (data[columns_data[4].field][1] === "fail" ? FailChip(data[columns_data[4].field][0]) : <>{data[columns_data[4].field][0]}</>)}
                    <br />
                    <br />
                    External:
                    {data[columns_data[5].field][1] == "pass" ? PassChip(data[columns_data[5].field][0]) : (data[columns_data[5].field][1] == "fail" ? FailChip(data[columns_data[5].field][0]) : <>{data[columns_data[5].field][0]}</>)}
                    <br />
                    <br />
                    Total:
                    {data[columns_data[6].field][1] == "pass" ? PassChip(data[columns_data[6].field][0]) : (data[columns_data[6].field][1] == "fail" ? FailChip(data[columns_data[6].field][0]) : <>{data[columns_data[6].field][0]}</>)}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return <>
        <div>
            <Grid item xs={12}>
                <Card p={4} key={data[1]} margin='normal'  variant="outlined">{card}</Card>
            </Grid>
        </div>
    </>
}
