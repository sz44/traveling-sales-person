const w = 400;
const h = 400;
const r = 10;

let n = 6;

let nodes;
let order;
let bestPath;
let bestLength;
let totalOps=1;
let ops = 0;
let done = false;

let path = [];
let counted = new Set();

function setup() {
  createCanvas(w, h);
  // create n random nodes
  nodes = getNodes(n);
  order = nodes.map((e,i)=>i);
  bestPath = order.slice();
  bestLength = getLength2(bestPath);
  totalOps = factorial(n)
}

function draw() {
  if (done) {
    noLoop();
  }
  background(220);
 
  fill(200, 150, 100);
  for (const node of nodes) {
    circle(node.x, node.y, r);
  }
  textSize(40)
  fill(0)
  let percent = round((ops/totalOps)*100,2);
  text(`${percent}%`, 200, 200);
  ops++;
  //noLoop();
  noFill();
  stroke(0);
  beginShape();
  for (let nodeIndex of order) {
    vertex(nodes[nodeIndex].x, nodes[nodeIndex].y);
  }
  endShape();
  
  let currentLength = getLength2(order);
  if (currentLength < bestLength) {
    bestPath = order.slice();
    bestLength = currentLength;
    console.log(bestLength)
  }
  fill(0)
  textSize(20);
  text(round(bestLength,2), 50, 50);  
  noFill()
  stroke(255,0,0);
  beginShape();
  for (let nodeIndex of bestPath) {
    vertex(nodes[nodeIndex].x, nodes[nodeIndex].y);
  }
  endShape();
  
  
  
  //stroke(50)
  // for (let i = 1; i<order.length; i++) {
  //   let v1 = nodes[order[i-1]];
  //   let v2 = nodes[order[i]];
  //   line(v1.x,v1.y,v2.x,v2.y);
  // }
  getNext(order)
}
function factorial(n) {
  out = 1;
  while (n > 0) {
    out *= n;
    n--;
  }
  return out;
}

function getNext(array) {
  let x=-1;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < array[i+1]) {
      x = i;
    }
  }
  if (x==-1) {
    done = true;
    return
  }
  // step 2: y
  let y;
  for (let i = x+1; i < array.length; i++) {
    if (array[x] < array[i]) {
      y = i;
    }
  }
  // step 3: swap
  let temp = array[x];
  array[x] = array[y];
  array[y] = temp;
  // setp 4:  reverse
  let tail = array.splice(x+1);
  tail.reverse();
  order = array.concat(tail);
}


function search(nodes) {
  let dfs = () => {
    if (counted.size === nodes.length) {
      let length = getLength(path);
      if (length < bestLength) {
        bestPath = path.slice();
        bestLength = length;
      }
      return;
    }
    for (let i in nodes) {
      if (!counted.has(i)) {
        counted.add(i);
        path.push(nodes[i]);
        dfs();
        counted.delete(i);
        path.pop();
      }
    }
  }
  dfs();
}

function getLength(nodes) {
  let out = 0;
  for (let i=1;i<nodes.length;i++) {
    out += nodes[i-1].dist(nodes[i]);
  }
  return out;
}

function getLength2(order) {
  let total = 0;
  for (let i=1;i<order.length;i++) {
    let v1 = nodes[order[i-1]];
    let v2 = nodes[order[i]];
    total += v1.dist(v2);
  }
  return total;
}

function getNodes(n) {
  let out = [];
  for (let i = 0; i < n; i++) {
    out.push(createVector(r+random(w-2*r),r+random(h-2*r)));
  }
  return out;
}