import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SignInForm } from "../components/SignInForm";
import { RegistrationForm } from "../components/RegistrationForm";
import { useSelector } from "react-redux";

const defaultTheme = createTheme();

export const WelcomePage = () => {
    const isRegistered = useSelector((state) => state?.isRegistered);
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid
                container
                component="main"
                sx={{ height: "100.5vh", width: "100.5vw" }}
            >
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://journal.hoelzel.at/wp-content/uploads/2021/12/MEHR_wasjetzt_OeAD_Sprache.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    {isRegistered ? <RegistrationForm /> : <SignInForm />}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
