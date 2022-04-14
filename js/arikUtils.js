let arikUtils = {
	addTemporarySpinner: function(el) {
		if (!$(el).attr("disabled")) {
			let spinner_template = `<!--Temporary Spinner-->
        <i class="fa fa-spinner fa-pulse mr-2 temporary_spinner"></i>`;
			$(el).prepend(spinner_template);
			$(el).attr("disabled", true);
		}
	},
	getUrlParameter: function(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		let results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	},
	handleCollapseIndicators: function(target_id, indicator_id) {
		if (target_id[0] !== "#")
			target_id = "#" + target_id;
		if (indicator_id[0] !== "#")
			indicator_id = "#" + indicator_id;
		$(target_id).on('show.bs.collapse', function() {
			$(indicator_id).removeClass('fa-plus');
			$(indicator_id).addClass('fa-minus');
		});
		$(target_id).on('hide.bs.collapse', function() {
			$(indicator_id).addClass('fa-plus');
			$(indicator_id).removeClass('fa-minus');
		});
	},
	removeTemporarySpinner: function(el) {
		$(el).attr("disabled", false);
		$(el).find('.temporary_spinner').remove();
	},
	sleep: function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},
    formatDateTimeString: function(date, format){
        if(date === null || date === undefined)
            date = new Date();
        let map = {
            MM: this.leadingZero(date.getMonth() + 1),
            M: date.getMonth() + 1,
            dd: this.leadingZero(date.getDate()),
            d: date.getDate(),
            DD: this.leadingZero(date.getDate()),
            D: date.getDate(),
            yy: this.leadingZero(date.getFullYear().toString().slice(-2)),
            YY: this.leadingZero(date.getFullYear().toString().slice(-2)),
            yyyy: this.leadingZero(date.getFullYear()),
            YYYY: this.leadingZero(date.getFullYear()),
            HH: this.leadingZero(date.getHours()),
            H: date.getHours(),
            hh: this.leadingZero((date.getHours() > 12)? date.getHours()-12 : date.getHours()),
            h: (date.getHours() > 12)? date.getHours()-12 : date.getHours(),
            mm: this.leadingZero(date.getMinutes()),
            m: date.getMinutes(),
            ss: this.leadingZero(date.getSeconds()),
            s: date.getSeconds(),
            a: (date.getHours() >= 12)? 'pm' : 'am',
            A: (date.getHours() >= 12)? 'PM' : 'AM'
        }
        if(map['hh']===0){
            map['hh'] = 12;
        }
        let formattedDateTime = format.replace(/YYYY|yyyy|YY|yy|MM|M|DD|D|dd|d|HH|H|hh|h|mm|m|ss|s|A|a/gi, matched => map[matched]);
        return formattedDateTime;
    },
    leadingZero: function(num){
        if(num < 10){
            return '0'+num;
        }
        return num;
    }
}
// Date.prototype.isDST = function() {
//     let daylight = new Date(this.getFullYear(), 7, 1);
//     return this.getTimezoneOffset() === daylight.getTimezoneOffset();
// };

Date.prototype.stdTimezoneOffset = function() {
	var jan = new Date(this.getFullYear(), 0, 1);
	var jul = new Date(this.getFullYear(), 7, 1);
	return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }
  
  Date.prototype.isDST = function() {
	return this.getTimezoneOffset() !== this.stdTimezoneOffset();
  }