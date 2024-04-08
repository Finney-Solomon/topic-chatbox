import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

export const MessageCard = (name = "", message = "") => {

    return (
        <Card sx={{ maxWidth: "70%", marginTop: "1rem" }}>
            <CardContent>
                <div style={{ display: "flex" }}>  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {name}
                </Avatar>
                    <Typography variant="h6" color="primary" alignItems="Start" sx={{ padding: 1 }}>
                        {name}
                    </Typography></div>
                <Typography variant="body1" color="text.secondary">
                    {message}
                </Typography>
            </CardContent>
        </Card>
    )
}
