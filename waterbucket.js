var queue = []
var seen = {};

function getState () 
		{
		if (queue.length==0)
			 {
			return NaN;
			}
		var state = queue[0]
		queue = queue.slice(1)
		return state;
		}	
function addState (parentState, newState)
		 {
			for (element in seen) 
				if (newState == element)  
					return; 
		seen[newState.toString()] = parentState.toString()
		queue = queue.concat([newState]);
			
		}
function getSolution()
		{  
	
		var solution = [];
		state = queue[queue.length-1];
		while (state.length) 
			{
				solution = solution.concat('['+state.toString()+']');
				state = getParent(state);
			}
		solution.reverse();
		return solution;
		}
function getParent (childState) 
		{
		try  
			{
				 return seen[childState.toString()];
			}
		catch(err)
			{
				 return NaN;
			}
		}
function test (oldstate, newstate,goal) 
		{
		var newA = newstate[0];
		var newB = newstate[1];
		won = (newA == goal || newB == goal);
		addState (oldstate, newstate)
		return won;
		}
function playGame (aMax, bMax, goal) 
		{
		addState("", [0,0]);
		while (true) 
			{
			oldstate = getState();
			var aHas = oldstate[0];
			var bHas = oldstate[1];
			if (test (oldstate, [aMax,bHas],goal))
				 break; //fill A from well
			if (test (oldstate, [0,bHas],goal))
				 break; // empty A to well
			if (test (oldstate, [aHas,bMax],goal))
				 break; // fill B from well
			if (test (oldstate, [aHas,0], goal))
				 break; // empty B to well
			howmuch = Math.min(aHas, bMax-bHas);
			if (test (oldstate, [aHas-howmuch,bHas+howmuch],goal))
				 break; // pour A to B
			howmuch = Math.min(bHas, aMax-aHas)
			if (test (oldstate, [aHas+howmuch,bHas-howmuch],goal))
				 break; // pour B to A
			}
		
		console.log('Solution is ');
		console.log(getSolution(), '\n');
		}
console.log(playGame(7,11,6));
