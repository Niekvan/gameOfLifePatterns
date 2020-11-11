import { GameOfLife } from 'conway-game-of-life';
import { Cell } from 'conway-game-of-life/dist/types';

import {
  PerspectiveCamera,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  WebGLRenderer,
  Scene,
  Geometry,
  Renderer,
  MeshBasicMaterial,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const makeInstance = (
  geometry: Geometry,
  color: number,
  cell: Cell,
  halfWidth: number,
  halfHeight: number
) => {
  const material = new MeshBasicMaterial({ color });

  const cube = new Mesh(geometry, material);

  cube.position.x = cell.column - halfWidth + (cell.column - halfWidth) * 0.1;
  cube.position.y = cell.row - halfHeight + (cell.row - halfHeight) * 0.1;

  cube.userData = cell;

  return cube;
};

const setCubeSize = (cube: Mesh, x: number, y: number, z: number) => {
  // @ts-ignore
  const scaleX = x / cube.geometry.parameters.width;
  // @ts-ignore
  const scaleY = y / cube.geometry.parameters.height;
  // @ts-ignore
  const scaleZ = z / cube.geometry.parameters.depth;

  cube.scale.set(scaleX, scaleY, scaleZ);
};

const resizeRendererToDisplaySize = (renderer: Renderer) => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
};

export const init = (canvas: HTMLCanvasElement, game: GameOfLife) => {
  const renderer = new WebGLRenderer({ canvas });

  const halfWidth = game.state.columns / 2;
  const halfHeight = game.state.rows / 2;

  const fov = 50;
  const aspect = 1;
  const near = 0.1;
  const far = 2000;
  const camera = new PerspectiveCamera(fov, aspect, near, far);

  camera.position.x = 0;
  camera.position.y = -40;
  camera.position.z = 25;
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new Scene();
  // const cubes = new Group();
  const cubes: Mesh[] = [];

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(0, 0, 1);
    scene.add(light);
  }

  // {
  //   const color = 0xffffff;
  //   const intensity = 1;
  //   const light = new DirectionalLight(color, intensity);
  //   light.position.set(0, 0, 1);
  //   scene.add(light);
  // }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 0.1;
  const deadGeometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);
  const aliveGeometry = new BoxGeometry(boxWidth, boxHeight, 1);

  for (const cell of game.state.cells) {
    const color = cell.alive ? 0x44aa88 : 0x181818;
    const geometry = cell.alive ? aliveGeometry : deadGeometry;
    const cube = makeInstance(geometry, color, cell, halfWidth, halfHeight);
    cubes.push(cube);
    scene.add(cube);
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    game.sequence();

    cubes.forEach((cube, index) => {
      const oldCell = cube.userData as Cell;
      const cell = game.state.cells[index];

      if (cell.alive !== oldCell.alive) {
        const color = cell.alive ? 0x44aa88 : 0x181818;
        if (cell.alive) {
          setCubeSize(cube, 1, 1, 1);
        } else {
          setCubeSize(cube, 1, 1, 0.1);
        }
        // @ts-ignore
        cube.material.color.setHex(color);
      }
      cube.userData = cell;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  controls.addEventListener('change', render);
  window.addEventListener('resize', render);

  // note: this is a workaround for an OrbitControls issue
  // in an iframe. Will remove once the issue is fixed in
  // three.js
  window.addEventListener('mousedown', (e) => {
    e.preventDefault();
    window.focus();
  });
  window.addEventListener('keydown', (e) => {
    e.preventDefault();
  });
};
