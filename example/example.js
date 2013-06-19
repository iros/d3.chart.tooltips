/* global d3 */
(function() {
  d3.chart("CircleChart", {

  initialize: function() {
    // create a layer of circles that will go into
    // a new group element on the base of the chart
    this.layer("circles", this.base.append("g"), {

      // select the elements we wish to bind to and 
      // bind the data to them.
      dataBind: function(data) {
        return this.selectAll("circle")
          .data(data);
      },

      // insert actual circles
      insert: function() {
        return this.append("circle");
      },

      // define lifecycle events
      events: {

        // paint new elements, but set their radius to 0
        // and make them red
        "enter": function() {
          return this.attr("cx", function(d) {
            return d * 15;
          })
          .attr("cy", 30)
          .attr("r", 0)
          .style("fill", "red");
        },
        // then transition them to a radius of 5 and change
        // their fill to blue
        "enter:transition": function() {
          return this
            .delay(500)
            .attr("r", 15)
            .style("fill", "blue");
        }
      }
    });
  }
});

d3.chart("HoverableCircles", {
  initialize: function() {
    var circleBase = this.base.append("g").classed("circles-mixin", true);
    var tooltipBase = d3.select("body");

    this.circles = this.mixin("CircleChart", circleBase);
    this.tooltips = this.mixin("TooltipMixinChart", tooltipBase, {
      layer : this.circles,
      type : "circle"
    });

    return this;
  }
});

// create an instance of the chart on a d3 selection
var chart = d3.select("#vis")
  .append("svg")
  .attr("height", 60)
  .attr("width", 600)
  .chart("HoverableCircles");

chart.tooltips.text(function(d) {
  return "<b style='background-color:white; padding:5px; border: 1px solid #eee;'>" +
      d + "</b>";
});

// render it with some data
chart.draw([1,4,6,9,12,13,30]);
}());