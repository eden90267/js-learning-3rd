const sin = Math.sin;
const cos = Math.cos;
const theta = Math.PI / 4;
const zoom = 2;
const offset = [1, -3];

const pipeline = [
    function rotate(p) {
        return {
            x: p.x * cos(theta) - p.y * sin(theta),
            y: p.x * sin(theta) + p.y * cos(theta),
        };
    },
    function scale(p) {
        return { x: p.x * zoom, y: p.y * zoom };
    },
    function translate(p) {
        return { x: p.x + offset[0], y: p.y + offset[1] };
    }
];

// 現在pipeline是特定的2D變形的函式陣列
// 現在可以變換一點

const p = { x: 1, y: 1 };
let p2 = p;
for (let i = 0; i < pipeline.length; i++) {
    p2 = pipeline[i](p2);
}

// 現在p2是p1繞著原點旋轉45度(pi/4弧度)，放大兩倍，並往右移1個單位，往下移3個單位
