
// var d1 = new Date('Thu Nov 18 2015 11:49:23 +0000');
// var d2 = new Date('Thu Nov 19 2015 11:49:23 +0000');

// TimeDifference.daysDifference(d2,d1);
// TimeDifference.hoursDifference(d2,d1);

(function () {
  'use strict';

  var TimeDifference = TimeDifference || {};

  TimeDifference = {
    hours : 1000*60*60,
    day : 1000*60*60*24,

    daysDifference: function(oldDate,newDate){
      var difference = oldDate.getTime() - newDate.getTime();
      return  Math.floor(difference/(this.day));
    },

    hoursDifference:function(oldDate,newDate){
      var difference = oldDate.getTime() - newDate.getTime();
      return Math.floor(difference)/(this.hours);
    },
  };
  window.TimeDifference = TimeDifference;
})();

/*===========================
TimeDifference AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
  module.exports = window.TimeDifference;
}
else if (typeof define === 'function' && define.amd) {
  define([], function () {
      'use strict';
      return window.TimeDifference;
  });
}


