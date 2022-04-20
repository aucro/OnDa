import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import type { NextPage } from "next";

interface Props{
    width: number;
    height: number;
    header?: string;
    content?: any;
}

const MemoFrame: NextPage<Props> = ({width, height, content, header}) => {
    return (
            <Card sx={{ width: width, height: height}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {header}
                    </Typography>{content}</CardContent>
            </Card>
    );
};

export default MemoFrame;