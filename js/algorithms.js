//Knapsack algorithm
//==================
// wikipedia: [Knapsack (0/1)](http://en.wikipedia.org/wiki/Knapsack_problem#0.2F1_Knapsack_Problem)
// Given a set `[{weight:Number, benefit:Number}]` and a capacity,
// find the maximum value possible while keeping the weight below
// or equal to the capacity
// **params**:
//    `capacity`  : Number,
//    `items`     : [{hours:Number, credits:Number}]
// **returns**:
//    An object containing `maxValue` and `set`
function knapsack(items, capacity) {
  var idxItem   = 0,
      idxWeight = 0,
      oldMax    = 0,
      newMax    = 0,
      numItems  = items.length,
      weightMatrix  = new Array(numItems+1),
      keepMatrix    = new Array(numItems+1),
      solutionSet   = [];

  // Setup matrices
  for(idxItem = 0; idxItem < numItems + 1; idxItem++){
    weightMatrix[idxItem] = new Array(capacity+1);
    keepMatrix[idxItem]   = new Array(capacity+1);
  }

  // Build weightMatrix from [0][0] -> [numItems-1][capacity-1]
  for (idxItem = 0; idxItem <= numItems; idxItem++){
    for (idxWeight = 0; idxWeight <= capacity; idxWeight++){

      // Fill top row and left column with zeros
      if (idxItem === 0 || idxWeight === 0){
        weightMatrix[idxItem][idxWeight] = 0;
      }

      // If item will fit, decide if there's greater value in keeping it,
      // or leaving it
      else if (items[idxItem-1].hours <= idxWeight){
        newMax = items[idxItem-1].credits + weightMatrix[idxItem-1][idxWeight-items[idxItem-1].hours];
        oldMax = weightMatrix[idxItem-1][idxWeight];

        // Update the matrices
        if(newMax > oldMax){
          weightMatrix[idxItem][idxWeight]  = newMax;
          keepMatrix[idxItem][idxWeight]    = 1;
        }
        else{
          weightMatrix[idxItem][idxWeight]  = oldMax;
          keepMatrix[idxItem][idxWeight]    = 0;
        }
      }

      // Else, item can't fit; value and weight are the same as before
      else{
        weightMatrix[idxItem][idxWeight] = weightMatrix[idxItem-1][idxWeight];
      }
    }
  }

  // Traverse through keepMatrix ([numItems][capacity] -> [1][?])
  // to create solutionSet
  idxWeight = capacity;
  idxItem   = numItems;
  for(idxItem; idxItem > 0; idxItem--){
    if(keepMatrix[idxItem][idxWeight] === 1){
      solutionSet.push(items[idxItem - 1]);
      idxWeight = idxWeight - items[idxItem - 1].hours;
    }
  }
  return {"maxValue": weightMatrix[numItems][capacity], "set": solutionSet};
}

/**
 * Manda algorithm (Short for mandatory)
 * Prioritieses mandatory courses over optional courses.
 * First populates the courses with as many mandatory
 * courses as possible and then fills all
 * the remaining capacity with optional ones.
 *
 * Starts with the largest mandatory course,
 * because if a course is mandatory and there is
 * capacity for it it should be picked.
 */

function manda(data, capacity) {
  let returnData = {
    maxValue: 0,
    set: [],
  };
  let mandatories = [];
  let freebies = [];

  data.forEach((obj) => {
    if (obj.mandatory) mandatories.push(obj);
    else freebies.push(obj);
  });
  mandatories = mandatories.sort(function(a, b){
    return a.credits > b.credits;
  });

  while (capacity > 0 && returnData.set.length < data.length) {
    for (let i = mandatories.length - 1; i >= 0; i--) {
      if (mandatories[i].hours <= capacity) {
        returnData.set.push(mandatories[i]);
        capacity = capacity - mandatories[i].hours;
      } else break;
    }
    for (let i = 0; i < freebies.length; i++) {
      let pos = []; // Short for possible
      for (let j = i; j < freebies.length; j++) {
        if (capacity > freebies[j].hours && returnData.set.indexOf(freebies[j]) < 0) pos.push(freebies[j]);
      }
      if (pos.length > 0) {
        let mostValuable = pos[0];
        let k = 0;
        while (k < pos.length - 1) { // atleast one item more.
          if ((mostValuable.credits / mostValuable.hours) < (pos[k+1].credits / pos[k+1].hours)) {
            mostValuable = pos[i+1];
          }
          k++;
        }
        if (mostValuable.hours <= capacity) {
          returnData.set.push(mostValuable);
          capacity = capacity - mostValuable.hours;
        } else break;
      } else break;
    }
    break; // Can not fit anymore so quit.
  }
  returnData.set.forEach((item) => returnData.maxValue += item.credits);
  return returnData;
}

/**
 * Value to Weight algorithm
 * Only interested in v/w  ratio. (Value / Weight)
 * Populates the array with as many high ratio items as capacity allows.
 *
 * Starts with the item with highest v/w,
 * if item does not fit checks if any remaining items share same ratio,
 * stops if there is no items with that ratio, eventhough some other
 * item with lower v/w ratio might still fit into array.
 */

function valueToWeight(data, capacity) {
  let returnData = {
    maxValue: 0,
    set: [],
  };

  const sorted = data.sort(function(a, b){
    return (a.credits / a.hours) < (b.credits / b.hours);
  });

  let weight = 0;
  sorted.some((item, i) => {
    if ((weight + item.hours) < capacity) {
      weight += item.hours;
      returnData.set.push(item);
    } else {
      for (let j = i; j < sorted.length; j++) {
        if ((item.credits / item.hours) === (sorted[j].credits / sorted[j].hours)) {
          if ((weight + sorted[j].hours) < capacity) {
            weight += sorted[j].hours;
            returnData.set.push(sorted[j]);
          }
        }
      }
      return true; // Breaks the some loop
    }
  });
  returnData.set.forEach((item) => returnData.maxValue += item.credits);
  return returnData;
}

/* Graph Theory */
// A = Graph
// R = Temporary result
// P = Possible candidates
// X = Excluded set

function maximumClique(A) {
  let P = [];
  let R = [];
  let X = [];
  let clqs = [];

  function BKAlg(A, R, P, X, nest) {

  	if (P.length == 0 && X.length == 0) {
  		clqs[clqs.length] = R;
  		return;
  	}

  	let u = Math.floor(Math.random()*(P.length + X.length));

  	let uVal = -1;
  	if (u >= P.length) {
  		u = u - P.length;
  		uVal = X[u];
  	} else {
  		uVal = P[u];
  	}

  	for (let v = 0; v < P.length; v++) {
  		let val = P[v];

  		if (A[val][uVal] == 0) {
  			let tempR = new Array();
  			for (let i = 0; i < R.length; i++) {
  				tempR[i] = R[i];
  			}
  			if (tempR.length == 0 || tempR.indexOf(val) == -1) {
  				tempR[tempR.length] = val;
  			}

  			let tempP = new Array();
  			for (let j = 0; j < A.length; j++) {
  				if (A[val][j] == 1 && P.indexOf(j) != -1) {
  					tempP[tempP.length] = j;
  				}
  			}

  			let tempX = new Array();
  			for (let i = 0; i < A.length; i++) {
  				if (A[i][val] == 1 && X.indexOf(i) != -1) {
  					tempX[tempX.length] = i;
  				}
  			}

  			BKAlg(A, tempR, tempP, tempX, nest + 1);

  			P[v] = -1;

  			if (X.indexOf(val) == -1) {
  				X[X.length] = val;
  			}
  		}
  	}
  }

  function getMaxClq() {
  	let maxLen = 0;
  	let maxLoc = -1;

  	for (let i = 0; i < clqs.length; i++) {
  		if (clqs[i].length > maxLen) {
  			maxLen = clqs[i].length;
  			maxLoc = i;
  		}
  	}
  	return clqs[maxLoc];
  }

  function run() {
    for (let i = 0; i < A.length; i++) {
      P[i] = i;
    }
  	BKAlg(A, R, P, X, 0);
  	return getMaxClq();
  }

  return run();
}

export { knapsack, manda, valueToWeight, maximumClique };
