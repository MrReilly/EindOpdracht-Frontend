
import React from "react";

const databaseDummy = [
    {
        "id": 1,
        "category": {
            "category": "CONCERT"
        },
        "organizationName": "jadey bv",
        "name": "The Beatles",
        "location": "Nijmegen",
        "address": "Goffert Stadion",
        "lat": 51.8219,
        "lng": 5.8361,
        "entryPrice": "100 euro",
        "textDescription": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis",
        "startDate": "2023-02-01T00:00:00.000+00:00",
        "endDate": "2023-02-01T00:00:00.000+00:00",
        "starRating": null,
        "reviews": [],
        "imageData": null
    },
    {
        "id": 2,
        "category": {
            "category": "ART"
        },
        "organizationName": "jadey bv",
        "name": "Expo",
        "location": "Arnhem",
        "address": "Gallery",
        "lat": 51.9895,
        "lng": 5.9398,
        "entryPrice": "gratis",
        "textDescription": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis",
        "startDate": "2023-02-02T00:00:00.000+00:00",
        "endDate": "2023-02-03T00:00:00.000+00:00",
        "starRating": null,
        "reviews": [],
        "imageData": null
    },
    {
        "id": 3,
        "category": {
            "category": "FAIR"
        },
        "organizationName": "jadey bv",
        "name": "Kermis",
        "location": "Milsbeek",
        "address": "kerkstraat",
        "lat": 51.73231,
        "lng": 5.95397,
        "entryPrice": "10 euro",
        "textDescription": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis",
        "startDate": "2023-03-01T00:00:00.000+00:00",
        "endDate": "2023-03-06T00:00:00.000+00:00",
        "starRating": null,
        "reviews": [],
        "imageData": null
    },
    {
        "id": 4,
        "category": {
            "category": "CIRCUS"
        },
        "organizationName": "jadey bv",
        "name": "kerst circus",
        "location": "Apeldoorn",
        "address": "autoweg 1",
        "lat": 52.21037,
        "lng": 5.95772,
        "entryPrice": "100 euro",
        "textDescription": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis",
        "startDate": "2022-12-24T00:00:00.000+00:00",
        "endDate": "2022-12-24T00:00:00.000+00:00",
        "starRating": null,
        "reviews": [],
        "imageData": null
    },
    {
        "id": 5,
        "category": {
            "category": "CONFERENCE"
        },
        "organizationName": "jadey bv",
        "name": "Business",
        "location": "Cuijk",
        "address": "Cuijkseweg 20",
        "lat": 51.73475,
        "lng": 5.85178,
        "entryPrice": "50 euro",
        "textDescription": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis",
        "startDate": "2023-01-12T00:00:00.000+00:00",
        "endDate": "2023-01-12T00:00:00.000+00:00",
        "starRating": null,
        "reviews": [],
        "imageData": null
    },
    {
        "id": 6,
        "category": {
            "category": "SPORTS"
        },
        "organizationName": "jadey bv",
        "name": "Marathon",
        "location": "Beuningen",
        "address": "veldweg 40",
        "lat": 51.85262,
        "lng": 5.73503,
        "entryPrice": "10 euro",
        "textDescription": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis",
        "startDate": "2023-02-20T00:00:00.000+00:00",
        "endDate": "2023-02-20T00:00:00.000+00:00",
        "starRating": null,
        "reviews": [],
        "imageData": null
    },
    {
        "id": 7,
        "category": {
            "category": "NATURE"
        },
        "organizationName": "jadey bv",
        "name": "Walk",
        "location": "Nijmegen",
        "address": "Heumensoord",
        "lat": 51.80273,
        "lng": 5.87724,
        "entryPrice": "1 euro",
        "textDescription": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis",
        "startDate": "2023-02-09T00:00:00.000+00:00",
        "endDate": "2023-02-09T00:00:00.000+00:00",
        "starRating": null,
        "reviews": [],
        "imageData": null
    },
    {
        "id": 8,
        "category": {
            "category": "KIDS"
        },
        "organizationName": "jadey bv",
        "name": "Fun",
        "location": "Nijmegen",
        "address": "waalkade 1",
        "lat": 51.85034,
        "lng": 5.86022,
        "entryPrice": "5 euro",
        "textDescription": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis",
        "startDate": "2023-03-01T00:00:00.000+00:00",
        "endDate": "2023-03-02T00:00:00.000+00:00",
        "starRating": null,
        "reviews": [],
        "imageData": null
    },
    {
        "id": 9,
        "category": {
            "category": "THEATER"
        },
        "organizationName": "jadey bv",
        "name": "Opera",
        "location": "Malden",
        "address": "kerkplein 2",
        "lat": 51.78804,
        "lng": 5.84750,
        "entryPrice": "30 euro",
        "textDescription": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis",
        "startDate": "2023-01-05T00:00:00.000+00:00",
        "endDate": "2023-01-05T00:00:00.000+00:00",
        "starRating": null,
        "reviews": [],
        "imageData": null
    },
];
export default databaseDummy


/*{id: 1, lat: 51.844, lng: 5.845},
{id: 2, lat: 51.820, lng: 5.833},
{id: 3, lat: 51.866, lng: 5.823},
{id: 4, lat: 51.852, lng: 5.813}*/