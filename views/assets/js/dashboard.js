$(() => {
  // Define SPA routes
  const contListTab = `<table class="table">
  <div data-contact-report class="alert-primary"></div>
  <tr>
  </tr>
  <!-- table to append contact -->
</table>`;
  const addContact = `<div class="panel-heading">
  <strong>Add Contact</strong>
</div>           
<div class="panel-body">
  <div class="form-horizontal">
    <div class="row">
      <div class="col-md-8">
        <div class="form-group">
          <label for="name" class="control-label col-md-3">Name</label>
          <div class="col-md-8">
            <input type="text" name="name" id="name" class="form-control">
          </div>
        </div>
        
        <div class="form-group">
          <label for="phone" class="control-label col-md-3">Phone</label>
          <div class="col-md-8">
            <input type="text" name="phone" id="phone" class="form-control">
          </div>
        </div>
        
        <div class="form-group">
          <label for="email" class="control-label col-md-3">Email</label>
          <div class="col-md-8">
            <input type="text" name="email" id="email" class="form-control">
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
                <option value="1">Family</option>
                <option value="2">Friend</option>
                <option value="3">Other</option>
              </select>
            </div>
            <div class="col-md-3">
              <a href="#" id="add-group-btn" class="btn btn-default btn-block">Add Group</a>
            </div>
          </div>
        <div class="form-group" id="add-new-group">
          <div class="col-md-offset-3 col-md-8">
            <div class="input-group">
              <input type="text" name="new_group" id="new_group" class="form-control">
              <span class="input-group-btn">
                <a href="#" class="btn btn-default">
                  <i class="glyphicon glyphicon-ok"></i>
                </a>
              </span>
            </div>
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
            <span class="btn btn-default btn-file"><span class="fileinput-new">Choose Photo</span><span class="fileinput-exists">Change</span><input type="file" name="photo"></span>
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
</div>
</div>`;

// Define functions, Arrays, and variables

  const contact = (result) => {
    let {contact_id, name, phone, email, address, company, occupation, relationship, photo} = result;
    let contactPic = '';
    photo? contactPic = photo : contactPic = 'http://placehold.it/100x100';
      
    return `<tr>
            <td class="middle">
              <div class="media">
                <div class="media-left">
                   
                      <img class="media-object" src="${contactPic}" alt="...">
                    
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">${name}</h4>
                    <address>
                      <strong>${occupation}</strong> at <strong><span class="media-heading">${company}</span></strong>
                      <div>${phone}</div>
                      <div>${email}</div>
                    </address>
                  </div>
                </div>
              </td>
              <td width="150" class="middle">
                <div>
                  <a href="contactdetails.html" class="btn btn-circle btn-primary btn-xs" title="More Details">
                    <i class="glyphicon glyphicon-zoom-out"></i>
                  </a>
                  <a href="editcontact.html" class="btn btn-circle btn-default btn-xs" title="Edit">
                    <i class="glyphicon glyphicon-edit"></i>
                  </a>
                  <a href="#" id="del" class="btn btn-circle btn-danger btn-xs" title="Delete">
                    <i class="glyphicon glyphicon-remove"></i>
                  </a>
                </div>
              </td>
            </tr>`;  
    }
    
    const family = [];
    const allContact = [];
    const friends = [];
    const others = [];
    
    // ---- call get on the api and do DOM works in the Promise callback ----
    $.get('/api/contacts', ({data}) => {
      
      // ---- Display all contacts ---- 
      data.forEach(result => {
        $('.table').append(contact(result));
        allContact.push(name);
      })
      console.log(allContact.length);
      
      // ---- Display Groups ----
      $('#family').click((e) => {
        e.preventDefault();
        $('#dContainer').html(contListTab);
        $('tr').remove();
        data.forEach(result => {
          let {name, relationship} = result;
          if (relationship.toLowerCase() == 'family') {
            $('.table').append(contact(result));
            family.push(name);
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
          if (relationship.toLowerCase() == 'friends') {
            $('.table').append(contact(result));
            friends.push(name);
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
          if (relationship.toLowerCase() == 'others') {
            $('.table').append(contact(result));
            others.push(name);
          }
        })
        if (others.length == 0 ) {
          $('[data-contact-report]').addClass('alert');
          document.querySelector('[data-contact-report]').textContent = 'No contacts found in Others';
        }else{
          $('[data-contact-report]').removeClass('alert');
          document.querySelector('[data-contact-report]').textContent = '';
        }
      });

      // Request to delete a contact
      $('#del').click((e) => {
        e.preventDefault();
        console.log(data);
      });
    });

    // Get the addContact route
    $('#addCont').click((e) => {
      e.preventDefault();
      $('#dContainer').html(addContact);
    });
    
    
  });