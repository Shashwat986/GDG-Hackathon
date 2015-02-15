/*
Variables:
money, money_rate, clean_water, clean_water_rate, dirty_water, dirty_water_rate, rain,
dirtiness, num_of_citizens, citizen_water_usage, citizen_happiness, lost, num_years
*/

var actions = [
	{
		type:"Factory",
		text:"Add a new factory"
	},
	{
		type:"Festival",
		text:"Allow citizens to play with water"
	},
	{
		type:"Tree",
		text:"Organize a Tree-Plantation Drive"
	},
	{
		type:"PSA",
		text:"Public Service Announcement to save water"
	},
	{
		type:"WaterTreatment",
		text:"Set-up a water treatment plant"
	},
	{
		type:"RWH",
		text:"Set up rain-water harvesting in applicable areas"
	},
	{
		type:"TaxIncrease",
		text:""
	},
	{
		type:"TaxDecrease",
		text:""
	},
	{
		type:"Tubewell",
		text:""
	},
	{
		type:"Neighbour",
		text:""
	}
];

function action_Factory(val)
{
    money += 50000;
    money_rate += 20000;
    dirtiness += 50;
    num_of_citizens += 100;
    
    add_alert("Factory Built! You have attracted 100 people to your city. And you got a lot of money to boot!");
}

function action_Festival(val)
{
    if (val==1)
        clean_water -= 15 * num_of_citizens;
}

function action_Tree(val)
{
    money -= 10;
    dirty_water_rate += 1000;
    dirtiness -= 0.05;
}

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

function action_Tubewell(val)
{
}

function action_Neighbour(val)
{
}

//---

var events = [
	{
		type:"Tax",
		text:"Tax is levied on water"
	},
	{
		type:"Rain",
		text:"Unexpected heavy downpour"
	},
	{
		type:"Fire",
		text:"Fire Incidents"
	},
	{
		type:"Draught",
		text:"Draught hits the area"
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

