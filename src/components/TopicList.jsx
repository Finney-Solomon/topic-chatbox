import React from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { getMessages, getSelectedTopicData, openCloseDialogBox, openSelectedTopic } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";
import { useHistory } from "react-router-use-history";
export const TopicList = () => {
    const topicList = useSelector((state) => state?.topicList);
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state?.user.email);
    const history = useHistory();
    const getChat = (value) => {
        const chatRef = collection(db, "chatBox");
        const query = doc(chatRef, value.id);
        dispatch(getMessages(value.id))
        dispatch(openSelectedTopic(value))
    };

    return (
        <Container
            sx={{
                padding: "1em",
                minHeight: "92.5vh",
                maxHeight: "92.5vh",
            }}
        >
            <Card sx={{ padding: "0.5em", background: "#5088eece" }}>
                Topic List
            </Card>
            <Button
                variant="contained"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
                onClick={() => { userDetails === undefined ? history.push("/") : dispatch(openCloseDialogBox(true)) }}
            >
                Create New Chat Topic
            </Button>
            <>
                <Divider />
                <List
                    dense
                    sx={{
                        width: "90%",
                        padding: "1em",
                        overflow: "auto",
                        maxHeight: "60vh",
                    }}
                >
                    {topicList.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem
                                key={value?.id}
                                disablePadding
                                sx={{
                                    width: "90%",
                                    padding: "0.5rem",
                                    overflow: "auto",
                                    maxHeight: "60vh",
                                    fontSize: "0.7em",
                                    fontWeight: 800,
                                }}
                            >
                                <ListItemButton onClick={() => getChat(value)}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={value?.title}
                                            src={`/static/images/avatar/${value?.title + 1}.jpg`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        id={labelId}
                                        primary={value?.title + " by  " + value?.userName}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </>
        </Container >
    );
};
