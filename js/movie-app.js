$(document).ready( function(){
    "use strict";

    const url = "https://https://handsome-zany-staircase.glitch.me/movies"
    // const url = "https://ruddy-imaginary-peony.glitch.me/movies";
    const mainRow = $('.main-row')//in html file
    let modalContainer = $('.modal-container')//in html and at bottom
    let mainHTML = ""
    let modelHTML = ""                        //at bottom creatmodel function



    //!!!!need this to fetch data , all info from json move file on glitch
    const fetchData = () => {

        mainRow.toggle('hidden')

        fetch(url)
            .then(res => res.json())
            .then(data => {
                renderHTML(data);
            })

            .then(mainRow.toggle('hidden'))
            .catch(error => console.error(error))
    }


    //!!!!!renders onto cards
    const renderHTML = data => {
        mainHTML = ""
        modelHTML = ""
        createMovie(data)
        for(let obj of data) {
            mainHTML += `<div >
                                <div class="card" style="width: 18rem;">
                                       <div class="info${obj.id} "><!-- sset to hidden to hide cards along with const loading = $('.loading') at top-->
                                            <div class="card-body">
                                                <h5 >${obj.title}</h5>
                                                <p >Rating: ${obj.rating}</p>
                                            </div>
                                      </div>
                                </div>
                          </div>`


        }
        mainRow.html(mainHTML)

    }
    //card popup
    const createMovie = data => {

        modalContainer.html(modelHTML)
    }



    fetchData();

})


// <img id="movie${obj.id}" src="${obj.poster}" alt="Movie Poster" >




//
// [
// {
//     "id": 1,
//     "title": "Universal Soldier: The Return",
//     "rating": "1"
// },
//     {
//         "id": 2,
//         "title": "Eraserhead",
//         "rating": "3"
//     },
//     {
//         "id": 3,
//         "title": "War of the Worlds",
//         "rating": "4"
//     },
//     {
//         "id": 4,
//         "title": "The Matrix",
//         "rating": "5"
//     },
//     {
//         "id": 5,
//         "title": "Star Wars",
//         "rating": "5"
//     },
//     {
//         "id": 6,
//         "title": "The Fellowship of the Ring",
//         "rating": "5"
//     },
//     {
//         "id": 7,
//         "title": "Shine",
//         "rating": "5"
//     }
// ]
