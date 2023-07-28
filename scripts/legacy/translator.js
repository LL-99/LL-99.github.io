/*
    UI MANAGEMENT
*/

var currentPopup;

/* Pre-register all popups and disable them by default */
var allPopups = {
    "Info": document.getElementById("popup-info"),
    "Rule Editor": document.getElementById("popup-rule-editor")
};
for (let name in allPopups) {
    allPopups[name].style.visibility = "hidden";
}

/**
 * Toggle a specific popup
 * @param {string} name 
 */
function TogglePopup(name) {
    if (currentPopup == allPopups[name]) {
        ClosePopup();
    }
    else {
        if (currentPopup != null && currentPopup != undefined) {
            ClosePopup(name);
        }
        OpenPopup(name);
    }
}

/**
 * Show a specific popup (automatically closes any other shown popup)
 * @param {string} name 
 */
function OpenPopup(name) {
    console.log("Opening popup " + name);

    if (currentPopup != null && currentPopup != undefined) {
        ClosePopup(name);
    }
    else {
        currentPopup = allPopups[name];

        if (currentPopup != null && currentPopup != undefined) {
            currentPopup.style.visibility = "visible";
            currentPopup.style.animation = "fade-in .5s";
        }
    }
}

/**
 * Closes the current popup and opens a new one if a specific name is given
 * @param {string} openNewPopup 
 */
function ClosePopup(openNewPopup) {
    console.log("Closing popup");
    console.log(currentPopup);

    currentPopup.style.animation = "fade-out .5s";

    setTimeout(function () {
        currentPopup.style.visibility = "hidden";
        currentPopup = null;

        if (openNewPopup != undefined && openNewPopup != "")
            OpenPopup(openNewPopup);
    }, 490);
}























/*
    This script contains the fantasy translator app. It works as follows:

    Input: 
        Language Name
        Any English sentence (Important: Neither grammar nor spelling are checked)
        Spelling Rules
        Grammar Rules (WIP)

    Output:
        The previously entered English sentence transformed by the arbitrary rules of the new language        


    The actual transformation is extremely simple as only rules defined by the user are applied. While a few examples may demonstrate proper usage,
    the effectiveness of the fantasy translator is completely up to the user.
*/

class Rule {
    Apply = function () { console.error("Invoking 'Apply' of the base Rule class. This should not happen!"); }
}

// These rules change the sentence layout based on word types
//#region Grammar Rules
class GrammarRule extends Rule {
    abc = "Hi";
    Apply = function () { console.log("Not implemented!"); }
}

class GrammarRule_Swap extends GrammarRule {
    Apply = function () { console.log("Swapping"); }
}
//#endregion

// These rules change specific words based on certain criterias
class WordRules extends Rule {

}

// These rules change all specific letter(s/combinations) based on defined properties
//#region Character Rules
class CharacterRule extends Rule {

    patternOld = "";
    patternNew = "";
    replacementRule = ReplacementRule.All;

    /**
     * 
     * @param {string} patternOld 
     * @param {string} patternNew 
     * @param {ReplacementRule} replacementRule 
     */
    constructor(patternOld, patternNew, replacementRule) {
        super();

        this.patternOld = patternOld;
        this.patternNew = patternNew;
        this.replacementRule = replacementRule;
    }

    /** 
     * @param {string} text
    */
    Apply = function (text) {
        if (this.replacementRule == ReplacementRule.All) {
            return text.replaceAll(this.patternOld, this.patternNew);
        }
        else {
            let textArray = text.split(' ');
            let newText = "";

            let replaceCount = 0;
            let lastOccurance = -1;

            for (let i = 0; i < textArray.length; i++) {
                let newWord = textArray[i];

                // Keep track of last occurence of the pattern
                if (newWord.includes(this.patternOld)) {
                    lastOccurance = i;
                }

                // Replace pattern in all words beginning with it
                if (this.replacementRule == ReplacementRule.StartOfWord &&
                    newWord.startsWith(this.patternOld)) {
                    newWord = this.patternNew + newWord.substring(this.patternOld.length);
                    replaceCount++;
                }
                // Replace pattern in all words ending with it
                else if (this.replacementRule == ReplacementRule.EndOfWord &&
                    newWord.endsWith(this.patternOld)) {
                    newWord = newWord.substring(0, newWord.length - this.patternOld.length) + this.patternNew;
                    replaceCount++;
                }
                // Replace pattern in first occuring word
                else if (this.replacementRule == ReplacementRule.FirstWord && newWord.includes(this.patternOld) && replaceCount == 0) {
                    let wordParts = newWord.split(this.patternOld);
                    newWord = wordParts[0];

                    for (let j = 1; j < wordParts.length; j++) {
                        newWord += this.patternNew + wordParts[j];
                    }

                    replaceCount++;
                }

                textArray[i] = newWord;
            }

            // Replace pattern in last occuring word
            if (this.replacementRule == ReplacementRule.LastWord && lastOccurance != -1) {
                let wordParts = textArray[lastOccurance].split(this.patternOld);
                textArray[lastOccurance] = wordParts[0];

                for (let j = 1; j < wordParts.length; j++) {
                    textArray[lastOccurance] += this.patternNew + wordParts[j];
                }

                replaceCount++;
            }

            // Finally put everything together again
            for (let i = 0; i < textArray.length; i++) {
                newText += textArray[i] + " ";
            }

            return newText.slice(0, -1);
        }
    }
}

const ReplacementRule = {
    All: 'All',
    StartOfWord: 'StartOfWord',
    EndOfWord: 'EndOfWord',
    FirstWord: 'FirstWord',
    LastWord: 'LastWord'
}
//#endregion

var inputField = document.getElementById("textInput");
var wordData = {};

var x = new GrammarRule_Swap();
console.log(x.abc);
x.Apply();

const testText = "old-test-test is a test";
var temp = new CharacterRule("old-test", "new-test", ReplacementRule.All);
console.log(temp.Apply(testText));
var temp = new CharacterRule("test", "text", ReplacementRule.LastWord);
console.log(temp.Apply(testText));

//LoadCookieData();
//WipeTranslatorCookies();
//document.cookie = "Hi=Test1;";
//document.cookie = "Bye=Test2;";

//var exampleData = "{ \"wordData\": { \"know\" : [ \"verb\" ] } }";
//var exampleJSON = JSON.parse(exampleData);

//console.log(exampleData);
//console.log(exampleJSON);


// Well... This is kinda akward, but I just found out that most browsers may only support up to 4MB of cookies per domain, which is obviously way too little to buffer data AND store other data.
// Guess we'll have to download the data anew every time we open the site

// #######
// COOKIES
// #######
// Cookies are used exclusively to buffer data

function WipeTranslatorCookies() {
    document.cookie = "TranslatorData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Get the translators cookie data and load it into wordData
function LoadCookieData() {
    // Get all cookies and filter out the translator one
    let allCookies = document.cookie;
    let translatorCookie = "";
    allCookies.split(';').forEach(cookie => {
        let [name, value] = cookie.split('=');

        if (name == "TranslatorData") {

        }
    });
    wordData = {};

}

function StoreCookieData() {
    console.log("Storing all word data!");

    let translatorData = "{";

    for (const word in wordData) {
        // Add the word as key
        let _wordData = "\"" + word + "\":";

        // Add the word data
        _wordData += JSON.stringify(wordData[word]);

        // Slice off the last comma and close the
        //_wordData = _wordData.slice(0, -1);
        //_wordData += "]";

        console.log(_wordData);
        // Append the new substring to the whole
        translatorData += _wordData + ",";
    }

    // Slice off the last comma, if we had one (we only shouldn't have one in case our entire word data is empty)
    if (translatorData.endsWith(','))
        translatorData = translatorData.slice(0, -1);

    console.log(translatorData);

    translatorData += "}";

    // Make the cookie expire 100 years from now
    let expireDate = new Date(Date.now());
    expireDate.setUTCFullYear(expireDate.getUTCFullYear() + 100);

    document.cookie = "TranslatorData=" + translatorData + "; expires=" + expireDate.toUTCString() + ";";
    console.log("Done!");
}

// #########################
// GRAMMAR / WORD TYPE RULES
// #########################

// TODO: READ/WRITE Cookie with word data

// Entry point for text pre-analysis
function AnalyzeText() {
    // Get text
    let originalText = "";

    if (inputField.value == "") {
        originalText = inputField.placeholder;
    }
    else {
        originalText = inputField.value;
    }

    // Split up text into array
    let wordList = ProcessInput(originalText);

    // Convert array into a set and back to easily remove duplicate elements
    let wordsUnique = [...new Set(wordList)];

    // Gather all unknown words
    let wordsUnknown = [];
    wordsUnique.forEach(word => {
        if (!(word in wordData)) {
            wordsUnknown.push(word);
        }
    });

    // Retrieve the info for all new words from the API
    GatherNewWordInfo(wordsUnknown).then(function () {
        DisplayInfo(wordList);
        //StoreCookieData();
    });
}

// Brings user input into an easier to manage shape
function ProcessInput(textInput) {
    // Remove special chars
    let text = textInput.replace(/[^a-zA-Z ]/g, "");

    // Split into array
    return text.split(" ");
}

// Retrieves new API info about previously unused words
async function GatherNewWordInfo(words) {
    if (words == undefined || words.length < 1) {
        return;
    }

    // Measure performance
    let startTime = performance.now();

    let baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    let urls = [];
    let results = [];
    let jsons = [];

    // Construct all urls
    words.forEach(word => {
        urls.push(baseURL + word);
    });

    // Obtain results for each url
    for await (const url of urls) {
        results.push(await fetch(url, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }));
    }

    //console.log("Got " + results.length + " new results and fetched " + knownWords.length + " old ones");

    // Convert all results to json
    for await (const result of results) {
        jsons.push(await result.json());
    }

    console.log("Got " + jsons.length + " jsons");

    // Perform final operations on jsons
    for (let i = 0; i < jsons.length; i++) {
        //console.log(jsons[i]);
        let json = StripWordData(jsons[i]);

        wordData[words[i]] = json;
    }

    // Measure performance
    let endTime = performance.now();

    console.log("Fetched " + words.length + " new words in " + (endTime - startTime) + " ms");
}

// Removes useless word data to save memory & storage space
function StripWordData(json) {
    for (let i = 0; i < json.length; i++) {
        // In top level of each result for the word
        // "word": delete, we're using it as key anyway
        delete json[i].word;
        // "phonetic": keep, we might need it later
        // "phonetics": delete, user can look it up themselves
        delete json[i].phonetics;
        // "meanings": move all "partOfSpeech" values into array and replace "meanings" with it, user should know definitions or can look them up if unsure
        let meanings = [];
        for (const meaning of json[i].meanings) {
            meanings.push(meaning.partOfSpeech);
        }
        json[i].meanings = meanings;
        // "license": delete, it saves space ^^'
        delete json[i].license;
        // "sourceUrls": delete, we likely won't need it
        delete json[i].sourceUrls;
    }

    return json;
}

// Displays retrieved info
function DisplayInfo(words) {
    console.log("Printing results for " + words.length + " words");
    let ul = document.getElementById("ResultList");
    ul.innerHTML = '';

    for (const word of words) {
        let wordTypes = GetWordTypes(word);
        let newLI = document.createElement('li');

        newLI.innerHTML = word + ": ";

        for (const word of wordTypes) {
            newLI.innerHTML += word + ", ";
        }

        ul.append(newLI);
    }
}


// ###############
// PARSING HELPERS
// ###############

// These methods handle direct data retrieval from the jsons retrieved from the API at https://api.dictionaryapi.dev/api/v2/entries/en/book
function GetWordTypes(word) {
    //console.log("Getting word types for " + word);
    let data = wordData[word];
    let wordTypes = [];

    for (const entry of data) {
        for (const meaning of entry.meanings) {
            wordTypes.push(meaning);//.partOfSpeech);
        }
        //console.log(entry);
    }

    wordTypes = [...new Set(wordTypes)];

    return wordTypes;
}








const debugLevel = 1;

function Log(msg, lvl = 1) {
    if (lvl <= debugLevel) {
        console.log(msg);
    }
}

// Deprecated test method
function TestSend() {
    alert("TEST");

    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/book", {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

// Deprecated
// Retrieves info of a specific word from the API
async function RetrieveWikiInfo(word) {
    // All hail https://dictionaryapi.dev/
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

    fetch(url, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => HandleWikiInfo(word, json));
}

// Deprecated helper method for data retrieval
function HandleWikiInfo(word, wikiInfo) {
    console.log("Retrieved info for " + word);
    wordData[word] = wikiInfo;
}