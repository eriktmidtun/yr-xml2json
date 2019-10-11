# yr-xml2json

api for fetching data from yr.no in xml format and converting it into a minimized json file.

url input format: "https://www.yr.no/place/Norway/Tr%C3%B8ndelag/Trondheim/Trondheim/forecast.xml"

json output format:
```json
{
  "name": "Trondheim",
  "fetched": "2019-9-10T19:48:50",
  "forecast": [
    {
      "from": "2019-10-10T20:00:00",
      "to": "2019-10-11T00:00:00",
      "symbol": "01n",
      "rain": { "value": "0" },
      "temperature": "5"
    },
    {
      "from": "2019-10-11T00:00:00",
      "to": "2019-10-11T06:00:00",
      "symbol": "40n",
      "rain": { "value": "0.8", "minvalue": "0.5", "maxvalue": "1.2" },
      "temperature": "3"
    },
    {
      "from": "2019-10-11T06:00:00",
      "to": "2019-10-11T12:00:00",
      "symbol": "03d",
      "rain": { "value": "0", "minvalue": "0", "maxvalue": "0.3" },
      "temperature": "5"
    },
    {
      "from": "2019-10-11T12:00:00",
      "to": "2019-10-11T18:00:00",
      "symbol": "04",
      "rain": { "value": "0" },
      "temperature": "8"
    }
  ]
}
```

symbol is used to fetch png from url on format:
https://yr.github.io/weather-symbols/png/100/< symbol >.png
