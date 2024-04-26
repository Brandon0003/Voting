function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/spreadsheets"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
}

function loadClient() {
    gapi.client.setApiKey('AIzaSyCz6FWkosy2ihu5cUlarK2aMHWCMotqOlE');
    return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}

function execute(firstName, lastName, charity) {
    return gapi.client.sheets.spreadsheets.values.append({
        "spreadsheetId": "1cZItnCyguj3M1YiFuoqwDrPapg6I4xFzCWAeOeaRM2s",
        "range": "Charity Vote", // Change if your sheet's name is different
        "valueInputOption": 'USER_ENTERED',
        "resource": {
            "values": [
                [firstName, lastName, charity]
            ]
        }
    })
    .then(function(response) {
        console.log("Response", response);
    },
    function(err) { console.error("Execute error", err); });
}

gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "479487517150-m97k86h77q7ehfult16ma5g2pch5eovi.apps.googleusercontent.com"});
});

function addRowToGoogleSheet(firstName, lastName, charity) {
    authenticate().then(loadClient).then(() => execute(firstName, lastName, charity));
}