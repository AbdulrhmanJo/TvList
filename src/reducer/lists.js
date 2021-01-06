const fakelists = {
  list_1: {
    name: "2021 watch list",
    content: [
      {
        name: "Avengers: End game",
        image: "/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
        id: "123456",
        status: "unwatched",
      },
      {
        name: "Creed",
        image: "/tK1zy5BsCt1J4OzoDicXmr0UTFH.jpg",
        id: "123556",
        status: "unwatched",
      },
      {
        name: "creed 2",
        image: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
        id: "123458",
        status: "unwatched",
      },
      {
        name: "Dexter",
        image: "/bSpmhdaslwYH2fn2mj7cRcrN5Vi.jpg",
        id: "122456",
        status: "unwatched",
      },
    ],
  },
};

export default function lists(state = fakelists, action) {
  switch (action.type) {
    case "CREAT_LIST":
      return {
        ...state,
        [Math.random().toString(36).substr(2, 9)]: action.newList,
      };

    case "UPDATE_LIST":
      console.log(action.updatedList);
      return {
        ...state,
        [action.updatedList.listId]: {
          ...state[action.updatedList.listId],
          name: action.updatedList.name,
          desc: action.updatedList.desc,
        },
      };
    default:
      return state;
  }
}
