/* global d3 */
d3.chart("TooltipMixinChart", {
  initialize: function(options) {
    options = options || {};

    var _errors = {
      noText : "You need to call .text on your tooltip mixin " +
                  "and provide it a rendering function!"
    };

    // Options must contain a layer onto which the tooltips will be added.
    this.tooltipedLayer = options.layer;
    this.tooltipedSelectionType = options.type;

    // The base should be the body!
    var tooltipBase = this.base
      .append("div")
      .classed("tooltip", true);

    this.layer("tooltips", tooltipBase, {
      dataBind: function() {

        // we only want to bind one data element to it
        // so the original data doesn't even matter
        // but we do need to create one element for it.
        return this.selectAll("div")
          .data([true]);
      },

      insert: function() {
        return this.append("div");
      },

      events : {
        enter : function() {
          var chart = this.chart();
          var tooltip = this;

          // find all the elements that we are listening to
          // based on the selection type
          chart.tooltipedLayer.base
            .selectAll(chart.tooltipedSelectionType)

          .on("mouseover.tooltip", function(d, i) {

            // position the tooltip in the right position
            // and set its content to whatever the result of 
            // the text function that was provided is.
            tooltip.style({
              left: (d3.event.pageX + 20)+"px",
              top: (d3.event.pageY - 20)+"px",
              position: "absolute",
              "z-index": 1001
            }).html(function(){
              if (typeof chart._textFn === "undefined") {
                throw new Error(_errors.noText);
              }
              return chart._textFn(d, i);
            });

          })

          // when moving the tooltip, re-render its position
          // and update the text in case it's position dependent.
          .on("mousemove.tooltip", function(d, i) {

            tooltip.style({
              left: (d3.event.pageX + 20)+"px",
              top:  (d3.event.pageY - 20)+"px"
            }).html(function(){
              if (typeof chart._textFn === "undefined") {
                throw new Error(_errors.noText);
              }
              return chart._textFn(d, i);
            });

          })

          // when exiting the tooltip, just set its contents
          // to nothing.
          .on("mouseout.tooltip", function() {
            tooltip.html("");
          });

        }
      }
    });
  },

  // the setter for the function that will render the
  // contents of the tooltip. It must be called before a chart
  // .draw is called.
  text: function(d) {
    if (arguments.length === 0) { return this._textFn; }
    this._textFn = d3.functor(d);
    return this;
  }
});