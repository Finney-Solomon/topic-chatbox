const initialState = {
  isRegistered: false,
  user: {},
  dialogBox: { isOpen: false },
  topicList: [],
  selectedTopic: {},
  selectedTopicData: [],

  snackbar: {
    open: false,
    message: "",
    type: "info",
  },
};

export const reducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case "OPEN_CLOSE_REGISTRATION_FORM": {
      return { ...state, isRegistered: payload };
    }
    case "SET_CURRENT_USER": {
      return { ...state, user: payload };
    }
    case "STORE_USER_DETAILS": {
      return {
        ...state,
        user: {
          ...payload,
        },
      };
    }
    case "OPEN_CLOSE_DIALOG_BOX": {
      return {
        ...state,
        dialogBox: {
          isOpen: payload,
        },
      };
    }
    case "GET_TOPIC_LIST": {
      return {
        ...state,
        topicList: payload,
      };
    }
    case "GET_SELECTED_TOPIC_DATA":
      return {
        ...state,
        selectedTopicData: [...payload],
      };

    case "OPEN_SELECTED_TOPIC": {
      return {
        ...state,
        selectedTopic: payload,
      };
    }

    // eslint-disable-next-line no-fallthrough
    default:
      return { ...state };
  }
};
