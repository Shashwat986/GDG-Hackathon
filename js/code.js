var intervalID;

function init()
{
	per_year();
	$(document).ready(function(){
		intervalID = window.setInterval(per_year,10000);
	});
}

function load()
{
    // Display
    $("#money")             .html("" + Math.round(money * 100) / 100);
    $("#dirty_water")       .html("" + Math.round(dirty_water * 100) / 100);
    $("#clean_water")       .html("" + Math.round(clean_water * 100) / 100);
    $("#num_of_citizens")   .html("" + Math.round(num_of_citizens * 100) / 100);
}

function per_year()
{
    dirty_water+=rain;
    
    money_rate += 6000 * num_of_citizens;
    money += money_rate;
    money_rate = 0;
    
    clean_water += clean_water_rate;
    
    load();
    
    check_victory();
    if (lost == 1)
    {
        $("#content").html('<div class="alert alert-danger" role="alert"><strong>Sorry!</strong> You Lose.</div>');
    }
    if (lost == -1)
    {
        $("#content").prepend('<div class="alert alert-success" role="alert"><strong>You Win!</strong> You survived 100 years! Congratulations!</div>');
    }
}
    
function temp()
{
    // New random action
    if (Math.random() < 0.5){
        var val = Math.floor(Math.random() * actions.length);
        action = actions[val].type;
        txt = actions[val].text;
        add_action(action,txt,"action_"+action+"()");
    }
    
    // New random event
    if (Math.random() < 0.8){
        var val = Math.floor(Math.random() * events.length);
        evnt = events[val].type;
        txt = events[val].text;
        add_event(evnt,txt,"event_"+evnt+"()");
    }
}

function add_alert(txt,type)
{
    if (typeof type === "undefined")
        type="info";
    type = "alert-"+type
    
    $("#alert").html(txt);
    $("#alert").removeClass().addClass("alert").addClass(type);
    $("#alert").delay(2000).queue(function(n){
        $(this).html("").removeClass(type);
        n();
    });
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
    if (num_years >= 100)
	lost = -1;
}
    
function add_action(title, txt, url)
{
    if (typeof txt === "undefined")
        txt = "";
    if (typeof url === "undefined")
        url = "#";
    $("#optionallog").prepend('<li class="list-group-item"><h4 class="list-group-item-heading">'+title+'</h4><p class="list-group-item-text">'+txt+'</p><button type="button" class="btn btn-primary" onclick="'+url+';$(this).parent().hide();">Go</button></li>');
    load();
}

function add_event(title, txt, url)
{
    eval(url);
    $("#eventlog").prepend('<li class="list-group-item"><b>'+title+'</b>: '+txt+'</li>');
    load();
}
