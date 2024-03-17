let { parse } = require("node-html-parser");
let { getLink } = require("./link.cjs");
const crypto = require("crypto");
let { normalizeText } = require('normalize-text');

function getVid(document) {
    return document.querySelector(".tl_article").innerHTML.toString().split("<video").length - 1;
}

function getImgs(document) {
    return document.querySelector(".tl_article").innerHTML.toString().split("<img").length - 1;
}

function getLinks(document) {
    return (document.querySelector(".tl_article").innerText.toString().split("http").length - 1);
}

function getEmails(document) {
    let text = document.querySelector(".tl_article").innerHTML.toString();
    let re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    try {
        return (text.match(re).length) / 9;
    } catch (error) {
        return 0;
    }
}

function getSize(document) {
    return document.querySelector("article").innerText.split(" ").length;
}

function getTime(document) {
    return normalizeText(document.querySelector("time").innerText);
}

function getAuthor(document) {
    let text = removeHtmlEntities(normalizeText(document.querySelector("a[rel='author']").innerText))

    if (!text) {
        return "unknown";
    } else {
        return text;
    }
}

function getName(document) {
    return removeHtmlEntities(normalizeText(document.querySelector("header>h1").innerText));
}


const cut = str => {
	if(str.length > 383) {
  	return str.slice(0, 383) + '...';
  } else {
  	return str;
  }
}

function removeHtmlEntities(str) {
    return str.replace(/&[^;]+;/g, '');
}

function getDescription(document) {
    let title = removeHtmlEntities(document.querySelectorAll("h1")[0].innerText.toString());
    let author = removeHtmlEntities(document.querySelectorAll("address")[1].innerText.toString());

    let text = "";
    let elements = document.querySelectorAll("article *");

    for (let i of Array.from(elements)) {
        text += removeHtmlEntities(i.innerText.toString() + " ");
    }

    text = text.replace(title, "");
    text = text.replace(author, "");

    return cut(text);
}

let checked = [];
let results = [];


async function checkUrl(url) {
    try {
        let html = await (await fetch(url)).text();
        let document = parse.parse(html);

        try {
            document.querySelector("section>h1").innerText == "404";
            return "err";
        } catch (error) {

        }

        let text = document.querySelector(".tl_article").innerText;

        if (checked.includes(text)) {
            return "ok";
        }

        checked.push(text);

        //console.log(.querySelector(".tl_article_content").innerText);

        let newResult = {};

        newResult.url = url;
        newResult.time = getTime(document);
        newResult.author = getAuthor(document);
        newResult.size = getSize(document); 
        newResult.emails = getEmails(document);
        newResult.links = getLinks(document);
        newResult.images = getImgs(document);
        newResult.videos = getVid(document);
        newResult.desc = getDescription(document);
        newResult.name = getName(document);
        newResult.key = crypto.randomUUID();
        

        results.push(newResult);
    } catch (error) {
        console.log(error);
    }
    return "ok";
}

let scanBatch = async (title, size, inp_dd, inp_mm) => {
    checked = [];
    results = [];
    let dd = inp_dd;
    let mm = inp_mm;

    for (let i = 0; i < size; i++) {
        let linkObj = getLink(title, dd, mm);

        let link = linkObj.link;
        dd = linkObj.nextDd;
        mm = linkObj.nextMm;

        let isFullChecked = false;

        let res = await checkUrl(link);
        if (res == "err") { isFullChecked = true; }

        let j = 2;
        while (isFullChecked == false) {
            res = await checkUrl(link + "-" + j);
            j++;
            if (res == "err") { isFullChecked = true; }
        }
    }
    return { results: results, lastDd: dd, lastMm: mm };
};

exports.scanBatch = scanBatch;;
