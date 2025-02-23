let arik_js_utils = {
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
    handleCollapseIndicatorSpecific: function (collapse_target_id, collapse_indicator_id, classes) {
        // Bootstrap Collapse Indicator
        // If no classes are provided, this function can automatically detect whether font-awesome or bootstrap icons are used
        // Classes must be a JSON object containing a "collapsed" reference and an "expanded" reference. Both must be strings
        if (!classes || (classes.package && classes.package !== "font-awesome" && classes.package !== "bootstrap")) {
            // attempt to auto-detect which font-based-icon package is used
            classes = {
                collapsed: ($(collapse_indicator_id).hasClass('fa')) ? 'fa-plus' : 'glyphicon-plus',
                expanded: ($(collapse_indicator_id).hasClass('fa')) ? 'fa-minus' : 'glyphicon-minus'
            };
        } else if (classes.package) {
            if (classes.package === 'font-awesome') {
                classes = {
                    collapsed: 'fa-plus',
                    expanded: 'fa-minus'
                }
            } else if (classes.package === 'bootstrap') {
                classes = {
                    collapsed: 'glyphicon-plus',
                    expanded: 'glyphicon-minus'
                }
            }
        }
        $(collapse_target_id).on('show.bs.collapse', function () {
            // About to expand. Change to minus sign.
            $(collapse_indicator_id).removeClass(classes.collapsed);
            $(collapse_indicator_id).addClass(classes.expanded);
        });
        $(collapse_target_id).on('hide.bs.collapse', function () {
            // About to collapse. Change to plus sign.
            $(collapse_indicator_id).removeClass(classes.expanded);
            $(collapse_indicator_id).addClass(classes.collapsed);
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
    },
    formatSecondsAsHoursMinsAndSecs: function(secs){
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
    
        if(secs < 60){ // less than a minute
            return secs;
        } else if (secs < (60*60)){ // less than an hour
            minutes = Math.floor(secs/60);
            seconds = secs - (minutes*60);
            return `${minutes}:${leadingZero(seconds)}`;
        } else { //hour and up
            hours = Math.floor(Math.floor(secs/60)/60);
            minutes = Math.floor((secs - (hours*60*60))/60);
            seconds = secs - (hours*60*60) - (minutes*60);
            return `${hours}:${leadingZero(minutes)}:${leadingZero(seconds)}`;
        }
    },
    toast: function(message, alertType) {
        let toastContainer = document.getElementById("my-toast-container");
        if(toastContainer === null){
            let tctemplate = `<!--Toast Container-->
            <div id="my-toast-container" class="toast-container position-fixed bottom-0 end-0 p-3"></div>`;
            $('body').append(tctemplate);
        }
        let bg_class = "";
        let txt_class= "";
        let closeBtnColor = "";
        if(alertType === undefined){
            alertType = "light";
        }
        if(alertType.trim().toLowerCase() === 'primary'){
            bg_class = "bg-primary";
            txt_class= "text-white";
            closeBtnColor = "btn-close-white";
        } else if(alertType.trim().toLowerCase() === 'secondary'){
            bg_class = "bg-secondary";
            txt_class= "text-white";
            closeBtnColor = "btn-close-white";
        } else if(alertType.trim().toLowerCase() === 'success'){
            bg_class = "bg-success";
            txt_class= "text-white";
            closeBtnColor = "btn-close-white";
        } else if(alertType.trim().toLowerCase() === 'danger'){
            bg_class = "bg-danger";
            txt_class= "text-white";
            closeBtnColor = "btn-close-white";
        } else if(alertType.trim().toLowerCase() === 'warning'){
            bg_class = "bg-warning";
        } else if(alertType.trim().toLowerCase() === 'info'){
            bg_class = "bg-info";
        } else if(alertType.trim().toLowerCase() === 'light'){
            bg_class = "bg-light";
        } else if(alertType.trim().toLowerCase() === 'dark'){
            bg_class = "bg-dark";
            txt_class= "text-white";
            closeBtnColor = "btn-close-white";
        }
    
        let now = new Date();
        let template = `<div class="toast align-items-center ${bg_class} ${txt_class} animate__animated animate__slideInRight animate__faster" 
            role="alert" aria-live="assertive" aria-atomic="true" id="toast_${Date.now()}">
            <div class="d-flex">
                <div class="toast-body" style="font-size:16px;">
                    ${message}
                </div>
                <button type="button" class="btn-close ${closeBtnColor} me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>`;
        $('#my-toast-container').append(template);
        let toastOptions = {};
        let toastElList = [].slice.call(document.querySelectorAll('.toast'))
        let toastList = toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl, toastOptions)
        });
        toastList.forEach(toast => {
            toast.show();
            let myToastEl = document.getElementById(toast._element.id);
            myToastEl.addEventListener('hide.bs.toast', function () {
                myToastEl.classList.remove("animate__slideInRight");
                myToastEl.classList.add("animate__slideOutUp");
                myToastEl.classList.add("animate__faster");
            });
            myToastEl.addEventListener('hidden.bs.toast', function () {
                myToastEl.remove();
            });
        });
    },
    formatLongNumberString: function(numberString) {
        if(numberString!==undefined){
            return numberString.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
        return numberString;
    }
}

if (typeof jQuery === 'undefined') {
    throw new Error('arik_js_utils.js requires jQuery');
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

// Animate.css javascript function
// Retrieved from https://github.com/daneden/animate.css
// To use this function:
// $('#yourElement').animateCss('bounce');
// $('#yourElement').animateCss('bounce').then(function(result){
//      console.log("Animation Complete");
// };
// let result = await $('#yourElement').animateCss('bounce');
$.fn.extend({
    animateCss: function (animationName, options) {
        options = options || {};
        options.delay = options.delay || 0;
        options.waitForInvisible = options.waitForInvisible || false;
        let _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    if(!$(_this).is(":visible")){
                        if(options.waitForInvisible){
                            console.warn("Animation target not visible or doesn't exist. Promise chain will wait for this element to continue.")
                        } else {
                            console.warn("Animation on invisible element skipped!");
                            resolve(_this);
                            return;
                        }
                    }
                    let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                    _this.addClass('animated ' + animationName).one(animationEnd, function () {
                        $(_this).removeClass('animated ' + animationName);
                        resolve(_this);
                    });
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            }, options.delay);
        });
    }
});