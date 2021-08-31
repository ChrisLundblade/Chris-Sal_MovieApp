$(document).ready( function(){
    "use strict";

    const moviesURL = "https://handsome-zany-staircase.glitch.me/movies";
    //const moviesURL = "https://ruddy-imaginary-peony.glitch.me/movies";
    const mainRow = $('.main-row')//in html file
    //in html and at bottom
    //at bottom creatmodel function



    //!!!!need this to fetch data , all info from json move file on glitch
    const fetchData = () => {
        mainRow.toggle('hidden')
        if($)
        fetch(moviesURL)
            .then(res => res.json())
            .then(data => {
                $('#loading').toggle('hidden')
                return renderHTML(data);
            })
            .then(mainRow.toggle('hidden'))
            .catch(error => console.error(error))
    }

    const deleteMovie = async (id) =>{
        let options = {
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json',
            }
        };
        //$('#loading').toggle('hidden');
        fetch(`${moviesURL}/${id}`, options)
            .then(fetchData());
        //await new Promise((resolve) => setTimeout(resolve, 2500));
        //fetchData();
    }


    const editMovie = (id, newBodyObject) =>{
        let options = {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                title: "The Room",
                rating: 0,
                id: id
            })
        };
        fetch(`${moviesURL}/${id}`, options)
            //.then(data => console.log(data))
            .catch(error => console.log(error))
    }
    const addMovie = async (title, rating) =>{
        let options = {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                title: title,
                rating: rating
            })
        };
        fetch(moviesURL, options);
        await new Promise((resolve) => setTimeout(resolve, 2500));
        fetchData();
    }

    //!!!!!renders onto cards
    const renderHTML = data => {
        let mainHTML = ""
        let modelHTML = ""
        createMovie(modelHTML)
        for(let obj of data) {
            mainHTML += `<div>
                            <div class="card" style="width: 18rem;">
                               <div class="info${obj.id} "><!-- sset to hidden to hide cards along with const loading = $('.loading') at top-->
                                   <div class="card-body">
                                        <h5>${obj.title}</h5>
                                        <p>Rating: ${obj.rating}</p>
                                        <button class="delete" id="${obj.id}">Delete</button>
                                        <button class="edit">Edit</button>
                                        <form class="editForm">
                                            Movie Title: <input type="text" class="title">
                                            Movie Rating: <input type="text" class="rating">
                                        </form>     
                                    </div>
                               </div>
                            </div>
                      </div>`
        }
        mainRow.html(mainHTML)

    }

    //Listeners for buttons
    $("#addMovieSubmission").on('click', () =>{
        addMovie($("#title").val(), $("#rating").val())
    });

    $(document).click(function(e){
        if($(e.target).hasClass('delete')){
            deleteMovie(e.target.id);
        } else if($(e.target).hasClass('edit')){

        }
    });

    //card popup
    const createMovie = data => {

        $('.model-container').html(data)
    }



    fetchData();
    //setTimeout(addMovie(), 5000)
    //setTimeout(deleteMovie(8), 15000);
    //editMovie(2, {});

    //setTimeout(addMovie(), 30000)

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
