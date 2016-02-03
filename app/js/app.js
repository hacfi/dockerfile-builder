$(function () {
  var $form = $('.js-builder-form'),
      $output = $('.js-output');

  autosize($('textarea'));

  $form.on('keydown', '.js-input-label-key', function (e) {
    if (e.keyCode !== 187) {
      return;
    }

    e.preventDefault();

    $(e.currentTarget).next().focus();
  });

  function formatState (state) {
    if (!state.name) {
      return state.text;
    }

    var $state = $(
      '<span>' + state.name + '</span>'
    );

    return $state;
  };

  function formatImage (image) {
    if (image.loading) {
      return image.text;
    }

    var $state = $(
      '<div>' + image.name + '</div>'
    );


    return $state;
  };

  $('.js-input-from').select2({
    ajax: {
      url: "http://dockerfile-builder.dev/images",
      dataType: 'json',
      delay: 200,
      data: function (params) {
        return {
          q: params.term,
          page: params.page
        };
      },
      processResults: function (data, params) {
        data.results.unshift({
          id: params.term,
          name: params.term
        });
        return {
          results: data.results
        };
      },
      cache: true
    },
    escapeMarkup: function (markup) {
      return markup;
    },
    minimumInputLength: 1,
    templateResult: formatImage,
    templateSelection: formatState
  });

  function push () {
    var dockerfile;

    dockerfile = $('.js-output').val();

    $.ajax({
        method: 'POST',
        url: "http://dockerfile-builder.dev/push",
        headers: {
          'Authorization': header
        },
        dataType: 'json',
        data: JSON.stringify({
          'content': dockerfile
        })
      })
      .done(function (response) {
        $('.js-gist-list').prepend($('<li>' + 'pushed ' + new Date() + '</li>'));
      });
  };


  $('.js-push').on('click', function (e) {
    e.preventDefault();

    push();

    return false;
  });

  $mainForm = $('.js-form-main');

  $templateRun = $('.js-template-run');

  $('.builder-add-run').on('click', function (e) {
    var $newBlock;

    e.preventDefault();

    $newBlock = $templateRun.children().clone(true);

    $newBlock.appendTo($mainForm);
    autosize($newBlock.find('textarea'));

    $newBlock.find('textarea')
      .on('textchange', function () {
        $form.find('input:first').trigger('textchange');
      })
      .focus();

    return false;
  });


  $templateAdd = $('.js-template-add');

  $('.builder-add-add').on('click', function (e) {
    var $newBlock;

    e.preventDefault();

    $newBlock = $templateAdd.children().clone(true);

    $newBlock.appendTo($mainForm);

    $newBlock.find('input')
      .on('textchange', function () {
        $form.find('input:first').trigger('textchange');
      })
      .first().focus();

    return false;
  });


  $templateCopy = $('.js-template-copy');

  $('.builder-add-copy').on('click', function (e) {
    var $newBlock;

    e.preventDefault();

    $newBlock = $templateCopy.children().clone(true);

    $newBlock.appendTo($mainForm);

    $newBlock.find('input')
      .on('textchange', function () {
        $form.find('input:first').trigger('textchange');
      })
      .first().focus();

    return false;
  });


  $templateEnv = $('.js-template-env');

  $('.builder-add-env').on('click', function (e) {
    var $newBlock;

    e.preventDefault();

    $newBlock = $templateEnv.children().clone(true);

    $newBlock.appendTo($mainForm);

    $newBlock.find('input')
      .on('textchange', function () {
        $form.find('input:first').trigger('textchange');
      })
      .first().focus();

    return false;
  });


  $templateWorkdir = $('.js-template-workdir');

  $('.builder-add-workdir').on('click', function (e) {
    var $newBlock;

    e.preventDefault();

    $newBlock = $templateWorkdir.children().clone(true);

    $newBlock.appendTo($mainForm);

    $newBlock.find('input')
      .on('textchange', function () {
        $form.find('input:first').trigger('textchange');
      })
      .first().focus();

    return false;
  });
});
