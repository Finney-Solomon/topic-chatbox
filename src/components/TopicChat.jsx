import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SendIcon from "@mui/icons-material/Send";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { serverTimestamp } from "firebase/firestore";
import { getMessages, storeMessage } from "../redux/actions";
import { useHistory } from "react-router-use-history";
export const TopicChat = () => {
  const dispatch = useDispatch()
  const selectedTopicChat = useSelector((state) => state?.selectedTopicData);
  const selectedTopic = useSelector((state) => state?.selectedTopic);
  const [message, setMessage] = React.useState("");
  const currentUser = useSelector((state) => state?.user);
  const userDetails = useSelector((state) => state?.user.email);
  const history = useHistory();
  const handleSendClicked = async () => {

    const userId = currentUser ? currentUser.id : null;
    const userName = currentUser ? currentUser.user : null;

    const messageData = {
      userId: userId,
      userName: userName,
      message: message,
      timestamp: serverTimestamp(),
    };
    dispatch(storeMessage(messageData, selectedTopic.id));
    setMessage("")
  };


  useEffect(() => {

    dispatch(getMessages(selectedTopic.id))
    setMessage("")
  }, [selectedTopic.id]);

  return (
    <Container
      sx={{
        padding: "1em",
        minHeight: "92.5vh",
        maxHeight: "92.5vh",
      }}
    >
      <Card
        sx={{ padding: "0.5em", background: "#5088eece", minHeight: "22px" }}
      >
        {selectedTopic?.title}
      </Card>
      <>
        <Divider />
        <List
          dense
          sx={{
            width: "100%",
            height: "68vh",
            bgcolor: "background.paper",
            overflow: "auto",
          }}
        >
          {selectedTopicChat?.map((chat) => {
            return (
              <>
                <Card sx={{ maxWidth: "60%", marginTop: "1.5rem" }}>
                  <CardContent>
                    <div style={{ display: "flex" }}>
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        alt={chat?.userName}
                        src={`/static/images/avatar/$chat?.userName}.jpg`}
                      />
                      <Typography
                        variant="body1"
                        color="primary"
                        alignItems="Start"
                        sx={{ padding: 1 }}
                      >
                        {chat?.userName}
                      </Typography>
                    </div>
                    <Typography variant="h6" >
                      {chat?.message}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            );
          })}
        </List>
      </>
      <footer>
        <Card
          sx={{
            width: "100%",
            height: "10vh",
            background: "#f8f8f8",
          }}
          elevation={2}
        >
          <FormControl
            sx={{ m: 2, width: "97%", height: "9vh" }}
            variant="outlined"
            onChange={(e) => setMessage(e.target.value)}
          >
            <InputLabel>Message</InputLabel>
            <OutlinedInput
              id="message"
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    edge="end"
                    variant="contained"
                    onClick={userDetails === undefined ? history.push("/") : handleSendClicked}
                  >
                    <SendIcon />
                  </Button>
                </InputAdornment>
              }
              value={message}
              label="message"
            />
          </FormControl>
        </Card>
      </footer>
    </Container>
  );
};
