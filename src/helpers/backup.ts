import { Cell } from 'conway-game-of-life/dist/types';
import {
  BoxGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Renderer,
  Scene,
  WebGLRenderer,
} from 'three';

const renderer = new WebGLRenderer({ antialias: true }) as Renderer;
let camera: PerspectiveCamera;
const scene = new Scene();
const cubes = new Group();

const resizeRendererToDisplaySize = (renderer: Renderer) => {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
};

export const init = (data: {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  cells: Cell[];
}) => {
  const { canvas, width, height, cells } = data;

  camera = new PerspectiveCamera(50, width / height, 0.1, 2000);

  const sun = new DirectionalLight(0xffffff, 0.2);
  scene.add(sun);

  camera.position.set(0, 0, 20);
  camera.lookAt(0, 0, 0);

  for (const cell of cells) {
    // const color = cell.alive ? 0xff7586 : 0x181818;
    const color = 0xffffff;
    const cubeSize = 10;
    const height = cell.alive ? cubeSize : 1;

    const geometry = new BoxGeometry(cubeSize, height, cubeSize);
    const material = new MeshBasicMaterial({ color });
    const cube = new Mesh(geometry, material);

    cube.position.x = cell.column * cubeSize;
    cube.position.y = cell.row * cubeSize;
    cubes.add(cube);
  }

  console.log(cubes);

  scene.add(cubes);

  const render = () => {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    // requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};
