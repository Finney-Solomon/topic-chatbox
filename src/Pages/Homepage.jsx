import React from "react";
import { Header } from "../components/Header";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TopicList } from "../components/TopicList";
import { TopicChat } from "../components/TopicChat";
import { DialogBox } from "../components/DialogBox";
export const Homepage = () => {
    return (
        <div style={{ minHeight: "100%" }}>
            <Header />
            <>
                <Grid container direction="row" alignItems="center" justify>
                    <Grid elevation={12} item xs={12} sm={6} md={6} component={Paper}>
                        <TopicList />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        component={Paper}
                        elevation={2}
                        square
                    >
                        <TopicChat />
                    </Grid>
                </Grid>
            </>
            <DialogBox />
        </div>
    );
};
