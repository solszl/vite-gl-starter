// import { Resource, TOOL_TYPE, ViewportManager } from "SDK/Entry";
// console.log(ViewportManager, TOOL_TYPE, Resource);
import frag from "./src/shaders/001.frag";
import vert from "./src/shaders/001.vert";
import { initShaders } from "./src/utils/utils";
import { setupWebgl } from "./src/utils/webgl-utils";

const main = () => {
  /** @type { WebGL2RenderingContext } */
  const gl = setupWebgl(document.querySelector("#root"));
  initShaders(gl, vert, frag);

  const aPosition = gl.getAttribLocation(gl.program, "a_Position");
  if (aPosition < 0) {
    console.error("Failed to get the storage location of a_Position");
  }

  const aPointSize = gl.getAttribLocation(gl.program, "a_PointSize");
  if (aPointSize < 0) {
    console.error("Failed to get the storage location of a_PointSize");
  }

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.vertexAttrib1f(aPointSize, 10);
  const canvas = document.querySelector("#root");
  let gl_points = [];
  canvas.addEventListener("click", (e) => {
    let { clientX: x, clientY: y, target } = e;
    const rect = target.getBoundingClientRect(); // 获取在当前屏幕下的上下左右宽高
    x = (x - rect.left - rect.height / 2) / (rect.height / 2);
    y = (rect.width / 2 - (y - rect.top)) / (rect.width / 2);
    gl_points.push([x, y]);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    for (let i = 0; i < gl_points.length; i += 1) {
      gl.vertexAttrib3f(aPosition, gl_points[i][0], gl_points[i][1], 0.0);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
    console.log(x, y);
  });
};

main();
