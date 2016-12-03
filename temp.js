var M_VAL = 50000;
function generate()
{
	var numNodes = Math.floor(Math.random()*20)+5;
	var numArcs = Math.floor(Math.random()*((numNodes*(numNodes-1)/4) - numNodes)) + numNodes;
	var graph = new Array(numNodes);
	var tree = new Array();
	var otherNodes = new Array();
	var count = 0;

	for (var i = 0; i < numNodes; i++)
	{
		graph[i] = new Array(numNodes);
		for (var j = 0; j < numNodes; j++)
		{
			graph[i][j] = M_VAL;
		}
	}

	tree[0] = 0;
	for (var i = 1; i < numNodes; i++)
	{
		otherNodes[i-1] = i;
	}

	while(tree.length < numNodes)
	{
		var inside = Math.floor(Math.random()*tree.length);
		var outside = Math.floor(Math.random()*otherNodes.length);

		graph[tree[inside]][otherNodes[outside]] = 1;
		graph[otherNodes[outside]][tree[inside]] = 1;

		tree[tree.length] = otherNodes[outside];

		otherNodes[outside] = otherNodes[otherNodes.length-1];
		otherNodes.length--;

		count++;
	}

	while (count < numArcs)
	{
		var loc1, loc2;

		do
		{
			var loc1 = Math.floor(Math.random()*numNodes);
			var loc2;
			var poss = new Array();
			for (var i = 0; i < graph.length; i++)
			{
				if ((graph[loc1][i] == M_VAL)&&(i != loc1))
				{
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

	for (var i = 0; i < graph.length; i++)
	{
		P[i] = i;
	}
	R = new Array();
	X = new Array();

	return graph;
}

function BKAlg(A, R, P, X, nest)
{
	if (P.length == 0 && X.length == 0)
	{
		clqs[clqs.length] = R;
		return;
	}

	var u = Math.floor(Math.random()*(P.length + X.length));

	var uVal = -1;

	if (u >= P.length)
	{
		u = u - P.length;
		uVal = X[u];
	}
	else
	{
		uVal = P[u];
	}

	for (var v = 0; v < P.length; v++)
	{
		var val = P[v];

		if (A[val][uVal] == M_VAL)
		{
			var tempR = new Array();
			for (var i = 0; i < R.length; i++)
			{
				tempR[i] = R[i];
			}
			if (tempR.length == 0 || tempR.indexOf(val) == -1)
			{
				tempR[tempR.length] = val;
			}

			var tempP = new Array();
			for (var j = 0; j < A.length; j++)
			{
				if (A[val][j] == 1 && P.indexOf(j) != -1)
				{
					tempP[tempP.length] = j;
				}
			}

			var tempX = new Array();
			for (var i = 0; i < A.length; i++)
			{
				if (A[i][val] == 1 && X.indexOf(i) != -1)
				{
					tempX[tempX.length] = i;
				}
			}

			BKAlg(A, tempR, tempP, tempX, nest + 1);

			P[v] = -1;

			if (X.indexOf(val) == -1)
			{
				X[X.length] = val;
			}
		}
	}
}

function isClique(userAns, A)
{
	var ans = true;

	for (var i = 0; i < userAns.length && ans; i++)
	{
		for (var j = i+1; j < userAns.length && ans; j++)
		{
			var node1 = userAns[i];
			var node2 = userAns[j];

			if (A[node1][node2] != 1)
			{
				ans = false;
			}
		}
	}

	return ans;
}

function init(A)
{
	var forest = new Object();
	forest.edges = new Array();
	forest.trees = new Array();
	forest.nodes = new Array();

	var theta = new Array();
	var x = new Array();
	var y = new Array();

	for (var i = 0; i < A.length; i++)
	{
		theta[i] = (2*Math.PI*i) / A.length;

		forest.trees[i] = new Array();

		forest.nodes[i] = new Object;
		forest.nodes[i].value = i;
		forest.nodes[i].xVal = 255*Math.cos(theta[i]) + 275;
		forest.nodes[i].yVal = 255*Math.sin(theta[i]) + 275;
		forest.nodes[i].lookup = i;

		forest.trees[i][0] = forest.nodes[i];
	}

	return forest;
}

function newProb()
{
	P = new Array();
	R = new Array();
	X = new Array();
	A = generate();
	userAns = new Array();
	clqs = new Array();
	forest=init(A);
	drawGraph(forest);
}

function getMaxClq()
{
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
