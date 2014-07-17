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
            .y(d3.scale.linear().domain([0, 144]))
            .ordinalColors(['#01','#02']);
    });

    describe('rendering the asset chart', function () {
        beforeEach(function () {
            chart.render();
        });

        it('should create a non-empty SVG node', function() {
            expect(chart.svg().empty()).toBeFalsy();
        });

        it('should create a candlestick for each group', function() {
            expect(chart.selectAll('g.candlestick').size()).toBe(data.size());
        });
    });
});
