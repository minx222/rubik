import * as THREE from 'three';

export const createFaces = (config: {
  rgbaColor: string;
  width: number;
  height: number;
}) => {
  const { rgbaColor, width, height } = config;

  if (!document) {
    throw new Error('document is not defined');
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('context is not defined');
  }
  //画一个宽高都是256的黑色正方形
  context.fillStyle = 'rgba(0,0,0,1)';
  context.fillRect(0, 0, 256, 256);
  //在内部用某颜色的16px宽的线再画一个宽高为224的圆角正方形并用改颜色填充
  context.rect(16, 16, 224, 224);
  context.lineJoin = 'round';
  context.lineWidth = 16;
  context.fillStyle = rgbaColor;
  context.strokeStyle = rgbaColor;
  context.stroke();
  context.fill();
  return canvas;
};

export const createCube = (config: {
  x: number;
  y: number;
  z: number;
  num: number;
  len: number;
  colors: string[];
}) => {
  const { x, y, z, num, len, colors } = config;

  // 计算左上角的坐标
  const leftUpX = x - (num / 2) * len;
  const leftUpY = y + (num / 2) * len;
  const leftUpZ = z + (num / 2) * len;

  const cubes: THREE.Mesh[] = [];

  // 缓存材质
  const colorMap = new Map<
    string,
    THREE.MeshLambertMaterial
  >();
  const cubeGeo = new THREE.BoxGeometry(len, len, len);

  // 遍历每个小方块
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num * num; j++) {
      // 创建每个面的纹理
      const myFaces = [];
      for (let k = 0; k < 6; k++) {
        myFaces[k] = createFaces({
          rgbaColor: colors[k],
          width: 256,
          height: 256
        });
      }

      // 创建材质
      const materials: THREE.MeshLambertMaterial[] = [];
      for (let k = 0; k < 6; k++) {
        const cache = colorMap.get(colors[k]);
        if (cache) {
          materials.push(cache);
          continue;
        }
        const texture = new THREE.Texture(myFaces[k]);
        texture.needsUpdate = true;
        const mesh = new THREE.MeshLambertMaterial({
          map: texture
        });
        colorMap.set(colors[k], mesh);
        materials.push(mesh);
      }

      // 创建小方块
      const cube = new THREE.Mesh(cubeGeo, materials);

      // 计算小方块的中心点坐标
      cube.position.x = leftUpX + len / 2 + (j % num) * len;
      cube.position.y =
        leftUpY - len / 2 - Math.floor(j / num) * len;
      cube.position.z = leftUpZ - len / 2 - i * len;

      cubes.push(cube);
    }
  }

  return cubes;
};

export const rotateAroundWorldAxis = (
  p: THREE.Vector3,
  vector: THREE.Vector3,
  rad: number
) => {
  vector.normalize();
  const u = vector.x;
  const v = vector.y;
  const w = vector.z;

  const a = p.x;
  const b = p.y;
  const c = p.z;

  const matrix4 = new THREE.Matrix4();

  matrix4.set(
    u * u + (v * v + w * w) * Math.cos(rad),
    u * v * (1 - Math.cos(rad)) - w * Math.sin(rad),
    u * w * (1 - Math.cos(rad)) + v * Math.sin(rad),
    (a * (v * v + w * w) - u * (b * v + c * w)) *
      (1 - Math.cos(rad)) +
      (b * w - c * v) * Math.sin(rad),
    u * v * (1 - Math.cos(rad)) + w * Math.sin(rad),
    v * v + (u * u + w * w) * Math.cos(rad),
    v * w * (1 - Math.cos(rad)) - u * Math.sin(rad),
    (b * (u * u + w * w) - v * (a * u + c * w)) *
      (1 - Math.cos(rad)) +
      (c * u - a * w) * Math.sin(rad),
    u * w * (1 - Math.cos(rad)) - v * Math.sin(rad),
    v * w * (1 - Math.cos(rad)) + u * Math.sin(rad),
    w * w + (u * u + v * v) * Math.cos(rad),
    (c * (u * u + v * v) - w * (a * u + b * v)) *
      (1 - Math.cos(rad)) +
      (a * v - b * u) * Math.sin(rad),
    0,
    0,
    0,
    1
  );

  return matrix4;
};
