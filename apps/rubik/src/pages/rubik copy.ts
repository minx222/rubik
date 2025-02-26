import * as THREE from 'three';

import { createCube } from '@/helps/rubik';
import { ThreeJs } from '@/helps/three';
import { AmbientLight, Vector3 } from 'three';

export class RubikThreeJs extends ThreeJs {
  raycaster: THREE.Raycaster;

  intersect?: THREE.Intersection;

  normalize?: Vector3;

  targetRubik?: THREE.Mesh;

  anotherRubik?: THREE.Mesh;

  startPoint?: Vector3;

  movePoint?: Vector3;

  isTouching: boolean;

  constructor(element: HTMLElement) {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      viewCenter: new Vector3(0, 0, 0),
      devicePixelRatio: window.devicePixelRatio
    });

    element.appendChild(this.renderer.domElement);

    this.initObject();
    this.initLight();

    this.raycaster = new THREE.Raycaster();

    this.isTouching = false;
  }

  initObject() {
    const cubs = createCube({
      x: 0,
      y: 0,
      z: 0,
      num: 3,
      len: 10,
      //右、左、上、下、前、后
      colors: [
        '#ff6b02',
        '#dd422f',
        '#ffffff',
        '#fdcd02',
        '#3d81f7',
        '#019d53'
      ]
    });

    this.scene.add(...cubs);
  }

  initLight() {
    const light = new AmbientLight(0xfefefe);
    this.scene.add(light);
  }

  touchStart(event: MouseEvent) {
    this.startPoint = new Vector3(
      event.clientX,
      event.clientY,
      0
    );
    this.isTouching = true;
    this.getIntersects(event);
    if (this.intersect) {
      this.startPoint = this.intersect.point;
    }
  }

  touchMove(event: MouseEvent) {
    this.getIntersects(event);
    console.log(
      this.isTouching,
      this.startPoint,
      this.intersect
    );
    if (
      this.isTouching &&
      this.startPoint &&
      this.intersect
    ) {
      //滑动点在魔方上且魔方没有转动
      this.movePoint = this.intersect.point;
      if (!this.movePoint.equals(this.startPoint)) {
        //触摸点和滑动点不一样则意味着可以得到滑动方向
        this.rotateRubik();
      }
    }
  }

  touchEnd(event: MouseEvent) {
    this.isTouching = false;
  }

  /**
   * @description 获取操作魔方时的触摸点坐标以及该触摸点所在平面的法向量
   * @param event
   */
  getIntersects(event: MouseEvent) {
    const mouse = new THREE.Vector2();
    // 添加窗口尺寸动态获取
    const width = this.renderer.domElement.clientWidth;
    const height = this.renderer.domElement.clientHeight;
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = -(event.clientY / height) * 2 + 1;

    this.raycaster.setFromCamera(mouse, this.camera);

    // 添加类型断言和空数组判断
    const intersects =
      this.raycaster.intersectObjects<THREE.Mesh>(
        this.scene.children,
        true
      );

    if (intersects.length === 0) {
      this.intersect = undefined;
      this.normalize = undefined;
    }

    // 获取法向量需要从相交面的face属性获取
    const firstIntersect = intersects[0];
    console.log(firstIntersect, 'firstIntersect');
    const normal = firstIntersect.face?.normal.clone();
    this.intersect = firstIntersect;
    this.normalize = normal;
  }

  rotateRubik() {
    if (
      !this.targetRubik ||
      !this.movePoint ||
      !this.startPoint ||
      !this.normalize
    )
      return;

    // 计算屏幕滑动向量
    const delta = new Vector3().subVectors(
      this.movePoint,
      this.startPoint
    );

    // 将屏幕方向转换为3D空间方向
    const screenToWorld = (delta: Vector3) => {
      const camera = this.camera;
      const viewProjectionInverse = new Matrix4()
        .multiplyMatrices(
          camera.projectionMatrix,
          camera.matrixWorldInverse
        )
        .invert();

      return delta.applyMatrix4(viewProjectionInverse);
    };

    // 计算有效旋转轴
    const worldDelta = screenToWorld(delta);
    const rotationAxis = new Vector3()
      .crossVectors(this.normalize, worldDelta)
      .normalize();

    // 排除无效旋转
    if (rotationAxis.length() < 0.1) return;

    // 计算旋转角度（基于滑动距离）
    const swipeDistance = delta.length();
    const rotationAngle = THREE.MathUtils.clamp(
      swipeDistance * 0.005, // 灵敏度系数
      -Math.PI / 2,
      Math.PI / 2
    );

    console.log(rotationAxis, rotationAngle);
  }

  resetRotateParams() {
    this.isRotating = false;
    this.targetRubik = null;
    this.anotherRubik = null;
    this.intersect = null;
    this.normalize = null;
    this.startPoint = null;
    this.movePoint = null;
  }
}
