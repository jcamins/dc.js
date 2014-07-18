describe('dc.assetChart', function() {
    var id, chart;
    var data, dimension, group;

    beforeEach(function () {
        data = crossfilter(loadAssetChartFixture());

        dimension = data.dimension(function (d) { return d.date; });
        group = dimension.group().reduce(
            function (p, v) {
                p.open = p.open || v.open;
                p.high = Math.max(p.high, v.high);
                p.low = Math.min(p.low, v.low);
                p.close = v.close;
                return p;
            },
            function (p, v) { return p; },
            function () { return { }; }
        );

        id = 'assetchart';
        appendChartID(id);

        chart = dc.assetChart('#' + id);
        chart
            .dimension(dimension)
            .group(group)
            .width(300)
            .height(144)
            .margins({top: 0, right: 0, bottom: 0, left: 0})
            .transitionDuration(0)
            .y(d3.scale.linear().domain([540, 600]));
    });

    describe('rendering candlesticks', function () {
        beforeEach(function () {
            chart.render();
        });

        it('should create a non-empty SVG node', function() {
            expect(chart.svg().empty()).toBeFalsy();
        });

        it('should create a candlestick for each group', function() {
            expect(chart.selectAll('g.candlestick').size()).toBe(data.size());
        });

        it('should add a box to each candlestick', function () {
            expect(chart.selectAll('rect.box').size()).toBe(data.size());
        });

        it('should set the box width to fill available space', function () {
            expect(+chart.select('rect.box').attr('width')).toBe(chart.x().rangeBand());
        });

        it('should set the box top according to open and close data', function () {
            forEachDatum(function (cs, d) {
                expect(+cs.select('rect.box').attr('y')).toBe(Math.min(chart.y()(d.value.open), chart.y()(d.value.close)));
            });
        });

        it('should set the box height according to open and close data', function () {
            forEachDatum(function (cs, d) {
                expect(+cs.select('rect.box').attr('height')).toBe(Math.abs(chart.y()(d.value.open) - chart.y()(d.value.close)));
            });
        });
    });

    function forEachDatum(assertions) {
        chart.selectAll("g.candlestick").each(function (d) {
            assertions(d3.select(this), d);
        });
    }
});
