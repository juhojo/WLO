
onmessage=e=>{
  maximumClique(e.data[0]);
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

  postMessage(run());
}
