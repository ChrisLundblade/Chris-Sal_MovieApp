$(document).ready( function(){
    "use strict";

    const moviesURL = "https://handsome-zany-staircase.glitch.me/movies";
    //const moviesURL = "https://ruddy-imaginary-peony.glitch.me/movies";
    const mainRow = $('.main-row');//in html file
    const loadingDiv = $('#loading');
    //in html and at bottom
    //at bottom creatmodel function

    //!!!!need this to fetch data , all info from json move file on glitch
    const fetchData = () => {

        fetch(moviesURL)
            .then(res => res.json())
            .then(data => {
                return renderHTML(data);
            })
            // .then(mainRow.toggle('visible'))
            // .then($('#loading').toggle())
            .then(loadingDiv.toggle("fast",function (){mainRow.toggle("slow")}))
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
        //mainRow.toggle('hidden');
        mainRow.toggle("fast",function (){loadingDiv.toggle("slow")});
        fetch(`${moviesURL}/${id}`, options)
            .catch(error => console.log(error));

            //.then(fetchData());
        await new Promise((resolve) => setTimeout(resolve, 2000));
        fetchData();
    }


    const editMovie = async (id, title, rating) =>{
        let options = {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                title: title,
                rating: rating,
                id: id
            })
        };
        mainRow.toggle("fast");
        loadingDiv.toggle("slow");

        fetch(`${moviesURL}/${id}`, options)
            //.then(data => console.log(data))
            .catch(error => console.log(error));

        await new Promise((resolve) => setTimeout(resolve, 2500));
        fetchData();
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
        mainRow.toggle("fast");
        loadingDiv.toggle("fast");
        fetch(moviesURL, options);

        await new Promise((resolve) => setTimeout(resolve, 2500));
        fetchData();
    }

    //!!!!!renders onto cards
    const renderHTML = data => {
        let mainHTML = "";
        let modelHTML = "";
        createMovie(modelHTML)
        for(let obj of data) {
            mainHTML += `<div>
                            <div class="card" style="width: 18rem;">
                               <div class="info${obj.id} "><!-- sset to hidden to hide cards along with const loading = $('.loading') at top-->
                                   <div class="card-body">
                                        <h5>${obj.title}</h5>
                                        <p>Rating: ${obj.rating}</p>
                                        <button class="delete btn btn-secondary" id="${obj.id}">Delete</button>
                                        <button class="edit btn btn-secondary">Edit</button>
                                        <form class="editForm">
                                            <button class="editSubmit btn btn-secondary" idValue="${obj.id}">Submit</button>
                                            
                                            <button class="closeForm btn btn-secondary" >Close</button>
                                            <br>
                                            Title: <input type="text" class="title">
                                            Rating: <select name="rating" class="rating">
                                                          <option value="1">1</option>
                                                          <option value="2">2</option>
                                                          <option value="3">3</option>
                                                          <option value="4">4</option>
                                                          <option value="5">5</option>
                                                    </select>                                            
                                        </form>     
                                    </div>
                               </div>
                            </div>
                      </div>`
        }
        mainRow.html(mainHTML);

    }

    //Listeners for buttons
    $("#addMovieSubmission").on('click', (e) =>{
        e.preventDefault();
        addMovie($("#title").val(), $("#rating").val())
        $("#title").val('');
        $("#rating").val('');
    });

    $(document).click(function(e){
        if($(e.target).hasClass('delete')){
            e.preventDefault();
            deleteMovie(e.target.id);
        } else if($(e.target).hasClass('edit')){
            e.target.nextElementSibling.style.display = 'block';
        } else if($(e.target).hasClass('editSubmit')){
            e.preventDefault();
            editMovie(e.target.getAttribute("idValue"),
                e.target.nextElementSibling.nextElementSibling.nextElementSibling.value,
                e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value
            );
        } else if($(e.target).hasClass("closeForm")){
            e.preventDefault();
            e.target.parentElement.style.display = 'none';
        }
    });

    //card popup
    const createMovie = data => {

        $('.model-container').html(data);
    }

    mainRow.toggle("fast");
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