$(() => {
            
    $('form').submit((e) => {
        let formData = {
            'name': $('#inputName').val(),
            'phone': $('#inputPhone').val(),
            'email': $('#inputEmail').val(),
            'password': $('#inputPassword').val()
        }
        $.ajax({
            type: 'POST',
            url: 'api/user',
            data: formData,
            dataType: 'json',
            encode: true
        })
            .done((result) => {
                let rep = document.querySelector('#reprt');
                const {data} = result;
                console.log(data);
                rep.classList.add('alert');
                rep.textContent = `Account ${data.email} created successfuly`;
            }) 
        e.preventDefault();
    });

});