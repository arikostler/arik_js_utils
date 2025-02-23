$('document').ready(function(){
	console.log("jQuery is ready");

	$('#start_date_time').val(arikUtils.formatDateTimeString(new Date(), 'yyyy-MM-ddTHH:mm'));
	$('#end_date_time').val(arikUtils.formatDateTimeString(new Date(), 'yyyy-MM-ddTHH:mm'));
});

function calculateTimeBetween(start, end) {
	let duration = moment.duration(moment($(end).val()).diff(moment($(start).val())))

	let years = duration.years();
	let months = duration.months();
	let days = duration.days();
	let hours = duration.hours();
	let minutes = duration.minutes();

	$('#years').text(years);
	$('#months').text(months);
	$('#days').text(days);
	$('#hours').text(hours);
	$('#minutes').text(minutes);

	$('#years').parent().css('background-color', (years>0)?'white':'lightgray');
	$('#months').parent().css('background-color', (months>0)?'white':'lightgray');
	$('#days').parent().css('background-color', (days>0)?'white':'lightgray');
	$('#hours').parent().css('background-color', (hours>0)?'white':'lightgray');
	$('#minutes').parent().css('background-color', (minutes>0)?'white':'lightgray');
}

function sinceMyFirstDay(){
	$('#start_date_time').val("2020-01-01T00:00");
}