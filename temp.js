var M_VAL = 50000; // Value when not connected nodes
function generate() {
	var numNodes = Math.floor(Math.random()*20)+5; // change to courses.length
	var numArcs = Math.floor(Math.random()*((numNodes*(numNodes-1)/4) - numNodes)) + numNodes;
	var graph = new Array(numNodes); // New array length of courses.length
	var tree = new Array(); // Change to []
	var otherNodes = new Array(); // Change to []
	var count = 0;

	for (var i = 0; i < numNodes; i++) {
		graph[i] = new Array(numNodes); // each graph child has same length as graph.
		for (var j = 0; j < numNodes; j++) {
			graph[i][j] = M_VAL; // set all graph's childs' children initially 50000.
		}
	}

	tree[0] = 0; // set array tree first child as 0 ? WHY ?
	for (var i = 1; i < numNodes; i++) {
		otherNodes[i-1] = i; // otherNodes children:
                         // otherNodes[0] = 1;
                         // otherNodes[1] = 2;...
                         // otherNodes[last] = numNodes - 1;
	}

	while(tree.length < numNodes) {
		var inside = Math.floor(Math.random()*tree.length);
		var outside = Math.floor(Math.random()*otherNodes.length);

		graph[tree[inside]][otherNodes[outside]] = 1;
		graph[otherNodes[outside]][tree[inside]] = 1;

		tree[tree.length] = otherNodes[outside];

		otherNodes[outside] = otherNodes[otherNodes.length-1];
		otherNodes.length--;

		count++;
	}

	while (count < numArcs) {
		var loc1, loc2;

		do {
			var loc1 = Math.floor(Math.random()*numNodes);
			var loc2;
			var poss = new Array();
			for (var i = 0; i < graph.length; i++) {
				if ((graph[loc1][i] == M_VAL)&&(i != loc1)) {
					poss[poss.length] = i;
				}
			}

			loc2 = Math.floor(Math.random()*poss.length);
		}
		while (poss.length == 0);

		graph[loc1][poss[loc2]] = 1;
		graph[poss[loc2]][loc1] = 1;
		count++;
	}

	for (var i = 0; i < graph.length; i++) {
		P[i] = i;
	}
	R = new Array();
	X = new Array();

	return graph;
}

function BKAlg(A, R, P, X, nest) {

	// console.log(nest + ") R = {" + R + "}, " + R.length, nest + ") P = {" + P + "}, " + P.length, nest + ") X = {" + X + "}, " + X.length);

	if (P.length == 0 && X.length == 0) {
		// console.log(nest + ") P and X are both empty, returning R, " + R);
		clqs[clqs.length] = R;
		return;
	}

	var u = Math.floor(Math.random()*(P.length + X.length));

	var uVal = -1;
	// console.log(nest + ") u = " + u);
	if (u >= P.length) {
		u = u - P.length;
		uVal = X[u];
	} else {
		uVal = P[u];
	}

	// console.log(nest + ") uVal = " + uVal);

	for (var v = 0; v < P.length; v++) {
		var val = P[v];
    // console.log(nest + ") v = " + v);
    // console.log(nest + ") P[v] = " + val);
    // console.log(nest + ") A[P[v]][u] = " + A[val][u]);
    // console.log(nest + ") R = " + R);

		if (A[val][uVal] == M_VAL) {
			var tempR = new Array();
			for (var i = 0; i < R.length; i++) {
				tempR[i] = R[i];
			}
			if (tempR.length == 0 || tempR.indexOf(val) == -1) {
				tempR[tempR.length] = val;
			}

			// console.log(nest + ") tempR = " + tempR);

			var tempP = new Array();
			for (var j = 0; j < A.length; j++) {
				if (A[val][j] == 1 && P.indexOf(j) != -1) {
					tempP[tempP.length] = j;
				}
			}

			// console.log(nest + ") tempP = " + tempP);

			var tempX = new Array();
			for (var i = 0; i < A.length; i++) {
				if (A[i][val] == 1 && X.indexOf(i) != -1) {
					tempX[tempX.length] = i;
				}
			}

			// console.log(nest + ") tempX = " + tempX);

			BKAlg(A, tempR, tempP, tempX, nest + 1);

			P[v] = -1;

			// console.log(nest + ") P = " + P);

			if (X.indexOf(val) == -1) {
				X[X.length] = val;
			}
			// console.log(nest + ") X = " + X);
		}
	}
}

function getMaxClq() {
	var maxLen = 0;
	var maxLoc = -1;

	for (var i = 0; i < clqs.length; i++)
	{
		if (clqs[i].length > maxLen)
		{
			maxLen = clqs[i].length;
			maxLoc = i;
		}
	}
	return clqs[maxLoc];
}




///////////////// INIT ///////////////////




var P = new Array(); //
var R = new Array(); //
var X = new Array(); // X is
var A = generate(); // A is the Graph
var userAns = new Array();
var clqs = new Array();

todo();
function todo() {
	clqs = new Array();
	BKAlg(A, R, P, X, 0);
	var ans = getMaxClq();
	console.log('A maximum clique for this graph is ' + ans + ' with a length of ' + ans.length);
}
