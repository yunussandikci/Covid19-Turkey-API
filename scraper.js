function getTotal(site) {
    const totalData = site('ul.list-group.list-group-genislik').first().find('li.d-flex.justify-content-between.baslik-k').children();
    const totalTests = totalData[1].children[0].data.replace(/\n/g, '').replace(/ /g, '').replace(/\./g,'');
    const totalCases = totalData[3].children[0].data.replace(/\./g,'');
    const totalDeaths = totalData[5].children[0].data.replace(/\./g,'');
    const totalPneumoniaRate = totalData[7].children[0].data.replace(/\./g,'').replace(/%/g,'').replace(/,/g,'.');
    const totalSeriouslyIllPatients = totalData[9].children[0].data.replace(/\./g,'');
    const totalRecovered = totalData[11].children[0].data.replace(/\./g,'');
    return {
        tests: parseInt(totalTests),
        cases: parseInt(totalCases),
        deaths: parseInt(totalDeaths),
        pneumoniaRate: parseFloat(totalPneumoniaRate),
        seriouslyIllPatients: parseInt(totalSeriouslyIllPatients),
        recoveredPatients: parseInt(totalRecovered)
    };
}

function getToday(site) {
    const testToday = site('li.d-flex.justify-content-between.baslik-k-2.bg-acik > span.buyuk-bilgi-l-sayi').html().replace(/\./g,'');
    const caseToday = site('li.d-flex.justify-content-between.baslik-k-2.bg-koyu').find('span').get(1).children[0].data.replace(/\./g,'');
    const deathToday = site('li.d-flex.justify-content-between.baslik-k-2.bg-acik').children().last().html().replace(/\./g,'');
    const recoveredToday = site('li.d-flex.justify-content-between.baslik-k-2.bg-koyu').children().last().html().replace(/\./g,'');
    return {
        tests: parseInt(testToday),
        cases: parseInt(caseToday),
        deaths: parseInt(deathToday),
        recovered: parseInt(recoveredToday),
    }
}

function getTimeline(site) {
    const script = site('script').get(5).children[0].data;
    const caseDates = script.split('\n')[56].replace('            labelsTooltip: ["', '').replace('"],', '').replace(/\"/g, "").split(',');
    const caseCounts = script.split('\n')[64].replace('                    data: ["', '').replace('"],', '').replace(/\"/g, "").split(',');
    const deathCount = script.split('\n')[73].replace('                    data: ["', '').replace('"],', '').replace(/\"/g, "").split(',')
    let timeLine = [];
    for (let i = 0; i < caseDates.length; i++) {
        if (caseCounts[i] != null) {
            timeLine.push({
                date: caseDates[i],
                cases: parseInt(caseCounts[i]),
                deaths: parseInt(deathCount[i])
            })
        }
    }
    return timeLine;
}

module.exports.getTotal = getTotal;
module.exports.getToday = getToday;
module.exports.getTimeline = getTimeline;