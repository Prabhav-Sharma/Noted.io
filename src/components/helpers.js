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
        note: { ...state.note, noteColor: action.payload.noteColor },
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

const labelColors = [
  "#E74B7F",
  "#89E6D8",
  "#32C356",
  "#E3D8F1",
  "#FDE74C",
  "#058ED9",
];

const getRandomColor = () =>
  labelColors[Math.floor(Math.random() * labelColors.length)];

const notesWithSearchLabels = (arr, search) => {
  if (search.trim().length === 0 || arr.length === 0) return [];

  return arr.reduce(
    (acc, curr) =>
      curr.labels.some((label) =>
        label.text.toLowerCase().includes(search.toLowerCase())
      )
        ? [...acc, curr]
        : acc,
    []
  );
};

export { noteReducer, isBright, getRandomColor, notesWithSearchLabels };
