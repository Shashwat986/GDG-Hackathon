/*
Variables:
money, money_rate, clean_water, clean_water_rate, dirty_water, dirty_water_rate, rain,
dirtiness, num_of_citizens, citizen_water_usage, citizen_happiness, lost, num_years
---
Three different kinds of actions/events:
1. Persistent Actions - Always available to the player. Function takes no parameters. Function called when action is invoked.
2. Temporal Actions - The user gets a choice at a certain stage. Yes/No options available. Function takes one parameter: 1 if yes, 0 if no.
3. Events - These are events that take place outside of the player's control. Function takes no parameter. Function runs on event call.
*/

var persistent_actions = [
	{
		type:"PSA",
		text:"Public Service Announcement to save water",
		title:"Public Service Announcement"
	},
	{
		type:"WaterTreatment",
		text:"Set-up a water treatment plant",
		title:"Water Treatment Plant"
	},
	{
		type:"RWH",
		text:"Set up rain-water harvesting in applicable areas",
		title:"Rain Water Harvesting"
	},
	{
		type:"TaxIncrease",
		text:"Increase the amount of Tax levied on water",
		title:"Tax +"
	},
	{
		type:"TaxDecrease",
		text:"Decrease the amount of Tax levied on water",
		title:"Tax -"
	}
];

function action_PSA()
{
	money -= 10000;
	clean_water += 0.01 * num_of_citizens;
	
	add_alert("It cost some money, but you have reduced citizen water usage");
}

function action_WaterTreatment()
{
	money_rate -= 20000;
	clean_water_rate += 2000;
	dirty_water_rate -= (2000 + dirtiness);
	
	add_alert("Water Treatment Plant Built!");
}

function action_RWH()
{
	factor = (Math.random() * 0.3 + 0.1);
	clean_water_rate += 0.001 * rain * factor;
	
	add_alert("You have encouraged " + Math.round(factor*100) + "% people to consider Rain Water Harvesting");
}

function action_TaxIncrease()
{
	money_rate += 12 * num_of_citizens;
	add_alert("Tax Rate increased by 1%");
}

function action_TaxDecrease()
{
	money_rate -= 12 * num_of_citizens;
	add_alert("Tax Rate decreased by 1%");
}

//--

var temporal_actions = [
	{
		type:"Factory",
		text:"Set-up a new factory?",
		title:"Factory"
	},
	{
		type:"Festival",
		text:"The citizens want to conduct a festival. Allow?",
		title:"Festival"
	},
	{
		type:"Tree",
		text:"Organize a Tree-Plantation Drive?",
		title:"Tree Plantation"
	},
	{
		type:"Tubewell",
		text:"Construct a tube-well?",
		title:"Tubewell"
	},
	{
		type:"Neighbour",
		text:"A neighbouring city wants water. Give?",
		title:"Neighbour Aid"
	}
];

function action_Factory(val)
{
	if (val == 1)
	{
		money += 50000;
		money_rate += 20000;
		dirtiness += 50;
		num_of_citizens += 100;
		add_alert("Factory Built! You have attracted 100 people to your city. And you got a lot of money to boot!");
	}
	else
	{
		add_alert("Factory proposal rejected! You have kept the water from getting dirtier!");
	}
}

function action_Festival(val)
{
	if (val == 1)
	{
		clean_water -= 15 * num_of_citizens;
		add_alert("You have given citizens a chance to enjoy. Sometimes, wasting water increases human happiness.");
	}
	else
	{
		add_alert("Clean water should not be wasted for something as frivolous as this!");
	}
}

function action_Tree(val)
{
	if (val == 1)
	{
		money -= 10;
		dirty_water_rate += 1000;
		dirtiness -= 0.05;
	}
	else (val == 1)
	{
	}
}

function action_Tubewell(val)
{
	if (val == 1)
	{
	}
	else
	{
	}
}

function action_Neighbour(val)
{
	if (val == 1)
	{
	}
	else
	{
	}
}

//---

var events = [
	{
		type:"Tax",
		text:"The national government is levying a tax on the amount of dirty water",
		title:"National Tax"
	},
	{
		type:"Rain",
		text:"Unexpected, heavy downpour.",
		title:"Rain"
	},
	{
		type:"Fire",
		text:"Fire in the city.",
		title:"Fire"
	},
	{
		type:"Draught",
		text:"An unexpected draught hits the area.",
		title:"Draught"
	}
];

function event_Tax()
{
}

function event_Rain()
{
	dirty_water += 10;
}

function event_Fire()
{
	dirty_water -= 4;
}

function event_Draught()
{
	clean_water -= 10;
	dirty_water -= 20;
}

