const fakelists = {
  list_1: {
    name: "2021 watch list",
    content: [
      {
        title: "Avengers: End game",
        poster: "/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
        id: "123456",
        status: "unwatched",
      },
      {
        title: "Creed",
        poster: "/tK1zy5BsCt1J4OzoDicXmr0UTFH.jpg",
        id: "123556",
        status: "unwatched",
      },
      {
        title: "creed 2",
        poster: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
        id: "123458",
        status: "unwatched",
      },
      {
        title: "Dexter",
        poster: "/bSpmhdaslwYH2fn2mj7cRcrN5Vi.jpg",
        id: "122456",
        status: "unwatched",
      },
    ],
  },
};

export default function lists(state = {}, action) {
  switch (action.type) {
    case "CREAT_LIST":
      return {
        ...state,
        [Math.random().toString(36).substr(2, 9)]: action.newList,
      };

    case "UPDATE_LIST":
      return {
        ...state,
        [action.updatedList.listId]: {
          ...state[action.updatedList.listId],
          name: action.updatedList.name,
          desc: action.updatedList.desc,
        },
      };
    case "ADD_SHOW_TO_LIST":
      return {
        ...state,
        [action.listId]: {
          ...state[action.listId],
          content: state[action.listId].content.concat([action.show]),
        },
      };

    case "DELETE_SHOW_FROM_LIST":
      return {
        ...state,
        [action.listId]: {
          ...state[action.listId],
          content: state[action.listId].content.filter(
            (show) => show.id !== action.showId
          ),
        },
      };

    default:
      return state;
  }
}
