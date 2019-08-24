$(() => {
  // Define functions, Arrays, and variables
    const contact = (result) => {
      let {name, phone, email, address, company, occupation, relationship, photo} = result;
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
                  <a href="#" class="btn btn-circle btn-danger btn-xs" title="Delete">
                    <i class="glyphicon glyphicon-remove"></i>
                  </a>
                </div>
              </td>
            </tr>`;
    }
    
    const family = [];
    const friends = [];
    const others = [];
    
    // ---- call get on the api and do DOM works in the Promise callback ----
    $.get('/api/contacts', ({data}) => {
      
      // ---- Display all contacts ---- 
      data.forEach(result => {
        $('.table').append(contact(result));
      })
      
      // ---- Display Groups ----
      $('#family').click((e) => {
        e.preventDefault();
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

    });
  });