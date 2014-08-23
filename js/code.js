var money = 50;
var clean_water = 0;
var dirty_water = 500;
var dirtiness = 0.2;
var num_of_citizens = 50;
var citizen_water_usage = 5;
var citizen_happiness = 0.5;
var dirty_water_rate = 0;
var clean_water_rate = 0;
var money_rate = 0;
var rain = 300;
var lost = 0;
var num_years = 0;
var ctr = 0;

var actions = ["factory", "festival", "tree", "PSA"];
var events = ["tax", "rain"];

function load()
{
    $("#money").html(""+money);
    $("#dirty_water").html(""+dirty_water);
    $("#clean_water").html(""+clean_water);
    $("#num_of_citizens").html(""+num_of_citizens);
}

function per_year()
{
    load();
    check_victory();
    if(lost == 1)
    {
        $("#content").html('<div class="alert alert-danger" role="alert"><strong>Sorry!</strong> You Lose.      </div>');
        
    }
}

function event_tax()
{
    money_rate += 0.1;
}

function event_rain()
{
    dirty_water += 10;
}

function action_waterTreatment()
{
    money -= 10;
    clean_water_rate += 10;
    dirty_water_rate -= 10;
    dirtiness -= 0.05;
}

function action_tree()
{
    money -= 10;
    rain += 10;
    dirtiness -= 0.05;
}

function action_PSA()
{
    money -= 20;
    citizen_water_usage -= 1;
}

function action_factory()
{
    money += 10;
    money_rate += 1;
    dirtiness += 0.1;
    num_of_citizens += 10;
}

function check_victory()
{
    if (money < 0)
        lost = 1;
    if (dirty_water < 0)
        lost = 1;
    if (clean_water < num_of_citizens * citizen_water_usage)
        lost = 1;
}
    




function add_event(text)
{
    $("#eventlog").append('<li class="list-group-item">'+text+'</li>');
}


