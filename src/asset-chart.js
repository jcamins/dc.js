/**
 ## Asset Chart

 Includes: [Coordinate Grid Mixin](#coordinate-grid-mixin)

 Used for charting asset prices over time. Includes both Candlestick and OHLC charts.

 #### dc.assetChart(parent[, chartGroup])
 Create an asset chart instance and attach it to the given parent element.

 Parameters:
 * parent : string - any valid d3 single selector representing typically a dom block element such as a div.
 * chartGroup : string (optional) - name of the chart group this chart instance should be placed in. Once a chart is placed
 in a certain chart group then any interaction with such instance will only trigger events and redraw within the same
 chart group.

 Return:
 A newly created asset chart instance

 ```js
 // create a asset chart under #chart-container1 element using the default global chart group
 var assetChart1 = dc.assetChart("#chart-container1");
 // create a asset chart under #chart-container2 element using chart group A
 var assetChart2 = dc.assetChart("#chart-container2", "chartGroupA");
 ```

 **/
dc.assetChart = function (parent, chartGroup) {
    var _chart = dc.coordinateGridMixin({});
    var _private = { };

    function simpleAccessor(c, v, def) {
        _private[v] = def;
        c[v] = function (x) {
            if (!arguments.length) return _private[v];
            _private[v] = typeof x === 'function' ? x : function () { return x; };
            return c;
        };
    }

    // default to using a time scale with hour units
    _chart.x(d3.time.scale());
    _chart.xUnits(d3.time.hours);

    _chart.plotData = function () {
        var candlesticksG = _chart.chartBodyG().selectAll('g.candlestick').data(_chart.data(), dc.pluck('key'));

        renderCandlesticks(candlesticksG);
        updateCandlesticks(candlesticksG);
        removeCandlesticks(candlesticksG);
    };

    function renderCandlesticks(candlesticksG) {
        var candlesticksGEnter = candlesticksG.enter().append("g");

        candlesticksGEnter
            .attr("class", "candlestick");
        candlesticksGEnter.append("rect")
            .attr("class", "box");
        candlesticksGEnter.append("line")
            .attr("class", "shadow");
    }

    function updateCandlesticks(candlesticksG) {
        var _boxWidth = _chart.boxWidth()(_chart.xAxisMin()), _center = _boxWidth / 2;
        dc.transition(candlesticksG, _chart.transitionDuration())
            .attr("class", function (d) { return "candlestick " + (_chart.directionAccessor()(d) >= 0 ? 'up' : 'down'); })
            .attr("transform", function (d, i) {
                return "translate(" + (_chart.x()(d.key) - _center) + ",0)";
            });
        dc.transition(candlesticksG.selectAll('rect.box'), _chart.transitionDuration())
            .attr("width", _boxWidth)
            .attr("height", function (d, i) {
                return Math.abs(_chart.y()(_chart.openAccessor()(d.value, i)) - _chart.y()(_chart.closeAccessor()(d.value, i)));
            })
            .attr("y", function (d, i) {
                return _chart.y()(Math.max(_chart.openAccessor()(d.value, i), _chart.closeAccessor()(d.value, i)));
            });
        dc.transition(candlesticksG.selectAll('line.shadow'), _chart.transitionDuration())
            .attr("x1", _center)
            .attr("x2", _center)
            .attr("y1", function (d, i) {
                return _chart.y()(_chart.highAccessor()(d.value, i));
            })
            .attr("y2", function (d, i) {
                return _chart.y()(_chart.lowAccessor()(d.value, i));
            });
    }

    function removeCandlesticks(candlesticksG) {
        dc.transition(candlesticksG.exit(), _chart.transitionDuration())
            .attr("opacity", 0).remove();
    }

    /**
     #### .openAccessor([accessorFunction])
     Set or get the accessor function for the open rate. Defaults to a function that retrieves
     the 'open' property in the value object.
     **/
    simpleAccessor(_chart, 'openAccessor', dc.pluck('open'));
    /**
     #### .highAccessor([accessorFunction])
     Set or get the accessor function for the high rate. Defaults to a function that retrieves
     the 'high' property in the value object.
     **/
    simpleAccessor(_chart, 'highAccessor', dc.pluck('high'));
    /**
     #### .lowAccessor([accessorFunction])
     Set or get the accessor function for the low rate. Defaults to a function that retrieves
     the 'low' property in the value object.
     **/
    simpleAccessor(_chart, 'lowAccessor', dc.pluck('low'));
    /**
     #### .closeAccessor([accessorFunction])
     Set or get the accessor function for the close rate. Defaults to a function that retrieves
     the 'close' property in the value object.
     **/
    simpleAccessor(_chart, 'closeAccessor', dc.pluck('close'));
    /**
     #### .directionAccessor([accessorFunction])
     Set or get the accessor function for the bar direction. Defaults to a function that
     returns the difference between the close and the open.
     **/
    simpleAccessor(_chart, 'directionAccessor', function (d) {
        return _chart.closeAccessor()(d.value) - _chart.openAccessor()(d.value);
    });
    /**
     #### .boxWidth([lookupFunction])
     Set or get the width of each box. This can be either a number or a function that will be
     called with a sample data point. Defaults to a function that tries to make the width of
     the boxes equal to exactly one unit.
     **/
    simpleAccessor(_chart, 'boxWidth', function (d) {
        if (_chart.isOrdinal()) {
            return _chart.x().rangeBand();
        } else {
            var unit;
            d = new Date(d);
            switch (_chart.xUnits()) {
                case d3.time.days:
                    unit = new Date(d).setDate(d.getDate() + 1);
                    break;
                case d3.time.hours:
                    unit = new Date(d).setHour(d.getHour() + 1);
                    break;
                case d3.time.minutes:
                    unit = new Date(d).setMinute(d.getMinute() + 1);
                    break;
                default:
                    return _chart.effectiveWidth() / (1 + _chart.boxPadding()) / _chart.xUnitCount();
            }
            return (_chart.x()(unit) - _chart.x()(d)) * (1 - _chart.boxPadding());
        }
    });

    /**
    #### .boxPadding([padding])
    Get or set the spacing between boxes as a fraction of box size. Valid values are within 0-1.
    See the [d3 docs](https://github.com/mbostock/d3/wiki/Ordinal-Scales#wiki-ordinal_rangeBands)
    for a visual description of how the padding is applied.

    Default: 0.3
    **/
    _chart.boxPadding = _chart._rangeBandPadding;
    _chart.boxPadding(0.3);

    /*
     * Overload the yAxisMin and yAxisMax functions since the valueAccessor has slightly
     * different semantics for the asset chart than for other chart types.
     */
    _chart.yAxisMin = function () {
        var min = d3.min(_chart.data(), function (e) {
            return _chart.lowAccessor()(e.value);
        });
        return dc.utils.subtract(min, _chart.yAxisPadding());
    };

    _chart.yAxisMax = function () {
        var max = d3.max(_chart.data(), function (e) {
            return _chart.highAccessor()(e.value);
        });
        return dc.utils.add(max, _chart.yAxisPadding());
    };

    return _chart.anchor(parent, chartGroup);
};
