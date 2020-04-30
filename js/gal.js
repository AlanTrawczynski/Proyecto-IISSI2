'use strict';

axios.get('http://localhost:3000/photos?_sort=id&_order=desc&_limit=30').then(function (response) {
    if (response.status == 200) {
        let photos = response.data;

        for (let photo of photos) {
            axios.get(`http://localhost:3000/users/${photo.userId}`).then(function (response) {
                if (response.status == 200) {
                    let user = response.data;

                    showGal(photo, user);
                }
            }).catch(function (error) {
                console.log("Error al pedir el username: " + error);
            });
        }
    }
}).catch(function (error) {
    console.log("Error al pedir las fotos: " + error);
});


function showGal(photo, user) {
    $("#index-gal").append(generatePhoto(photo, user));

    $("#index-gal > :last-child > :first-child").on("click", function () {
        updatePhotoModal(this.lastElementChild.textContent);
    });
}

function generatePhoto(photo, user) {
    let html = `
        <div class='gal-photo-container'>
            <div class='pointer photo-modal-listener' data-toggle="modal" data-target="#photo-modal">  
                <img class='gal-photo' src="${photo.url}">
                <span hidden>${photo.id}</span>
            </div>
            <a class='photo-overlay photo-overlay-l' href="profile.php">
                <img class='profile-pic mr-2 ml-1' src="images/user.jpg" width='27.5px'>
                <span>@${user.user}</span>
            </a>

            <div class='photo-overlay photo-overlay-r'>
                <button type='button' class='btn btn-vote'>
                    <i class="fa fa-minus-circle fa-inverse" aria-hidden="true"></i>
                </button>
                <span>${photo.upvotes - photo.downvotes}</span>
                <button type='button' class='btn btn-vote'>
                    <i class="fa fa-plus-circle fa-inverse" aria-hidden="true"></i>
                </button>
            </div>   
        </div>`;

    return html;
}