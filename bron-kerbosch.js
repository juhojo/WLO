'use strict';
const graph = [
  [0,1,0,0,1,0],
  [1,0,1,0,1,0],
  [0,1,0,1,0,0],
  [0,0,1,0,1,1],
  [1,1,0,1,0,0],
  [0,0,0,1,0,0],
];

function N(vertex){
  let c = 0;
  const l = [];
  for (let i in graph[vertex]){
      if (i){
        l.push(c);
        c++;
      }
  }
  return l;
}

function bronk(r,p,x){
  if (p.length == 0 && x.length == 0){
    console.log(r);
    return;
  }
  for (let vertex in p.slice(0)){
    const r_new = r.slice(0);
    r_new.push(vertex);
    const p_new = p.filter(val => graph[vertex][val]);
    const x_new = x.filter(val => graph[vertex][val]);
    bronk(r_new, p_new, x_new);
    p=p.splice(vertex,1);
    x.push(vertex);
  }
}

bronk([], [0,1,2,3,4,5], []);

// Ku siis en tiiä ku 
// //nii?















    for(val in p){
      if(~~N(vertex).indexOf(val)){
        p_new.push(val);
      }
    }
