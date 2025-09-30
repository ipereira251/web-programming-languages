'use strict';

class DatePicker {
    constructor(id, fn){
        this.id = id;
        this.fn = fn;
    }

    changeMonth(num, dateObj){
        if(num === -1){
            const prev = new Date(dateObj.getFullYear(), dateObj.getMonth() - 1, 1);
            this.render(prev);
        } else if(num === 1){
            const next = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1);
            this.render(next);
        }
    }
    selectDate(date, dateObj){
        var selectedDate = {
        year: dateObj.getFullYear(), month: DatePicker.getMonthText(dateObj.getMonth()), day: date
        };
        this.fn(this.id, selectedDate);
    }
    //render(Date obj)
    render(dateObj) {
        //small 1 month calendar in the div
        const div = document.getElementById(this.id);
        div.innerHTML = "<div class='calendar'> <div class='cal-header'>" + 
                        "<a class='left' id='left-button-" + this.id + "'>< </a> <h2>" +
                        DatePicker.getMonthText(dateObj.getMonth()) +  " " + dateObj.getFullYear() + 
                        "</h2><a class='right' id='right-button-" + this.id + "'> ></a> </div>" + 
                        "<div class='cal-body'><div class='weekdays'><h3 class='weekday'>Su</h3> " + 
                        "<h3 class='weekday'>Mo</h3> <h3 class='weekday'>Tu</h3> " + 
                        "<h3 class='weekday'>We</h3> <h3 class='weekday'>Th</h3> " + 
                        "<h3 class='weekday'>Fr</h3> <h3 class='weekday'>Sa</h3> </div>" +
                        "<div class='dates'>" + this.createDates(dateObj) + 
                        "</div> </div> </div";
        
        const left = document.getElementById("left-button-" + this.id);
        left.addEventListener("click", () => {this.changeMonth(-1, dateObj);});

        const right = document.getElementById("right-button-" + this.id);
        right.addEventListener("click", () => {this.changeMonth(1, dateObj);});

        const dates = document.querySelectorAll(".date.curr." + this.id);
        dates.forEach(date => {
            date.addEventListener("click", () => {this.selectDate(date.textContent, dateObj);});
        });
    }
    
    static getMonthText(month){
        switch(month){
            case 0: return "Jan";
            case 1: return "Feb";
            case 2: return "Mar";
            case 3: return "Apr";
            case 4: return "May";
            case 5: return "Jun";
            case 6: return "Jul";
            case 7: return "Aug";
            case 8: return "Sept";
            case 9: return "Oct";
            case 10: return "Nov";
            case 11: return "Dec";
            default: return "Month";
        }
    }
    
    createDates(dateObj){
        var ret = "";
        //setup for first of month
        const first = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
        //add days from previous month
        ret += this.prevDates(first.getDay(), first);
        ret +="<div class='date curr " + this.id + "'>1</div>";

        //continue with dates after the first
        var lastDay = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
        for(let i = 2; i <= lastDay.getDate(); i++){
            ret += "<div class='date curr " + this.id + "'>" + i + "</div>";
        }

        //dates after current month
        ret += this.nextDates(6 - lastDay.getDay(), lastDay);
        return ret;
    }
    prevDates(num, first){
        var ret = "";
        for(let i = num; i > 0; i--){
            const prev = new Date(first.getFullYear(), first.getMonth(), -i + 1);
            ret += "<div class='date prev " + this.id + "'>" + prev.getDate() + "</div>";
        }
        return ret;
    }
    nextDates(num, last){
        var ret = "";
        for(let i = 1; i <= num; i++){
            const next = new Date(last.getFullYear(), last.getMonth() + 1, i);
            ret += "<div class='date next " + this.id + "'>" + next.getDate() + "</div>";
            //console.log("<div class='date post'>" + prev.getDate() + "</div>");
        }
        return ret;
    }
}