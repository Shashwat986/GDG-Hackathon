var money = 0;
var money_rate = 6000; // Tax @ 50 per person per month
var clean_water = 1000;
var clean_water_rate = 0;
var dirty_water = 7000000;  // kLD
var dirty_water_rate = 0;
var rain = 1000000;

var dirtiness = 200;
var num_of_citizens = 1000; // 4000000
var citizen_water_usage = 0.077;
var citizen_happiness = 0.5;

var lost = 0;
var num_years = 0;
var ctr = 0;

var actions = ["Factory", "Festival", "Tree", "PSA", "WaterTreatment", "RainWaterHarvesting"];
var actions_txt = ["Add a new factory","Allow citizens to play with water","Plant trees","Public service announcement to save water","Set-up a water treatment plant","Setting up rain water harvesting"];

var events = ["Tax", "Rain", "Fire"];
var events_txt = ["Tax is levied on water","Unexpectedly heavy downpour","Fire Incidents"];

function load()
{    
    // Display
    $("#money").html(""+money);
    $("#dirty_water").html(""+dirty_water);
    $("#clean_water").html(""+clean_water);
    $("#num_of_citizens").html(""+num_of_citizens);
}

function per_year()
{
    dirty_water+=rain;
    
    money_rate += 6000 * num_of_citizens;
    money+=money_rate;
    money_rate = 0;
    
    clean_water += clean_water_rate;
    
    load();
    
    check_victory();
    if (lost == 1)
    {
        $("#content").html('<div class="alert alert-danger" role="alert"><strong>Sorry!</strong> You Lose.      </div>');
    }
}
    
function temp()
{
    // New random action
    if (Math.random() < 0.5){
        var val = Math.floor(Math.random() * actions.length);
        action = actions[val];
        txt = actions_txt[val];
        add_action(action,txt,"action_"+action+"()");
    }
    
    // New random event
    if (Math.random() < 0.8){
        var val = Math.floor(Math.random() * events.length);
        event = events[val];
        txt = events_txt[val];
        add_event(event,txt,"event_"+event+"()");
    }
}

function action_WaterTreatment()
{
    money_rate -= 20000;
    clean_water_rate += 2000;
    dirty_water_rate -= (2000 + dirtiness);
    
    add_alert("Water Treatment Plant Built!");
}

function action_PSA()
{
    money -= 10000;
    clean_water += 0.01 * num_of_citizens;
    
    add_alert("It cost some money, but you have reduced citizen water usage");
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

function action_RWHIncrease()
{
    factor = (Math.random() * 0.3 + 0.1);
    clean_water_rate += 0.001 * rain * factor;
    
    add_alert("You have encouraged "+factor*100+"% people to consider Rain Water Harvesting");
}

//---

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

function action_Tubewell(val)
{
}

function action_Neighbour(val)
{
}

//---

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

//---

function add_alert(txt)
{
    $("#alert").html(txt);
    $("#alert").fadeIn(200).delay(1000).fadeOut(200);
    load();
}

function check_victory()
{
    if (money < 0)
        lost = 1;
    if (dirty_water < 0 && clean_water < 0)
        lost = 1;
    if (clean_water < num_of_citizens * citizen_water_usage)
        lost = 1;
}
    
function add_action(title, txt="", url="#")
{
    $("#optionallog").prepend('<li class="list-group-item"><h4 class="list-group-item-heading">'+title+'</h4><p class="list-group-item-text">'+txt+'</p><button type="button" class="btn btn-primary" onclick="'+url+';$(this).parent().hide();">Go</button></li>');
    load();
}

function add_event(title, txt, url)
{
    eval(url);
    $("#eventlog").prepend('<li class="list-group-item"><b>'+title+'</b>: '+txt+'</li>');
    load();
}
