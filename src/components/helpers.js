const noteReducer = (state, action) => {
  let updatedLabels;
  switch (action.type) {
    case "ADD_LABEL":
      updatedLabels = [...state.note.labels, action.payload.label];
      return {
        ...state,
        note: { ...state.note, labels: updatedLabels },
      };

    case "REMOVE_LABEL":
      updatedLabels = state.note.labels.filter(
        (label) => label.text !== action.payload.label.text
      );
      return { ...state, note: { ...state.note, labels: updatedLabels } };

    case "NOTE_COLOR":
      return {
        ...state,
        note: { ...state.note, color: action.payload.noteColor },
      };

    case "LABEL_TOGGLE":
      return { ...state, labelToggle: !state.labelToggle };

    case "SAVE_TOGGLE":
      return { ...state, saveToggle: action.payload.saveToggle };

    case "SAVE_LOADING":
      return { ...state, saveLoading: !state.saveLoading };

    case "PINNED":
      return { ...state, note: { ...state.note, pinned: !state.note.pinned } };

    default:
      return state;
  }
};

function isBright(hex) {
  const red = parseInt(hex[1] + hex[2], 16);
  const green = parseInt(hex[3] + hex[4], 16);
  const blue = parseInt(hex[5] + hex[6], 16);
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // taken and understood from stackoverflow
  return luminance > 70 ? true : false;
}

const colors = [
  "#E74B7F",
  "#89E6D8",
  "#32C356",
  "#E3D8F1",
  "#FDE74C",
  "#058ED9",
  "#270F36",
  "#632B6C",
  "#C76B98",
  "#F09F9C",
  "#FCC3A3",
  "#319B54",
  "#244464",
  "#477Eb6",
  "#8E8E8E",
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const searchQueryNotes = (arr, search, type) => {
  if (search.trim().length === 0 || arr.length === 0) return [];

  switch (type) {
    case "LABEL":
      return arr.reduce(
        (acc, curr) =>
          curr.labels.some((label) =>
            label.text.toLowerCase().includes(search.toLowerCase())
          )
            ? [...acc, curr]
            : acc,
        []
      );
    case "TITLE":
      return arr.reduce(
        (acc, curr) =>
          curr.title.toLowerCase().includes(search.toLowerCase())
            ? [...acc, curr]
            : acc,
        []
      );

    case "TEXT":
      return arr.reduce(
        (acc, curr) =>
          curr.text.toLowerCase().includes(search.toLowerCase())
            ? [...acc, curr]
            : acc,
        []
      );
  }
};

const toCamelCase = (str) =>
  [...str].reduce(
    (acc, curr, index) =>
      index === 0 ? acc + curr.toUpperCase() : acc + curr.toLowerCase(),
    ""
  );

const notePageReducer = (state, action) => {
  switch (action.type) {
    case "TITLE":
      return { ...state, note: { ...state.note, title: action.payload.title } };

    case "TEXT":
      return { ...state, note: { ...state.note, text: action.payload.text } };

    case "NOTE":
      return {
        ...state,
        note: action.payload.note,
        initialNote: action.payload.note,
      };
    case "SAVE_TOGGLE":
      return { ...state, saveToggle: action.payload.saveToggle };

    case "SAVE_LOADING":
      return { ...state, saveLoading: !state.saveLoading };

    case "LABEL_TOGGLE":
      return { ...state, labelToggle: !state.labelToggle };
  }
};

const sortNotes = ([...notes], sortByLatest) => {
  if (!sortByLatest)
    return notes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  else
    return notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};
export {
  noteReducer,
  isBright,
  getRandomColor,
  toCamelCase,
  searchQueryNotes,
  notePageReducer,
  sortNotes,
};
