$(function () {
  var gistList = $('.js-gist-list');

  function createGist () {
    var tokenField,
        tokenRegex = /^[a-f0-9]{40}$/i,
        val,
        header,
        dockerfile;

    dockerfile = $('.js-output').val();

    tokenField = $('.js-gist-token');

    if (tokenRegex.test(tokenField)) {
      tokenField.focus();
      alert('Invalid token ');

      return;
    }

    val = tokenField.val();

    header = 'token ' + val;

    $.ajax({
        method: 'POST',
        url: 'https://api.github.com/gists',
        headers: {
          'Authorization': header
        },
        dataType: 'json',
        data: JSON.stringify({
          description: 'Dockerfile created by dockerfile builder',
          public: false,
          files: {
            'Dockerfile': {
              'content': dockerfile
            }
          }
        })
      })
      .done(function (response) {
        gistList.prepend($('<li>' + response.created_at + ' <a href="' +  response.html_url +'" target="gist">' + response.html_url + '</a> - <a href="' + response.files.Dockerfile.raw_url + '">download raw</a></li>'));
      });
  };

  $('.js-create-gist').on('click', function (e) {
    e.preventDefault();

    createGist();

    return false;
  });

});
