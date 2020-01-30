const unirest = require('unirest');
const convert = require('xml-js');
const fs = require('fs');


const fetchXML = (url , numberOfForecasts = 5) => {
    unirest.get(url).end( response => {
        if ( response.error ) { //return error object
            return response.error
        }
        else {
            const xml = response.body;
            const js = convert.xml2js(xml, {compact: true, spaces: 1});
            // const n = numberOfForecasts  //number of forecasts, 0-indexed
            const finalObj = parse(js, numberOfForecasts ) 
            finalObj["url"] = url;
            const file =  JSON.stringify(finalObj);
            writeToFile( file );
            return finalObj;
        }
    });
}

// writes to forecast.json
const writeToFile = ( filetext ) => {
    fs.writeFile("forecast.json", filetext, (err) => {
        if(err) {
            return console.log(err);
        }
    })  
}

/* parse the js object into the specification in README */
const parse = ( obj, n ) => {
    const forecast = obj.weatherdata.forecast;
    const location = forecast.text.location._attributes.name;
    const time = forecast.tabular.time;
    const json = {};
    const weather = [];
    json["name"] = location;;
    json["fetched"] = getTime();
    //making the object to the specs like in readme
    for (i = 0; i <= Math.min(n, time.length) -1 ; i++) {
        let obj = {};
        const t = time[i]
        obj["from"] = t._attributes.from;
        obj["to"] = t._attributes.to;
        obj["symbol"] = t.symbol._attributes.var;
        obj["rain"] = t.precipitation._attributes;
        obj["temperature"] = t.temperature._attributes.value;
        weather[i] = obj;
    } 
    json["forecast"] = weather;
    return json;
}


/* returns current time on format YYYY-MM-DDTHH:MM:SS */
const getTime = () => {
    const d = new Date();
    const s = d.getFullYear() + "-" +
              d.getMonth()    + "-" + 
              d.getDate()     + "T" +
              d.getHours()    + ":" + 
              d.getMinutes()  + ":" +
              d.getSeconds();
    return s;
}


url = "https://www.yr.no/place/Norway/Tr%C3%B8ndelag/Trondheim/Trondheim/forecast.xml";
fetchXML(url ); 
