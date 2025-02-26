import * as THREE from 'three';

import { createCube } from '@/helps/rubik';
import { ThreeJs } from '@/helps/three';
import { AmbientLight, Vector3 } from 'three';

import gsap from 'gsap';

export class RubikThreeJs extends ThreeJs {
  raycaster: THREE.Raycaster;

  intersect?: THREE.Intersection<THREE.Mesh>;

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

  handleCtrlLeftClick(event: MouseEvent) {
    this.getIntersects(event);

    if (
      !this.intersect ||
      !(this.intersect.object instanceof THREE.Mesh)
    ) {
      return;
    }

    const position = this.intersect.object.position.clone();
    console.log(position, 'position');
    // 获取对应的模仿
    const list = this.scene.children.filter((mesh) => {
      return (
        mesh.position.x === position.x &&
        mesh instanceof THREE.Mesh
      );
    }) as THREE.Mesh[];

    list.forEach((mesh) => {
      const material = mesh.material;

      const lp = mesh.position.clone();
      const radians = 90 * (Math.PI / 180);
      const axis = new Vector3(10, 0, 0).normalize(); // 获取旋转轴
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(axis, radians);
      lp.applyQuaternion(quaternion);

      gsap.to(mesh.position, {
        x: lp.x,
        y: lp.y,
        z: lp.z,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          mesh.material = [
            // 右边
            material[0],
            // 左边
            material[1],
            // 上面
            material[5],
            // 下面
            material[4],
            // 正面
            material[2],
            // 后面
            material[3]
          ];
        }
      });
    });
  }

  handleCtrlRightClick(event: MouseEvent) {
    this.getIntersects(event);

    if (
      !this.intersect ||
      !(this.intersect.object instanceof THREE.Mesh)
    ) {
      return;
    }

    const position = this.intersect.object.position.clone();
    console.log(position, 'position');
    // 获取对应的模仿
    const list = this.scene.children.filter((mesh) => {
      return (
        mesh.position.x === position.x &&
        mesh instanceof THREE.Mesh
      );
    }) as THREE.Mesh[];

    list.forEach((mesh) => {
      const material = mesh.material;

      const lp = mesh.position.clone();
      const radians = -90 * (Math.PI / 180);
      const axis = new Vector3(10, 0, 0).normalize(); // 获取旋转轴
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(axis, radians);
      lp.applyQuaternion(quaternion);

      gsap.to(mesh.position, {
        x: lp.x,
        y: lp.y,
        z: lp.z,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          mesh.material = [
            // 右边 0
            material[0],
            // 左边 1
            material[1],
            // 上面 2
            material[5],
            // 下面 3
            material[4],
            // 正面 4
            material[2],
            // 后面 5
            material[3]
          ];
        }
      });
    });
  }

  touchStart(event: MouseEvent) {
    this.getIntersects(event);

    if (
      !this.intersect ||
      !(this.intersect.object instanceof THREE.Mesh)
    ) {
      return;
    }

    const position = this.intersect.object.position.clone();
    console.log(position, 'position');
    // 获取对应的模仿
    const list = this.scene.children.filter((mesh) => {
      return (
        mesh.position.y === position.y &&
        mesh instanceof THREE.Mesh
      );
    }) as THREE.Mesh[];

    list.forEach((mesh) => {
      const material = mesh.material;
      // mesh.material = [
      //   // 右边
      //   material[5],
      //   // 左边
      //   material[4],
      //   // 上面
      //   material[2],
      //   // 下面
      //   material[3],
      //   // 正面
      //   material[0],
      //   // 后面
      //   material[1]
      // ];

      const lp = mesh.position.clone();
      const radians = 90 * (Math.PI / 180);
      const axis = new Vector3(0, 10, 0).normalize(); // 获取旋转轴
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(axis, radians);
      lp.applyQuaternion(quaternion);

      gsap.to(mesh.position, {
        x: lp.x,
        y: lp.y,
        z: lp.z,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          mesh.material = [
            // 右边
            material[4],
            // 左边
            material[5],
            // 上面
            material[2],
            // 下面
            material[3],
            // 正面
            material[1],
            // 后面
            material[0]
          ];
        }
      });
    });
  }

  handleRightClick(event: MouseEvent) {
    this.getIntersects(event);

    if (
      !this.intersect ||
      !(this.intersect.object instanceof THREE.Mesh)
    ) {
      return;
    }

    const position = this.intersect.object.position.clone();
    // 获取对应的模仿
    const list = this.scene.children.filter((mesh) => {
      return (
        mesh.position.y === position.y &&
        mesh instanceof THREE.Mesh
      );
    }) as THREE.Mesh[];

    list.forEach((mesh) => {
      const material = mesh.material;

      const lp = mesh.position.clone();
      const radians = -90 * (Math.PI / 180);
      const axis = new Vector3(0, 10, 0).normalize(); // 获取旋转轴
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(axis, radians);
      lp.applyQuaternion(quaternion);

      gsap.to(mesh.position, {
        x: lp.x,
        y: lp.y,
        z: lp.z,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          mesh.material = [
            //  右边
            material[5],
            // 左边
            material[4],
            // 上面
            material[2],
            // 下面
            material[3],
            // 正面
            material[0],
            // 后面
            material[1]
          ];
        }
      });
    });
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
    this.intersect = firstIntersect;
  }
}
