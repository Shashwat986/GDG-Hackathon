var money= 50;
var clean_water=50;
var dirty_water=50;
var num_of_citizens = 50;
var citizen_water_usage = 5;
var dirty_water_rate = 0;
var clean_water_rate = 0;
var money_rate = 0;
var rain = 300;

var actions = ["factory" , "festival" ];


function action_taken(money_consumption,clean_water_consumption,dirty_water_consumption)
{
    money_rate += money_consumption;
    dirty_water_rate += dirty_water_consumption;
    clean_water_rate += clean_water_consumption;
}
function return_random()
{
    var mon =100*(Math.floor((Math.random() * 10) + 1));
    var dir_wat = 100*(Math.floor((Math.random() * 10) + 1));
    var clean_wat = 100*(Math.floor((Math.random() * 10) + 1));
    return {mon:mon,dir_wat:dir_wat,clean_wat:clean_wat};
}
function action_waterTreatment()
{
    money -= 10;
    cleanwater += 10;
}
function action_tree()
{
    money -= 10;
    rain += 10;
}

function action_PSA()
{
    money -= 20;
    citizen_water_usage -= 1;
}







function add_event(text)
{
    $("#eventlog").append('<li class="list-group-item">'+text+'</li>');
    
}


