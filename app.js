//  Global Constants

const apiKey = "FiRt0VbMxNFbUK4vh5UjP47SFphUB0kA";
const limit = 3;
const trendingLimit = 50;
var pages = 0;
const rating = "";

let gifForm = document.querySelector("form");
let resultsElement = document.querySelector(".Results");

console.log(gifForm);

// LoadingType either loads more gifs of a type, or resets completely

async function getTrending(){
    const requestURL = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${trendingLimit}`;

    // evt.preventDefault();
    loadingType = 0;
    console.log("heyooooo")

    try{
        // requesting data and waiting for it
        let response = await fetch(requestURL);

        // var for data that has finally arrived, must wait on the fetch
        let responseData = await response.json();

        console.log(responseData);

        generateHTML(responseData, loadingType);

    }
    catch(e){
        console.log("Error = " + e)
    }
    

}

function getResults(loadingType){

    query = handleFormSubmit();

    offset = pages * limit;

    const requestURL = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}`;
    
    gifForm.addEventListener("submit", async evt => {

        evt.preventDefault();
        console.log(evt);
        try{
            // requesting data and waiting for it
            let response = await fetch(requestURL);

            // var for data that has finally arrived, must wait on the fetch
            let responseData = await response.json();

            console.log(responseData);

            generateHTML(responseData, loadingType);
            console.log(loadingType);

        }
        catch(e){
            console.log("Error = " + e)
        }

    })
}

function generateHTML(gifData, loadingType) {
    console.log("loading type is " + loadingType)
    if (loadingType == 0){
        pages += 1
        resultsElement.innerHTML = '';
        document.querySelector("#loadMoreGifs").removeAttribute("hidden");

    }
    else{
    pages += 1
    }

    const gifDataItems = gifData.data.forEach(element => {
        console.log(element.username)
        resultsElement.innerHTML += `
        <div class = "box">
        <img src="${element.images.fixed_height.url}" alt="${element.title}" />
        <figcaption>${element.title}, ${element.username}</figcaption>
        </div>
    `;
    });
 
}

function handleFormSubmit(){


    searchName = document.querySelector("#gName").value;
    console.log(searchName);

    return searchName;
}

  window.onload = function(){
    console.log("HEY ITS WORKING")
    getTrending();
  }

 
