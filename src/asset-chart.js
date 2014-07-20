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
            _private[v] = x;
            return c;
        };
    }

    // default padding to handle min/max whisker text
    _chart.yAxisPadding(12);

    // default to using a time scale with hour units
    _chart.x(d3.time.scale());
    _chart.xUnits(d3.time.hours);

    // valueAccessor should return an array of values that can be coerced into numbers
    // or if data is overloaded for a static array of arrays, it should be `Number`.
    // Empty arrays are not included.
    _chart.data(function(group) {
        return group.all().map(function (d) {
            d.map = function(accessor) { return accessor.call(d,d); };
            return d;
        }).filter(function (d) {
            var values = _chart.valueAccessor()(d);
            return values.length !== 0;
        });
    });

    var candlestickTransform = function (d, i) {
        var xOffset = _chart.x()(_chart.keyAccessor()(d,i));
        return "translate(" + xOffset + ",0)";
    };

    _chart._preprocessData = function () {
        if (_chart.elasticX()) {
            _chart.x().domain([]);
        }
    };

    _chart.plotData = function () {
        var candlesticksG = _chart.chartBodyG().selectAll('g.candlestick').data(_chart.data(), function (d) { return d.key; });

        renderCandlesticks(candlesticksG);
        updateCandlesticks(candlesticksG);
        removeCandlesticks(candlesticksG);

        _chart.fadeDeselectedArea();
    };

    var _boxWidth = function (innerChartWidth, xUnits) {
        if (_chart.isOrdinal())
            return _chart.x().rangeBand();
        else
            return innerChartWidth / (1 + _chart.boxPadding()) / xUnits;
    };

    function renderCandlesticks(candlesticksG) {
        var candlesticksGEnter = candlesticksG.enter().append("g");
        var _calculatedBoxWidth = _boxWidth(_chart.effectiveWidth(), _chart.xUnitCount());

        candlesticksGEnter
            .attr("class", "candlestick")
            .on("click", function(d) {
                _chart.filter(d.key);
                _chart.redrawGroup();
            });
        candlesticksGEnter.append("rect")
            .attr("class", "box")
            .attr("width", _calculatedBoxWidth)
            .attr("height", function (d, i) {
                return Math.abs(_chart.y()(_chart.openAccessor()(d.value, i)) - _chart.y()(_chart.closeAccessor()(d.value, i)));
            })
            .attr("y", function (d, i) {
                return _chart.y()(Math.max(_chart.openAccessor()(d.value, i), _chart.closeAccessor()(d.value, i)));
            });
        candlesticksGEnter.append("line")
            .attr("class", "shadow")
            .attr("x1", _calculatedBoxWidth / 2)
            .attr("x2", _calculatedBoxWidth / 2)
            .attr("y1", function (d, i) {
                return _chart.y()(_chart.highAccessor()(d.value, i));
            })
            .attr("y2", function (d, i) {
                return _chart.y()(_chart.lowAccessor()(d.value, i));
            });
    }

    function updateCandlesticks(candlesticksG) {
        dc.transition(candlesticksG, _chart.transitionDuration())
            .attr("transform", candlestickTransform)
            .each(function() {
                d3.select(this).select('rect.box').attr("fill", _chart.getColor);
                d3.select(this).select('line.shadow').attr("stroke", _chart.getColor);
            });
    }

    function removeCandlesticks(candlesticksG) {
        candlesticksG.exit().remove();
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
    #### .boxPadding([padding])
    Get or set the spacing between boxes as a fraction of box size. Valid values are within 0-1.
    See the [d3 docs](https://github.com/mbostock/d3/wiki/Ordinal-Scales#wiki-ordinal_rangeBands)
    for a visual description of how the padding is applied.

    Default: 0.3
    **/
    _chart.boxPadding = _chart._rangeBandPadding;
    _chart.boxPadding(0.3);

    _chart.colors(d3.scale.ordinal().domain(['down', 'up']).range(['red', 'green']));
    _chart.colorAccessor(function (d) {
        return _chart.closeAccessor()(d.value) > _chart.openAccessor()(d.value) ? 'up' : 'down';
    });

    _chart.fadeDeselectedArea = function () {
        if (_chart.hasFilter()) {
            _chart.g().selectAll("g.candlestick").each(function (d) {
                if (_chart.isSelectedNode(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.g().selectAll("g.candlestick").each(function () {
                _chart.resetHighlight(this);
            });
        }
    };

    _chart.isSelectedNode = function (d) {
        return _chart.hasFilter(d.key);
    };

    _chart.yAxisMin = function () {
        var min = d3.min(_chart.data(), function (e) {
            return d3.min(_chart.valueAccessor()(e));
        });
        return dc.utils.subtract(min, _chart.yAxisPadding());
    };

    _chart.yAxisMax = function () {
        var max = d3.max(_chart.data(), function (e) {
            return d3.max(_chart.valueAccessor()(e));
        });
        return dc.utils.add(max, _chart.yAxisPadding());
    };

    return _chart.anchor(parent, chartGroup);
};
