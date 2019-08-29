$.get('/getSessId', ({sessId}) => {
    if (sessId) {
        location.replace('/dashboard');
    }
});
$(() => {

        $('form').submit((e) => {
            e.preventDefault();
            let formData = {
                'email': $('#loginEmail').val(),
                'password': $('#loginPassword').val()
            }
            $.post('/api/login', formData, (result) => {
                console.log(result)
                let rep = document.querySelector('#reprt');
                if (result.error) {
                    rep.classList.add('alert');
                    rep.textContent = result.error;
                    return;
                }
                
                location.replace('/dashboard');
            })
        })
});