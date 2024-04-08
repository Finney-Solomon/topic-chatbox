import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useDispatch, useSelector } from "react-redux";
import { getTopicList, openCloseDialogBox, storeMessage } from "../redux/actions";
import { addDoc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";

export const DialogBox = () => {
    const [title, setTitle] = useState("");
    const openClose = useSelector((state) => state?.dialogBox?.isOpen);
    const currentUser = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(openCloseDialogBox(false));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = currentUser ? currentUser.id : null;
        const userName = currentUser ? currentUser.user : null;


        try {
            const id = Math.random().toString(36).substr(2);
            const payload = {
                title: title,
                id: id,
            };

            const topicRef = collection(db, "topic");
            await addDoc(topicRef, payload);

            dispatch(openCloseDialogBox(false));

            const messageData = {
                userId: userId,
                userName: userName,
                message: `Welcome to the topic ${title}`,
                timestamp: serverTimestamp(),
            };
            dispatch(storeMessage(messageData, id));
            alert
                ("storeMessage")
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(getTopicList());
        }
    };


    return (
        <div style={{ minWidth: "60vw" }}>
            <Dialog
                open={openClose}
                keepMounted
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "800px",
                            height: "30%",
                        },
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        color: "white",
                        background: "#112c91",
                        display: "flex",
                        justifyContent: "center",
                        maxHeight: "80px",
                    }}
                >
                    {" "}
                    Add New Topic to Chat Box
                </DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        // margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="title"
                        fullWidth
                        variant="standard"
                        sx={{
                            textAlign: "center",
                            marginTop: "40px",
                        }}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ marginBottom: "20px" }}>
                    <Button onClick={handleClose} sx={{ marginRight: "2rem" }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ marginRight: "2rem" }}
                        onClick={(event) => handleSubmit(event)}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
