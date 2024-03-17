function swap(json){
    var ret = {};
    for(var key in json){
      ret[json[key]] = key;
    }
    return ret;
}

function rus_to_latin(str) {
    let mapping = [
        "abvgdezijklmnoprstufhcC'y'ABVGDEZIJKLMNOPRSTUFH'Y'",
        "абвгдезийклмнопрстуфхцЦъыьАБВГДЕЗИЙКЛМНОПРСТУФХЪЫЬ",
    ];

    let pre_processor_mapping = swap({
        "zh": "ж",
        "yo": 'ё',
        "ch": "ч",
        "sh": "ш",
        "sch": "щ",
        "yu": "ю",
        "ya": "я",
        "Yo": 'Ё',
        "Zh": "Ж",
        "Ts": "Ц",
        "Ch": "Ч",
        "Sh": "Ш",
        "Sch": "Щ",
        "Yu": "Ю",
        "Ja": "Я",
        "EH": "Э",
        "eh": "э"
    });

    let fin_str = str;
    for (let i of mapping[1]) {
        if (mapping[0][mapping[1].indexOf(i)] == "'") {
         continue;   
        }
        fin_str = fin_str.replaceAll(i, mapping[0][mapping[1].indexOf(i)]);
    }

    let pre_str = fin_str;
    for (let i of Object.keys(pre_processor_mapping)) {
        pre_str = pre_str.replaceAll(i, pre_processor_mapping[i]);
    }

    return (pre_str);
}

exports.rus_to_latin = rus_to_latin;