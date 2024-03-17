const { rus_to_latin } = require('./translit.cjs');


function getLink(title, dd, mm) {
    let pre_title = rus_to_latin(title);
    pre_title = pre_title.replaceAll(" ", "-");

    let link = "https://telegra.ph/"  + pre_title + "-" + mm + "-" + dd;

    let newDd = parseInt(dd)-1;
    let newMm = mm;

    if (newDd < 1) {
        newMm = parseInt(mm)-1;
        newDd = 31;
    }

    if (newMm < 1) {
        newMm = 12;
        newDd = 31;
    }

    newMm = newMm.toString();
    newDd = newDd.toString();

    if (newMm.length < 2) newMm = '0' + newMm;
    if (newDd.length < 2) newDd = '0' + newDd;

    return ({ link: link, nextDd: newDd, nextMm: newMm});
}

exports.getLink = getLink;