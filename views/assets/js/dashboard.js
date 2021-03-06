$.get('/getSessId', ({sessId}) => {
  if (!sessId) {
      location.replace('/');
  }
});


// Define SPA routes

const addContact = () => {
  

  return `<div class="panel-heading">
  <a href="" id="" class="btn btn-default">
    <i class="glyphicon glyphicon-arrow-left"></i> 
  </a>
  <strong>Add Contact</strong>
</div>
<div id="reprt" class="" role="alert">
                
</div>
<form method="POST" enctype="multipart/form-data">           
<div class="panel-body">
  <div class="form-horizontal">
    <div class="row">
      <div class="col-md-8">
        <div class="form-group">
          <label for="name" class="control-label col-md-3">Name</label>
          <div class="col-md-8">
            <input type="text" name="name" id="name" required="" class="form-control">
          </div>
        </div>
        
        <div class="form-group">
          <label for="phone" class="control-label col-md-3">Phone</label>
          <div class="col-md-8">
            <input type="phone" name="phone" id="phone" required="" class="form-control">
          </div>
        </div>
        
        <div class="form-group">
          <label for="email" class="control-label col-md-3">Email</label>
          <div class="col-md-8">
            <input type="email" name="email" id="email" required="" class="form-control">
          </div>
        </div>
        
        <div class="form-group">
          <label for="name" class="control-label col-md-3">Address</label>
          <div class="col-md-8">
            <textarea name="address" id="address" rows="3" class="form-control"></textarea>
          </div>
        </div>

        <div class="form-group">
          <label for="company" class="control-label col-md-3">Company</label>
          <div class="col-md-8">
            <input type="text" name="company" id="company" class="form-control">
          </div>
        </div>

        <div class="form-group">
            <label for="occupation" class="control-label col-md-3">Occupation</label>
            <div class="col-md-8">
              <input type="text" name="occupation" id="occupation" class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label for="relationship" class="control-label col-md-3">Relationship</label>
            <div class="col-md-5">
              <select name="relationship" id="relationship" class="form-control">
                <option value="">Select group</option>
                <option value="family">Family</option>
                <option value="friend">Friend</option>
                <option value="co-worker">Co-Worker</option>
              </select>
            </div>
          
          </div>
        
      </div>
      <div class="col-md-4">
        <div class="fileinput fileinput-new" data-provides="fileinput">
          <div class="fileinput-new thumbnail" style="width: 150px; height: 150px;">
            <img src="http://placehold.it/150x150" alt="Photo">
          </div>
          <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
          <div class="text-center">
            <span class="btn btn-default btn-file"><span class="fileinput-new">Choose Photo</span><span class="fileinput-exists">Change</span><input type="file" name="photo" id="photo"></span>
            <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="panel-footer">
  <div class="row">
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-offset-3 col-md-6">
          <button type="submit" class="btn btn-primary">Save</button>
          <a href="#" class="btn btn-default">Cancel</a>
        </div>
      </div>
    </div>
  </div>
</div>
</form>
</div>
</div>`;
}

const dFullDetails = (data) => {
  let {contact_id, name, phone, email, address, company, occupation, relationship, photo} = data;
  let leters = name.split('');
    
    let contactPic;

    if (photo) {
      contactPic =`<img class="media-object" src="${photo}">`;
    } else {
      contactPic = `<div id="img-alt" class="imgAlt">${leters[0].toUpperCase()}<p></p></div>`;;
    } 

  return `<table class="table">
  <tr>
    <td class="middle">
      <div class="media">
        <div class="media-left">
          <div class="user-photo">
            ${contactPic}
          </div>
        </div>
        <div class="media-body">
          
          <address>
            <ul>
                <ul class="list-group">
                    <li class="list-group-item active"><h4 class="">${name}</h4></li>
                    <strong>Phone</stong><li class="list-group-item"> ${phone}</li>
                    <strong>Email</stong><li class="list-group-item">${email}</li>
                    <strong>Address</stong><li class="list-group-item">${address}</li>
                    <strong>Company</stong><li class="list-group-item">${company}</li>
                    <strong>Occupation</stong><li class="list-group-item">${occupation}</li>
                    <strong>Relationship</stong><li class="list-group-item">${relationship}</li>
                </ul>
            </ul> 
          </address>
        </div>
      </div>
    </td>
    <td width="150" class="middle">
        <div>
          <a onclick="const editContact = ${editFunc}(${contact_id})" id="edit" class="btn btn-circle btn-default btn-xs" title="Edit">
            <i class="glyphicon glyphicon-edit"></i>
          </a>
          <a onclick="const deleteContact = ${deleteFunc}(${contact_id})" id="del" class="btn btn-circle btn-danger btn-xs" title="Delete">
            <i class="glyphicon glyphicon-remove"></i>
          </a>
        </div>
      </td>
    </td>
  </tr>
</table>`;
}

const dEditContact = (data) => {
  let {contact_id, name, phone, email, address, company, occupation, relationship, photo} = data;
  let contactPic;
  photo? contactPic = photo : contactPic = 'http://placehold.it/150x150';

  return `<div class="panel-heading">
  <a href="" id="" class="btn btn-default">
    <i class="glyphicon glyphicon-arrow-left"></i> 
  </a>
  <strong>Edit Contact</strong>
</div>
<div id="reprt" class="" role="alert">
                
</div>
<form method="POST" enctype="multipart/form-data">          
<div class="panel-body">
  <div class="form-horizontal">
    <div class="row">
      <div class="col-md-8">
        <div class="form-group">
          <label for="name" class="control-label col-md-3">Name</label>
          <div class="col-md-8">
            <input type="text" name="name" id="name" value="${name}" class="form-control">
          </div>
        </div>
        
        <div class="form-group">
          <label for="phone" class="control-label col-md-3">Phone</label>
          <div class="col-md-8">
            <input type="text" name="phone" id="phone" value="${phone}"  class="form-control">
          </div>
        </div>
        
        <div class="form-group">
          <label for="email" class="control-label col-md-3">Email</label>
          <div class="col-md-8">
            <input type="text" name="email" id="email" value="${email}"  class="form-control">
          </div>
        </div>
        
        <div class="form-group">
          <label for="name" class="control-label col-md-3">Address</label>
          <div class="col-md-8">
            <textarea name="address" id="address" rows="3"  class="form-control"></textarea>
          </div>
        </div>

        <div class="form-group">
          <label for="company" class="control-label col-md-3">Company</label>
          <div class="col-md-8">
            <input type="text" name="company" id="company" value="${company}"  class="form-control">
          </div>
        </div>

        <div class="form-group">
            <label for="occupation" class="control-label col-md-3">Occupation</label>
            <div class="col-md-8">
              <input type="text" name="occupation" id="occupation" value="${occupation}"  class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label for="relationship" class="control-label col-md-3">Relationship</label>
            <div class="col-md-5">
              <select name="relationship" id="relationship" class="form-control">
                <option value="">Select group</option>
                <option value="family">Family</option>
                <option value="friend">Friend</option>
                <option value="co-worker">Co-Worker</option>
              </select>
            </div>
            
          </div>
        
      </div>
      <div class="col-md-4">
        <div class="fileinput fileinput-new" data-provides="fileinput">
          <div class="fileinput-new thumbnail" style="width: 150px; height: 150px;">
            <div class="user-photo">
              <img src="${contactPic}" alt="Photo">
            </div>
          </div>
          <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
          <div class="text-center">
            <span class="btn btn-default btn-file"><span class="fileinput-new">Choose Photo</span><span class="fileinput-exists">Change</span><input type="file" id="photo" name="photo" value=""></span>
            <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="panel-footer">
  <div class="row">
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-offset-3 col-md-6">
          <button type="submit" class="btn btn-primary">Save</button>
          <a href="#" type="reset" class="btn btn-default">Cancel</a>
        </div>
      </div>
    </div>
  </div>
</div>
</form>`;
}

const logOutRoute = () => {
  $('#logOut').click(() => {
    $.get('/logout');
  });
}

$(() => {

  logOutRoute();

const contListTab = `<table class="table">
  <div data-contact-report class="alert-primary"></div>
  <tr>
  </tr>
  <!-- table to append contact -->
</table>`;
  
// Define functions, Arrays, and variables
  const contact = (result) => {
    let {contact_id, name, phone, email, address, company, occupation, relationship, photo} = result;
    let leters = name.split('');
    
    let contactPic;

    if (photo) {
      contactPic =`<img class="media-object" src="${photo}">`;
    } else {
      contactPic = `<div id="img-alt" class="imgAlt">${leters[0].toUpperCase()}<p></p></div>`;;
    } 


    return `<tr>
            <td class="middle">
              <div class="media">
                <div class="media-left">
                  <div class="user-photo">
                    ${contactPic}
                  </div>
                </div>
                  <div class="media-body">
                    <h4 class="media-heading">${name}</h4>
                    <address>
                      <strong>${occupation}</strong> <strong><span class="media-heading">${company}</span></strong>
                      <div>${phone}</div>
                      <div>${email}</div>
                    </address>
                  </div>
                </div>
              </td>
              <td width="150" class="middle">
                <div>
                  <a onclick="const getFullDetails = ${fullDetailFunc}(${contact_id})" id="details" class="btn btn-circle btn-primary btn-xs" title="More Details">
                    <i class="glyphicon glyphicon-zoom-out"></i>
                  </a>
                  <a onclick="const editContact = ${editFunc}(${contact_id})" id="edit" class="btn btn-circle btn-default btn-xs" title="Edit">
                    <i class="glyphicon glyphicon-edit"></i>
                  </a>
                  <a onclick="const deleteContact = ${deleteFunc}(${contact_id})" id="del" class="btn btn-circle btn-danger btn-xs" title="Delete">
                    <i class="glyphicon glyphicon-remove"></i>
                  </a>
                </div>
              </td>
            </tr>`;  
  }
    
    const family = [];
    const allContact = [];
    const friends = [];
    const coWorker = [];

    const addContactRoute = () => {
      $('#addCont').click((e) => {
        e.preventDefault();
        $('#dContainer').html(addContact);
        addNewContact();
      });
    }

    $.get('/api/contacts', ({data}) => {

      // ---- Display all contacts on document load ---- 
      data.forEach(result => {
        let {name, relationship} = result;
        $('.table').append(contact(result));
        
        allContact.push(name);
        
        if (relationship.toLowerCase() == 'family') {
          family.push(name);
        }

        if (relationship.toLowerCase() == 'friend') {
          friends.push(name);
        }

        if (relationship.toLowerCase() == 'co-worker') {
          coWorker.push(name);
        }
      })

      if (allContact.length == 0 ) {
        $('[data-contact-report]').addClass('alert');
        document.querySelector('[data-contact-report]').textContent = 'Welcome to My Contact! Please, click the add contact button above to add your contacts.';
      }else{
        $('[data-contact-report]').removeClass('alert');
        document.querySelector('[data-contact-report]').textContent = '';
      }
      
      // Display all contacts on clicking all contacts
      $('#allContact').click((e) => {
        e.preventDefault();
        $('#dContainer').html(contListTab);
        $('tr').remove();
        data.forEach(result => {
          let {name, relationship} = result;
          $('.table').append(contact(result));
        })
      });
      
      // ---- Display Groups ----
      $('#family').click((e) => {
        e.preventDefault();
        $('#dContainer').html(contListTab);
        $('tr').remove();
        data.forEach(result => {
          let {name, relationship} = result;
          if (relationship.toLowerCase() == 'family') {
            $('.table').append(contact(result));
          }
        })
        if (family.length == 0 ) {
          $('[data-contact-report]').addClass('alert');
          document.querySelector('[data-contact-report]').textContent = 'No contacts found in Family';
        }else{
          $('[data-contact-report]').removeClass('alert');
          document.querySelector('[data-contact-report]').textContent = '';
        }
        
      });
      

      $('#friends').click((e) => {
        e.preventDefault();
        $('#dContainer').html(contListTab);
        $('tr').remove();
        data.forEach(result => {
          let {relationship} = result;
          if (relationship.toLowerCase() == 'friend') {
            $('.table').append(contact(result));
          }
        })
        if (friends.length == 0 ) {
          $('[data-contact-report]').addClass('alert');
          document.querySelector('[data-contact-report]').textContent = 'No contacts found in Friends';
        }else{
          $('[data-contact-report]').removeClass('alert');
          document.querySelector('[data-contact-report]').textContent = '';
        }
        
      });

      $('#others').click((e) => {
        e.preventDefault();
        $('#dContainer').html(contListTab);
        $('tr').remove();
        data.forEach(result => {
          let {relationship} = result;
          if (relationship.toLowerCase() == 'co-worker') {
            $('.table').append(contact(result));
          }
        })
        if (coWorker.length == 0 ) {
          $('[data-contact-report]').addClass('alert');
          document.querySelector('[data-contact-report]').textContent = 'No contacts found in Co-Workers';
        }else{
          $('[data-contact-report]').removeClass('alert');
          document.querySelector('[data-contact-report]').textContent = '';
        }
      });

      // Displaying the group quantities
      $('[data-allContact-badge]').text(allContact.length);
      $('[data-family-badge]').text(family.length);
      $('[data-friends-badge]').text(friends.length);
      $('[data-others-badge]').text(coWorker.length);

    });

    addContactRoute();

});

  function fullDetailFunc(id) {
    $.get(`/api/contact/${id}`, ({data}) => {
      $('#dContainer').html(dFullDetails(data));
    });
  } 
  
  function editFunc(id) {
    $.get(`/api/contact/${id}`, ({data}) => {
      $('#dContainer').html(dEditContact(data));
      editOldContact(id);
    });
  }

  function deleteFunc(id) {
    if(!confirm(`Sure to delete ${id}`)) return;
    $.ajax({
      type: 'delete',
      url: `/api/contact/${id}`,
      data: id,
      dataType: 'json'
    })
      .done(({message, rows}) => {
        alert(`${rows} Rows ${message}`);
        location.reload();
      });

  }

  const addNewContact = () => {
    
    $('form').submit((e) => {
      e.preventDefault();
      const  formElement = document.querySelector("form");
      const formData = new FormData(formElement);
      const request = new XMLHttpRequest();
      request.open("POST", "/api/contact");
      
      request.send(formData);

      // $.post('/api/contact', formData, (result) => {
      //   console.log(result)
      //   let rep = document.querySelector('#reprt');
      //   if (result.error) {
      //     rep.classList.add('alert-danger');
      //     rep.classList.add('alert');
      //     rep.textContent = result.error;
      //     return;
      //   }
      //   console.log(result.message)
      //   rep.classList.add('alert-success');
      //   rep.classList.add('alert');
      //   rep.textContent = result.message;
      // })
        
    });
  }

  const editOldContact = (id) => {
    
    $('form').submit((e) => {
      e.preventDefault();
      const  formElement = document.querySelector("form");
      const formData = new FormData(formElement);
      const request = new XMLHttpRequest();
      request.open('PATCH', `/api/contact/${id}`);
      
      request.send(formData);

      // $.ajax({
      //   type: 'patch',
      //   url: `/api/contact/${id}`,
      //   data: formData,
      //   dataType: 'json'
      // })
        // .done((result) => {
        //   let rep = document.querySelector('#reprt');
        //   if (result.error) {
        //     rep.classList.add('alert-danger');
        //     rep.classList.add('alert');
        //     rep.textContent = result.error;
        //     return;
        //   }
        //   rep.classList.add('alert-success');
        //   rep.classList.add('alert');
        //   rep.textContent = result.message;
        // });
      // let form = $('form')
      // let formData = new FormData();
      // formData.append("username", "Groucho");
      // formData.append('name', $('#name').val());
      // formData.append('phone', $('#phone').val());
      // console.log(form.serialize)
    });
  }