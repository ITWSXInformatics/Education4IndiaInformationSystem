



var dataText = `State;Internet Subscriptions (millions);Literacy Rate ;Population ;No. of Gov Schools;Abbrv
Andhra Pradesh;37.61;67.0;8,45,80,777;45013;AP
Assam;9.81;72.2;3,12,05,576;47223;AS
Bihar;28.4;61.8;10,40,99,452;72590;BR
Delhi;31.14;86.2;1,67,87,941;2784;DL
Gujarat;31.43;78.0;6,04,39,692;35202;
Haryana;9.05;75.6;2,53,51,462;14516;HR
Himachal Pradesh;6.94;82.8;68,64,602;15433;HP
Jammu & Kashmir;5.81;67.2;1,25,41,302;24080;JK
Karnataka;32.14;75.4;6,10,95,297;50184;KA
Kerala;19.8;94.0;3,34,06,061;5011;KL
Madhya Pradesh;25.88;69.3;7,26,26,809;122056;MP
Maharashtra;39.45;82.3;11,23,74,333;66033;MH
Orissa;12.2;72.9;4,19,74,218;55483;OR
Punjab;18.63;75.8;2,77,43,338;19404;PB
Rajasthan;26.46;66.1;6,85,48,437;67578;RJ
Tamil Nadu;39.57;80.1;7,21,47,030;37728;TN
West Bengal;19.31;76.3;9,12,76,115;82876;WB`;

function make_chart(id, data, title, hexcolor, formatting, internet=false) {
    data.forEach(function (p) {
        if(p.code == undefined) {
            console.log(data);
        }
        p.code = p.code.toUpperCase();
    });

    // Instantiate the map
    var map_obj = {

        chart: {
            map: 'countries/in/in-all',
            borderWidth: 1
        },

        title: {
            text: title
        },

        exporting: {
            sourceWidth: 600,
            sourceHeight: 500
        },

        legend: {
            layout: 'horizontal',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            floating: true,
            verticalAlign: 'top',
            y: 25
        },

        mapNavigation: {
            enabled: true
        },

        colorAxis: {
            type: 'linear',
            minColor: '#EEEEEE',
            maxColor: hexcolor,
            stops: [
                [0, '#EEEEEE'],
                [1, hexcolor]
            ]
        },

        series: [{
            animation: {
                duration: 1000
            },
            data: data,
            joinBy: ['postal-code', 'code'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                format: '{point.code}'
            },
            name: title,
            tooltip: {
                pointFormat: formatting
            }
        }]
    }
    if (internet) {
        map_obj.colorAxis.minColor = undefined;
        map_obj.colorAxis.maxColor = undefined;
        map_obj.colorAxis.stops = [
            [0, '#EEEEEE'],
            [0.6, hexcolor],
            [1, '#000000']
        ];
    }
    Highcharts.mapChart(id, map_obj);
}

function processData(csvText) {
    var allTextLines = csvText.split(/\r\n|\n/);
    var entries = allTextLines[0].split(';');
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
        var obj = {};
        var this_line = allTextLines[i].split(';');
        for (var j = 0; j < this_line.length; j++) {
            obj[entries[j]] = this_line[j];
        }
        lines.push(obj);
    }
    return lines;
}

data = processData(dataText);
data = data.map(x => { x['Population '] = parseInt(x['Population '].replace(/,/g, '')); return x; })
data = data.filter(x => x.Abbrv != '');
data1 = JSON.parse(JSON.stringify(data)).map(x => {
    return {
        code: x.Abbrv,
        value: Math.round(x['Population '] / x['No. of Gov Schools'])
    }
});
data2 = JSON.parse(JSON.stringify(data)).map(x => {
    return {
        code: x.Abbrv,
        value: parseFloat((x['Internet Subscriptions (millions)'] / x['Population '] * 1000000).toFixed(2))
    }
});
data3 = JSON.parse(JSON.stringify(data)).map(x => {
    return {
        code: x.Abbrv,
        value: parseFloat(x['Literacy Rate '])
    }
});

$(document).ready(function () {
    make_chart('map_container', JSON.parse(JSON.stringify(data1)), 'Residents per Government School', '#0000FF', '{point.code}: {point.value}');

    $("#gov_school_map").click(function () {
        $("#map_container").html("");
        make_chart('map_container', JSON.parse(JSON.stringify(data1)), 'Residents per Government School', '#0000FF', '{point.code}: {point.value}');
    });
    $("#internet_map").click(function () {
        $("#map_container").html("");
        make_chart('map_container', JSON.parse(JSON.stringify(data2)), 'Internet Connections per Resident', '#000000', '{point.code}: {point.value}');
    });
    $("#literacy_map").click(function () {
        $("#map_container").html("");
        make_chart('map_container', JSON.parse(JSON.stringify(data3)), 'Literacy Rate', '#FF0000', '{point.code}: {point.value}');
    });
});