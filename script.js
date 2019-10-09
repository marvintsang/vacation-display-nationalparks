const baseUrl = 'https://developer.nps.gov/api/v1/parks?'
$(searchUserEntry);
const apiKey = 'HhyyO5DqQjymRCiVK9aAhj3v4KhnyiadzfVEtSEJ'

function searchUserEntry(){
    $('form').submit(function(event){
        event.preventDefault();
        let userInput = $('#stateSearch').val();
        let formMax = $('#maxSearch').val();
        let formInput = userInput.replace(/[ ,]+/g, ",");
        //console.log(formInput);
        searchUrl = `${baseUrl}statecode=${formInput}&api_key=${apiKey}&limit=${formMax}`
        //console.log(searchUrl);
        searchGet(searchUrl)
    })
}

function formatSearchEntry(formInput, formMax=10){

}

function searchGet(searchUrl){
    fetch(searchUrl)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson=>displayResults(responseJson))
}

function displayResults(responseJson){
    //console.log(responseJson);
    //console.log(responseJson.data[0].fullName);
    //console.log(responseJson.data[0].description);
    //console.log(responseJson.data[0].url);
    //console.log(responseJson.limit);
    $('.searchResults').empty();
    maxResultsReturn = parseInt(responseJson.limit)
    for (i=0;i<maxResultsReturn;i++){
        $('.searchResults').append(`<div class=resultBox>
        <p>${responseJson.data[i].fullName}</p>
        <p>${responseJson.data[i].description}</p>
        <p><a href=${responseJson.data[i].url}>${responseJson.data[i].url}<a/></p>
        </div>`
    )}
}