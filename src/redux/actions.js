import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";

export const openCloseRegistrationForm = (payload) => {
  return {
    type: "OPEN_CLOSE_REGISTRATION_FORM",
    payload,
  };
};
export const storeUserDetails = (payload) => {
  return {
    type: "STORE_USER_DETAILS",
    payload,
  };
};

export const openCloseDialogBox = (payload) => {
  return {
    type: "OPEN_CLOSE_DIALOG_BOX",
    payload,
  };
};
export const openCloseSnackbarNotification = (payload) => {
  return {
    type: "OPEN_CLOSE_SNACKBAR_NOTIFICATION",
    payload,
  };
};

export const storeTopicListData = (payload) => {
  return {
    type: "GET_TOPIC_LIST",
    payload,
  };
};

export const getSelectedTopicData = (payload) => {
  return {
    type: "GET_SELECTED_TOPIC_DATA",
    payload,
  };
};


export const openSelectedTopic = (payload) => {
  return {
    type: "OPEN_SELECTED_TOPIC",
    payload,
  };
};

export const resetReduxData = (payload) => {
  return {
    type: "RESET_REDUX_DATA",
    payload,
  };
};

export const getTopicList = () => async (dispatch) => {
  try {
    const topicRef = collection(db, "topic");

    const topicListQuery = await getDocs(topicRef);
    const list = topicListQuery.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch(storeTopicListData(list));
  } catch (error) {
    console.log(error);
  }
};

export const storeMessage = (messageData, id) => async (dispatch) => {
  try {
    const messagesRef = collection(db, `chatBox/${id}/messages`);
    await addDoc(messagesRef, messageData);
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    dispatch(getMessages(id));
  }
};

export const getMessages = (id) => async (dispatch) => {
  const messagesQuery = query(
    collection(db, `chatBox/${id}/messages`),
    orderBy("timestamp")
  );

  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    const updatedMessages = [];
    snapshot.forEach((doc) => {
      updatedMessages.push({ id: doc.id, ...doc.data() });
    });
    dispatch(getSelectedTopicData(updatedMessages));
  });

  return unsubscribe;
};
