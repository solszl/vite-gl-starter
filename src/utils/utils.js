export const initShaders = (gl, vertShader, fragShader) => {
  const program = createProgram(gl, vertShader, fragShader);

  if (!program) {
    console.error("Failed to create program");
    return;
  }

  gl.useProgram(program);
  gl.program = program;
  return true;
};

const createProgram = (gl, vertShaderSource, fragShaderSource) => {
  const vertShader = loadShader(gl, vertShaderSource, gl.VERTEX_SHADER);
  const fragShader = loadShader(gl, fragShaderSource, gl.FRAGMENT_SHADER);

  const program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);

  gl.linkProgram(program);

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    console.error(`Failed to link program, ${gl.getProgramInfoLog(program)}`);
    return null;
  }

  return program;
};

const loadShader = (gl, source, type) => {
  const shader = gl.createShader(type);
  if (!shader) {
    console.error("unable to create shader");
    return;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    console.error(`shader compiled failed, ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};
const getWebGLContext = (canvas) => {};
