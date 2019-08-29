const redirectToDashboard = (data, sessId) => {
    if (sessId) {
        location.replace("/dashboard.html");
    }
}

$(() => {
    $('form').submit((e) => {
        let formData = {
            'email': $('#loginEmail').val(),
            'password': $('#loginPassword').val()
        }
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: formData,
            dataType: 'json',
            encode: true
        })
            .done((result) => {
                let rep = document.querySelector('#reprt');
                if (result.error) {
                    rep.classList.add('alert');
                    rep.textContent = result.error;
                }
                // const {data, sessId} = result;
                // redirectToDashboard(data, sessId);
            }) 
        e.preventDefault();
    });
    // const registerPage = `
    //     <div class="text-center">
    //         <div id="reprt" class="alert-primary" role="alert">
                
    //         </div>
    //         <h2 style="color: rgb(12,103,187);">Register</h2>
    //     </div> 
    //     <img class="profile-img-card" src="assets/img/avatar_2x.png">
    //     <p class="profile-name-card"> </p>
    //     <form class="form-signin" method="POST" enctype="multipart/form-data">
    //         <span class="reauth-email"> </span>
    //         <input class="form-control" type="text" id="inputName" name="name" value="" required="" placeholder="Full Name" autofocus="">
    //         <input class="form-control" type="phone" id="inputPhone" name="phone" value="" required="" placeholder="Mobile Phone" autofocus="">
    //         <input class="form-control" type="email" id="inputEmail" name="email" value="" required="" placeholder="Email address">
    //         <input class="form-control" type="password" id="inputPassword" name="password" value="" required="" placeholder="Password">
    //         <div class="checkbox">
    //             <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-1"><label class="form-check-label" for="formCheck-1">Remember me</label></div>
    //         </div>
    //         <button class="btn btn-primary btn-block btn-lg btn-signin" type="submit" value="submit">Submit</button>
    //     </form>
    //     <div>
    //     Already registered? <a onclick="console.log('Back to login');" href="" id="login">Login Here</a>
    //     </div>`;

    // $('#register').click((e) => {
    //     e.preventDefault();
    //     $.get('/register', (data) => {
    //         // $('body').html(data);
    //         console.log(data)
    //     });
    //     // $('[data-form]').html(registerPage);
    // });

    // $('#login').click((e) => {
    //     e.preventDefault();
    //     // $('[data-form]').html(registerPage);
    //     console.log('Back to login');
    // });
});