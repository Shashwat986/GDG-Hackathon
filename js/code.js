var maxTime = 20;	// (seconds)
var minTime = 8;	// (seconds)
var yearTime = 20;	// (seconds)

var intervalID;
var temporalID;
var temporal_timers = []

function init()
{
	per_year();
	set_constant_options();
	$(document).ready(function(){
		intervalID = window.setInterval(loader,yearTime*200);	// 1000/5
		temporalID = window.setInterval(timers,500);
	});
}

function timers()
{
	for (i=temporal_timers.length-1 ; i>=0 ; i--)
	{
		id = temporal_timers[i].id;
		time = temporal_timers[i].time;
		orig = temporal_timers[i].orig;
		if (time < 0)
			continue;
		temporal_timers[i].time -= 0.5
		time -= 0.5
		$(id).css("width",""+(Math.round(time*100/orig))+"%");
		$(id).html(""+Math.round(time));
		if (time < 0)
		{
			$(id).parent().parent().parent().parent().hide();
		}
	}
}

function loader()
{
	if (Math.abs(num_years - Math.round(num_years)) < 0.1)
	{
		num_years = Math.round(num_years);
		per_year();
	}

	new_random_incidents();
	change_display();

	num_years += 0.2;
	//console.log(num_years);
}

function per_year()
{
    dirty_water+=rain;
    
    money_rate += 6000 * num_of_citizens;
    money += money_rate;
    money_rate = 0;
    
    clean_water += clean_water_rate;
    
    change_display();
    
    check_victory();
    if (lost == 1)
    {
        $("#content").html('<div class="alert alert-danger" role="alert"><strong>Sorry!</strong> You Lose. <a href="index.html">Retry?</a> </div>');
	window.clearInterval(intervalID);
    }
    if (lost == -1)
    {
        $("#content").prepend('<div class="alert alert-success" role="alert"><strong>You Win!</strong> You survived 100 years! Congratulations!</div>');
	window.clearInterval(intervalID);
    }
}
    
function change_display()
{
    $("#money")             .html("" + Math.round(money * 100) / 100);
    $("#dirty_water")       .html("" + Math.round(dirty_water * 100) / 100);
    $("#clean_water")       .html("" + Math.round(clean_water * 100) / 100);
    $("#num_of_citizens")   .html("" + Math.round(num_of_citizens * 100) / 100);
    $("#num_years")         .html("" + Math.round(num_years));

    $("#log_div").css("height",$("#activitylog").css("height"));
    $("#optionallog").css("height",$("#activitylog").css("height"));
}

function set_constant_options()
{
	for (i = 0; i < persistent_actions.length; i++)
	{
		add_persistent_action(persistent_actions[i].title,
			persistent_actions[i].text,
			"action_"+persistent_actions[i].type);
	}
}

function new_random_incidents()
{
    // New random action
    if (Math.random() > 0.4){
        var val = Math.floor(Math.random() * temporal_actions.length);
        action = temporal_actions[val].type;
        txt = temporal_actions[val].text;
	title = temporal_actions[val].title;
        add_temporal_action(title,txt,"action_"+action);
	console.log(title);
    }
    
    // New random event
    if (Math.random() > 0.8){
        var val = Math.floor(Math.random() * events.length);
        evnt = events[val].type;
        txt = events[val].text;
	title = events[val].title;
        add_event(title,txt,"event_"+evnt);
	console.log(title);
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
	add_event_log(txt);
        n();
    });
    change_display();
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

function add_persistent_action(title, txt, url)
{
    if (typeof title === "undefined")
        title = "";
    if (typeof txt === "undefined")
        txt = "";
    if (typeof url === "undefined")
        url = "#";
    $("#activitylog").append('<li class="list-group-item">'
		+ '<h4 class="list-group-item-heading">'
		+ title + '</h4>'
		+ '<p class="list-group-item-text">' + txt + '</p>'
		+ '<button type="button" class="btn btn-primary" onclick="'
		+ url + '();">Go</button>'
	+ '</li>');
    change_display();
}
   
function add_temporal_action(title, txt, url)
{
    if (typeof title === "undefined")
        title = "";
    if (typeof txt === "undefined")
        txt = "";
    if (typeof url === "undefined")
        url = "#";
    // Need to make it temporal. Need to add timeout code.
    t_time = Math.round(Math.random()*(maxTime-minTime) + minTime);
    t_id = "temporal_"+temporal_timers.length;

    temporal_timers.push({
		id: "#"+t_id,
		time: t_time,
		orig: t_time
	});

    $('<li class="list-group-item">'
		+ '<h4 class="list-group-item-heading">'+title+'</h4>'
		+ '<p class="list-group-item-text">'+txt+'</p>'
		+ '<div class="row">'
			+ '<div class="col-sm-2">'
			+ '<button type="button" class="btn btn-success" onclick="'
			+ url + '(1);$(this).parent().parent().parent().hide();">Yes</button>'
			+ '</div><div class="col-sm-2">'
			+ '<button type="button" class="btn btn-danger" onclick="'
			+ url + '(0);$(this).parent().parent().parent().hide();">No</button>'
			+ '</div>'
			+ '<div class="col-sm-7 col-sm-offset-1">'
			+ '<div class="progress">'
				+ '<div class="progress-bar" id="'
				+ t_id + '" style="width:100%" role="progressbar">'
				+ t_time + '</div>'
			+ '</div>'
			+ '</div>'
		+ '</div'
	+ '</li>').hide().prependTo("#optionallog").fadeIn();
    change_display();
}

function add_event(title, txt, url)
{
    if (typeof title === "undefined")
        title = "";
    if (typeof txt === "undefined")
        txt = "";
    if (typeof url === "undefined")
        url = "";
    eval(url);
    add_event_log('<strong>'+title+'</strong>: '+txt);
    change_display();
}

function add_event_log(txt)
{
    $('<li class="list-group-item">' + txt + '</li>').hide().prependTo("#eventlog").fadeIn("slow");
}

function toggle_time()
{
	if (typeof intervalID === "undefined" || intervalID === -1)
	{
		$("#time_toggler").addClass("alert-success progress-bar-striped");
		$("#time_toggler").removeClass("alert-danger");
		intervalID = window.setInterval(loader, 2000);
	}
	else
	{
		$("#time_toggler").addClass("alert-danger");
		$("#time_toggler").removeClass("alert-success progress-bar-striped");
		window.clearInterval(intervalID);
		intervalID = -1;
	}
}
