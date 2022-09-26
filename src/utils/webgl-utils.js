export const setupWebgl = (canvas) => {
  const context = createContext(canvas);
  if (!context) {
    console.error("no webgl context created.");
    return;
  }

  return context;
};

const createContext = (canvas) => {
  const names = ["webgl2", "experimental-webgl", "webgl"];
  let context = null;
  for (let index = 0; index < names.length; index += 1) {
    const element = names[index];
    context = canvas.getContext(names[index]);
    if (context) {
      break;
    }
  }

  return context;
};
