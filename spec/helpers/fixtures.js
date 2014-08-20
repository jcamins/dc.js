function loadDateFixture() {
    var fixture = JSON.parse("[" +
        "{\"value\":\"44\",\"nvalue\":\"-4\",\"countrycode\":\"US\",\"state\":\"California\",\"status\":\"T\",\"id\":1,\"region\":\"South\",\"date\":\"2012-05-25T16:10:09Z\"}, " +
        "{\"value\":\"22\",\"nvalue\":\"-2\",\"countrycode\":\"US\",\"state\":\"Colorado\",\"status\":\"F\",\"id\":2,\"region\":\"West\",\"date\":\"2012-06-10T16:10:19Z\"}, " +
        "{\"value\":\"33\",\"nvalue\":\"1\",\"countrycode\":\"US\",\"state\":\"Delaware\",\"status\":\"T\",\"id\":3,\"region\":\"West\",\"date\":\"2012-08-10T16:20:29Z\"}, " +
        "{\"value\":\"44\",\"nvalue\":\"-3\",\"countrycode\":\"US\",\"state\":\"California\",\"status\":\"F\",\"id\":4,\"region\":\"South\",\"date\":\"2012-07-01T16:10:39Z\"}, " +
        "{\"value\":\"55\",\"nvalue\":\"-5\",\"countrycode\":\"CA\",\"state\":\"Ontario\",\"status\":\"T\",\"id\":5,\"region\":\"Central\",\"date\":\"2012-06-10T16:10:49Z\"}, " +
        "{\"value\":\"66\",\"nvalue\":\"-4\",\"countrycode\":\"US\",\"state\":\"California\",\"status\":\"F\",\"id\":6,\"region\":\"West\",\"date\":\"2012-06-08T16:10:59Z\"}, " +
        "{\"value\":\"22\",\"nvalue\":\"10\",\"countrycode\":\"CA\",\"state\":\"Ontario\",\"status\":\"T\",\"id\":7,\"region\":\"East\",\"date\":\"2012-07-10T16:10:09Z\"}, " +
        "{\"value\":\"33\",\"nvalue\":\"1\",\"countrycode\":\"US\",\"state\":\"Mississippi\",\"status\":\"F\",\"id\":8,\"region\":\"Central\",\"date\":\"2012-07-10T16:10:19Z\"}, " +
        "{\"value\":\"44\",\"nvalue\":\"2\",\"countrycode\":\"US\",\"state\":\"Mississippi\",\"status\":\"T\",\"id\":9,\"region\":\"Central\",\"date\":\"2012-08-10T16:30:29Z\"}, " +
        "{\"value\":\"55\",\"nvalue\":\"-3\",\"countrycode\":\"US\",\"state\":\"Oklahoma\",\"status\":\"F\",\"id\":10,\"region\":\"\",\"date\":\"2012-06-10T16:10:39Z\"}" +
        "]");

    fixture.forEach(dateCleaner);
    return fixture;
}

function loadDateFixture2() {
    var fixture = JSON.parse(
        "[" +
            "{\"value\":\"11\",\"nvalue\":\"-4\",\"countrycode\":\"UK\",\"state\":\"Liverpool\",\"status\":\"T\",\"id\":11,\"region\":\"South\",\"date\":\"2012-05-25T16:20:09Z\"}, " +
            "{\"value\":\"76\",\"nvalue\":\"-1\",\"countrycode\":\"UK\",\"state\":\"London\",\"status\":\"F\",\"id\":12,\"region\":\"\",\"date\":\"2012-06-10T16:20:39Z\"}" +
            "]");

    fixture.forEach(dateCleaner);
    return fixture;
}


function loadBoxPlotFixture() {
    return JSON.parse("[" +
        "{\"value\":\"44\",\"nvalue\":\"-4\",\"countrycode\":\"US\",\"state\":\"California\",\"status\":\"T\",\"id\":1,\"region\":\"South\",\"date\":\"2012-05-25T16:10:09Z\"}, " +
        "{\"value\":\"22\",\"nvalue\":\"-2\",\"countrycode\":\"US\",\"state\":\"Colorado\",\"status\":\"F\",\"id\":2,\"region\":\"West\",\"date\":\"2012-06-10T16:10:19Z\"}, " +
        "{\"value\":\"33\",\"nvalue\":\"1\",\"countrycode\":\"US\",\"state\":\"Delaware\",\"status\":\"T\",\"id\":3,\"region\":\"West\",\"date\":\"2012-08-10T16:20:29Z\"}, " +
        "{\"value\":\"44\",\"nvalue\":\"-3\",\"countrycode\":\"US\",\"state\":\"California\",\"status\":\"F\",\"id\":4,\"region\":\"South\",\"date\":\"2012-07-01T16:10:39Z\"}, " +
        "{\"value\":\"55\",\"nvalue\":\"-5\",\"countrycode\":\"US\",\"state\":\"Ontario\",\"status\":\"T\",\"id\":5,\"region\":\"Central\",\"date\":\"2012-06-10T16:10:49Z\"}, " +
        "{\"value\":\"66\",\"nvalue\":\"-4\",\"countrycode\":\"US\",\"state\":\"California\",\"status\":\"F\",\"id\":6,\"region\":\"West\",\"date\":\"2012-06-08T16:10:59Z\"}, " +
        "{\"value\":\"33\",\"nvalue\":\"10\",\"countrycode\":\"US\",\"state\":\"Ontario\",\"status\":\"T\",\"id\":7,\"region\":\"East\",\"date\":\"2012-07-10T16:10:09Z\"}, " +
        "{\"value\":\"33\",\"nvalue\":\"1\",\"countrycode\":\"US\",\"state\":\"Mississippi\",\"status\":\"F\",\"id\":8,\"region\":\"Central\",\"date\":\"2012-07-10T16:10:19Z\"}, " +
        "{\"value\":\"44\",\"nvalue\":\"2\",\"countrycode\":\"US\",\"state\":\"Mississippi\",\"status\":\"T\",\"id\":9,\"region\":\"Central\",\"date\":\"2012-08-10T16:30:29Z\"}, " +
        "{\"value\":\"1\",\"nvalue\":\"-12\",\"countrycode\":\"US\",\"state\":\"Washington\",\"status\":\"F\",\"id\":12,\"region\":\"\",\"date\":\"2012-06-10T16:10:39Z\"}, " +
        "{\"value\":\"144\",\"nvalue\":\"-3\",\"countrycode\":\"US\",\"state\":\"Massachusetts\",\"status\":\"T\",\"id\":15,\"region\":\"\",\"date\":\"2012-06-10T16:10:39Z\"}, " +
        "{\"value\":\"1\",\"nvalue\":\"-4\",\"countrycode\":\"CA\",\"state\":\"California\",\"statCA\":\"T\",\"id\":1,\"region\":\"South\",\"date\":\"2012-05-25T16:10:09Z\"}, " +
        "{\"value\":\"2\",\"nvalue\":\"-2\",\"countrycode\":\"CA\",\"state\":\"Colorado\",\"statCA\":\"F\",\"id\":2,\"region\":\"West\",\"date\":\"2012-06-10T16:10:19Z\"}, " +
        "{\"value\":\"3\",\"nvalue\":\"1\",\"countrycode\":\"CA\",\"state\":\"Delaware\",\"statCA\":\"T\",\"id\":3,\"region\":\"West\",\"date\":\"2012-08-10T16:20:29Z\"}" +
        "]");
}

function loadAssetChartFixture() {
    var data = JSON.parse("[" +
        "{\"date\":\"2014-01-02T00:00:00\",\"open\":557.17,\"high\":558.32,\"low\":553.58,\"close\":556.00}, " +
        "{\"date\":\"2014-01-03T00:00:00\",\"open\":556.94,\"high\":557.91,\"low\":551.91,\"close\":551.95}, " +
        "{\"date\":\"2014-01-06T00:00:00\",\"open\":555.95,\"high\":558.87,\"low\":552.67,\"close\":558.10}, " +
        "{\"date\":\"2014-01-07T00:00:00\",\"open\":561.94,\"high\":569.28,\"low\":560.02,\"close\":568.86}, " +
        "{\"date\":\"2014-01-08T00:00:00\",\"open\":572.43,\"high\":573.09,\"low\":566.08,\"close\":570.04}, " +
        "{\"date\":\"2014-01-09T00:00:00\",\"open\":571.15,\"high\":571.54,\"low\":562.22,\"close\":564.55}, " +
        "{\"date\":\"2014-01-10T00:00:00\",\"open\":568.97,\"high\":568.97,\"low\":560.56,\"close\":564.52}, " +
        "{\"date\":\"2014-01-13T00:00:00\",\"open\":562.67,\"high\":572.88,\"low\":558.03,\"close\":560.93}, " +
        "{\"date\":\"2014-01-14T00:00:00\",\"open\":568.41,\"high\":574.92,\"low\":563.48,\"close\":574.13}, " +
        "{\"date\":\"2014-01-15T00:00:00\",\"open\":575.92,\"high\":576.92,\"low\":571.32,\"close\":573.74}, " +
        "{\"date\":\"2014-01-16T00:00:00\",\"open\":573.98,\"high\":578.39,\"low\":573.43,\"close\":577.53}, " +
        "{\"date\":\"2014-01-17T00:00:00\",\"open\":577.85,\"high\":579.73,\"low\":571.53,\"close\":574.69}, " +
        "{\"date\":\"2014-01-21T00:00:00\",\"open\":579.88,\"high\":581.42,\"low\":575.07,\"close\":581.27}, " +
        "{\"date\":\"2014-01-22T00:00:00\",\"open\":582.72,\"high\":583.36,\"low\":578.85,\"close\":581.93}, " +
        "{\"date\":\"2014-01-23T00:00:00\",\"open\":579.42,\"high\":580.66,\"low\":576.61,\"close\":579.47}, " +
        "{\"date\":\"2014-01-24T00:00:00\",\"open\":574.93,\"high\":576.20,\"low\":560.94,\"close\":561.35}, " +
        "{\"date\":\"2014-01-27T00:00:00\",\"open\":562.49,\"high\":562.69,\"low\":540.59,\"close\":550.06}, " +
        "{\"date\":\"2014-01-28T00:00:00\",\"open\":554.60,\"high\":562.31,\"low\":554.42,\"close\":560.94}, " +
        "{\"date\":\"2014-01-29T00:00:00\",\"open\":559.00,\"high\":560.31,\"low\":549.16,\"close\":552.91}, " +
        "{\"date\":\"2014-01-30T00:00:00\",\"open\":571.93,\"high\":575.67,\"low\":563.06,\"close\":567.13}, " +
        "{\"date\":\"2014-01-31T00:00:00\",\"open\":585.09,\"high\":592.68,\"low\":574.99,\"close\":589.89} " +
        "]");
    for (var ii = 0; ii < data.length; ii++) {
        data[ii].date = new Date(data[ii].date);
    }
    return data;
}

function loadColorFixture() {
    return JSON.parse("[" +
        "{\"colData\":\"1\", \"rowData\": \"1\", \"colorData\": \"1\"}," +
        "{\"colData\":\"1\", \"rowData\": \"1\", \"colorData\": \"1\"}," +
        "{\"colData\":\"1\", \"rowData\": \"2\", \"colorData\": \"2\"}," +
        "{\"colData\":\"1\", \"rowData\": \"2\", \"colorData\": \"2\"}," +
        "{\"colData\":\"2\", \"rowData\": \"1\", \"colorData\": \"3\"}," +
        "{\"colData\":\"2\", \"rowData\": \"1\", \"colorData\": \"3\"}," +
        "{\"colData\":\"2\", \"rowData\": \"2\", \"colorData\": \"4\"}," +
        "{\"colData\":\"2\", \"rowData\": \"2\", \"colorData\": \"4\"}" +
        "]");
}

function loadColorFixture2() {
    return JSON.parse("[" +
        "{\"colData\":\"3\", \"rowData\": \"3\", \"colorData\": \"5\"}," +
        "{\"colData\":\"3\", \"rowData\": \"4\", \"colorData\": \"5\"}," +
        "{\"colData\":\"4\", \"rowData\": \"5\", \"colorData\": \"6\"}," +
        "{\"colData\":\"4\", \"rowData\": \"6\", \"colorData\": \"6\"}," +
        "{\"colData\":\"5\", \"rowData\": \"3\", \"colorData\": \"7\"}," +
        "{\"colData\":\"5\", \"rowData\": \"4\", \"colorData\": \"7\"}," +
        "{\"colData\":\"6\", \"rowData\": \"5\", \"colorData\": \"8\"}," +
        "{\"colData\":\"6\", \"rowData\": \"6\", \"colorData\": \"8\"}" +
        "]");
}

function dateCleaner(e) {
    e.dd = d3.time.format.iso.parse(e.date);
}
