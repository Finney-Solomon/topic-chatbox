import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useDispatch } from "react-redux";
import {
    getTopicList,
    openCloseRegistrationForm,
    storeUserDetails,
} from "../redux/actions";
import { useHistory } from "react-router-use-history";
import { auth, db, signIn } from "../firebaseConfig/firebaseConfig";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";



export const SignInForm = () => {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (event) => {
        setError(""); // Reset error state
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        try {
            const userCredential = await signIn(auth, email, password);
            const id = userCredential.user?.uid;


            const userDataRef = collection(db, "user");
            const querySnapshot = await getDocs(
                query(userDataRef, where("email", "==", email))
            );

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    dispatch(storeUserDetails(doc.data()));
                    dispatch(getTopicList());// Log user data
                });

                history.push("/homepage");

            } else {
                console.log("No such user");
            }


        } catch (error) {

            const errorMessage = error.message;
            setError(errorMessage);

        }
    };

    return (
        <>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "2em",
                }}
            >
                <Typography component="h1" variant="h4">
                    Topic Chat Box
                </Typography>
                <br />
                <Avatar sx={{ bgcolor: "#324ff7f" }}>
                    <LockOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link
                                href="#"
                                variant="body2"
                                onClick={() => dispatch(openCloseRegistrationForm(true))}
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};
