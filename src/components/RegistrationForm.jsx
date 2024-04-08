import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { getTopicList, openCloseRegistrationForm, storeUserDetails } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-use-history";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";

export const RegistrationForm = () => {
    const [error, setError] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        const confirmPassword = data.get("confirm-password");
        if (name === "") return setError("Name cannot be empty.");
        if (password !== confirmPassword) return;
        setError("Passwords do not match");

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {

                const userData = userCredential;
                const payload = {
                    user: name,
                    email: email,
                    id: userData?.user?.uid,
                }

                const user = collection(db, "user");
                await addDoc(user, payload);
                history.push("/homepage");
                dispatch(storeUserDetails(payload))
                dispatch(getTopicList())
            });





        } catch (error) {
            console.error(error);
            setError(error.message);
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
                    Register
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
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
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirm-password"
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                        autoComplete="new-password"
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    // onClick={(event) => handleSubmit(event)}
                    >
                        Submit
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2">
                                Forgot password?
                            </Link> */}
                        </Grid>
                        <Grid item>
                            <Link
                                href="#"
                                variant="body2"
                                onClick={() => dispatch(openCloseRegistrationForm(false))}
                            >
                                {"Have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};
