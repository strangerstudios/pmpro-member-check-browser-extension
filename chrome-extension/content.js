// some setup
var PMProMemberCheck = {}
PMProMemberCheck.host = 'https://....com';
PMProMemberCheck.secret = 'seyYZdN8Mg4BzCks';

/**
 * Scan document for email addresses
 * From: https://stackoverflow.com/a/22997761
 */
PMProMemberCheck.get_emails = function() {
  var search_in = document.body.innerHTML;
  string_context = search_in.toString();

  array_mails = string_context.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

  // make unique
  array_mails = Array.from( new Set( array_mails ) );

  return array_mails;
}

/**
 * Check if an email is a member
 */
PMProMemberCheck.check_email = function( email ) {
  email = email.toLowerCase();

  // check the cache first
  let cached_value = sessionStorage.getItem('pmpro_member_check_' + email);
  if( cached_value !== null ) {
    if( cached_value > 0 ) {
      console.log(email + ' is a member of level ' + cached_value + '.');
    }
    return Promise.resolve(cached_value);
  }

  // value wasn't in cache, so let's hit the API
  let url = PMProMemberCheck.host + '/wp-admin/admin-ajax.php?action=member_check&key=' + PMProMemberCheck.secret + '&email=' + email;

  return fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    sessionStorage.setItem('pmpro_member_check_' + email, jsonData);
    if( jsonData > 0 ) {
      console.log(email + ' is a member of level ' + jsonData + '.');
    }
    return jsonData;
  })
  .catch(function(err) {
    console.log("Opps, Something went wrong!", err);
    return 0;
  })
}

let all_emails = PMProMemberCheck.get_emails();
let num_emails = all_emails.length;
for( i = 0; i < num_emails; i++ ) {
  PMProMemberCheck.check_email( all_emails[i] );
}
