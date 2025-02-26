import * as THREE from 'three';
import { OrbitControls } from 'three/addons';
import type { Vector3, WebGLRenderer } from 'three';

export class ThreeJs {
  width: number;
  height: number;
  devicePixelRatio: number;

  viewCenter: Vector3;

  renderer: WebGLRenderer;

  camera: THREE.PerspectiveCamera;

  orbitController: OrbitControls;

  scene: THREE.Scene;

  constructor(
    option: Pick<
      ThreeJs,
      'width' | 'height' | 'viewCenter' | 'devicePixelRatio'
    >
  ) {
    const { width, height, devicePixelRatio, viewCenter } =
      option;

    this.devicePixelRatio = devicePixelRatio;
    this.width = width;
    this.height = height;
    this.viewCenter = viewCenter;

    this.renderer = this.initRender();
    this.camera = this.initCamera();
    this.orbitController = this.initController(
      this.camera,
      this.renderer,
      viewCenter
    );

    this.scene = this.initScene();
  }

  initRender() {
    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(this.width, this.height);
    renderer.setClearColor(0x111, 1.0);
    renderer.setPixelRatio(this.devicePixelRatio);

    return renderer;
  }

  initCamera() {
    const camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      1,
      1500
    );
    camera.position.set(0, 0, 300 / camera.aspect);
    camera.up.set(0, 1, 0); //正方向
    camera.lookAt(this.viewCenter);

    return camera;
  }

  initController(
    camera: THREE.Camera,
    renderer: WebGLRenderer,
    viewCenter: Vector3
  ) {
    const orbitController = new OrbitControls(
      camera,
      renderer.domElement
    );
    orbitController.enableZoom = false;
    orbitController.rotateSpeed = 2;
    orbitController.target = viewCenter; //设置控制点

    return orbitController;
  }

  initScene() {
    const scene = new THREE.Scene();
    const ap = new THREE.AxesHelper(100);

    scene.add(ap);
    return scene;
  }

  render() {
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.orbitController.update();
    requestAnimationFrame(this.render.bind(this));
  }
}
