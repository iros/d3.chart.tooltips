# d3.chart.tooltip

d3.chart.tooltip is a mixin-intended chart that allows you to add tooltips to an
exiting chart by using them both in a parent chart constructor as mixins. See
sample use below or the example in the `example` folder.

This tooltip implementation borrows heavily from this block:
http://bl.ocks.org/biovisualize/2973775

### Sample Use

For example, given the `CircleChart` defined [here](http://misoproject.com/d3-chart/), 
we can create a tooltiped version like so:

```javascript
d3.chart("HoverableCircles", {
  initialize: function() {

    // create containers for the circles and tooltip
    // note that the tooltip is appended to the body.
    var circleBase = this.base.append("g")
      .classed("circles-mixin", true);
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
  return "<b>" + d + "</b>";
});

// render it with some data
chart.draw([1,4,6,9,12,13,30]);
```

### API

Sample API Documentation:

#### `<instance>.text(fn)`

**Description:**

Instructs the tooltip chart what function to use to render the tooltip.
It expects the datum and index paramaters.

**Parameters:**

* `fn` - The function to call in order to render the tooltip contents.

**Uses:**

Example:

```javascript
var chart = d3.select("#vis")
  .append("svg")
  .attr("height", 60)
  .attr("width", 600)
  .chart("HoverableCircles");

chart.tooltips.text(function(d) {
  return "<b>" + d + "</b>";
});
```

### Events

There are no events currently broadcast by this chart.