(()=>{
  Array.prototype.spliced = function(){
    Array.prototype.splice.apply(this, arguments);
    return(this);
  }

  Array.prototype.spliced = function(){
    Array.prototype.splice.apply(this, arguments);
    return(this);
  }

  Array.prototype.insert=(position=>{
    return function(e){
      this.splice(position(this, e), 0, e);
    }
  })((array, value)=>{
    let low = 0,
      high = array.length;
    while (low < high) {
      const mid = low + high >>> 1;
      if (array[mid] < value) low = mid + 1;
      else high = mid;
    }
    return low;
  });

  // Object.prototype.cloned = function(){
  //   return JSON.parse(JSON.stringify(this));
  // }
})();

function clone(obj){
  return JSON.parse(JSON.stringify(obj));
}

function rand(a, b=a){
  if(b==a) a=1;
  return ~~(Math.random()*(b-a+1)+a);
}

function add(a, b) {
  return a + b;
}

const exports={
  rand:rand,
  add:add,
  clone:clone,
}

export {rand, add, clone};
export default exports;
