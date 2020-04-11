function getTotal(site) {
    const totalData = site('ul.list-group.list-group-genislik').first().find('li.d-flex.justify-content-between.baslik-k').children();
    const totalHealedCases = totalData[11].children[0].data.replace('.', '');
    const totalIntubatedCases = totalData[9].children[0].data.replace('.', '');
    const totalIntensiveCases = totalData[7].children[0].data.replace('.', '');
    const totalDeaths = totalData[5].children[0].data.replace('.', '');
    const totalCases = totalData[3].children[0].data.replace('.', '');
    const totalTests = totalData[1].children[0].data.replace(/\n/g, '').replace(/ /g, '').replace('.', '');
    return {
        tests: parseInt(totalTests),
        cases: parseInt(totalCases),
        intubatedCases: parseInt(totalIntubatedCases),
        deaths: parseInt(totalDeaths),
        intensiveCases: parseInt(totalIntensiveCases),
        healed: parseInt(totalHealedCases)
    };
}

function getToday(site) {
    const testToday = site('li.d-flex.justify-content-between.baslik-k-2.bg-acik > span.buyuk-bilgi-l-sayi').html().replace('.', '');
    const caseToday = site('li.d-flex.justify-content-between.baslik-k-2.bg-koyu').find('span').get(1).children[0].data.replace('.', '');
    const healedToday = site('li.d-flex.justify-content-between.baslik-k-2.bg-koyu').children().last().html().replace('.', '');
    const deathToday = site('li.d-flex.justify-content-between.baslik-k-2.bg-acik').children().last().html().replace('.', '');
    return {
        cases: parseInt(caseToday),
        deaths: parseInt(deathToday),
        tests: parseInt(testToday),
        healed: parseInt(healedToday),
    }
}

function getTimeline(site) {
    const script = site('script').get(2).children[0].data;
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