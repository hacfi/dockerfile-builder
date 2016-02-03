$(function () {

  var $form = $('.js-builder-form');
  var $output = $('.js-output');
  var mainTypes = ['ADD', 'COPY', 'ENV', 'RUN', 'WORKDIR'];

  function createDockerfile () {
    var data = {},
        output;

    // TOP
    // TOP - FROM
    data.from = $.trim($('.js-input-from').val());

    output = 'FROM ' + data.from + "\n";


    // TOP - MAINTAINER
    var maintainer = null;
    var maintainerName = false;
    if ($.trim($('.js-input-maintainer-name').val()).length > 0) {
      maintainer = $.trim($('.js-input-maintainer-name').val());
      maintainerName = true;
    }
    if ($.trim($('.js-input-maintainer-email').val()).length > 0) {
      if (maintainerName) {
        maintainer += ' <'
      } else {
        maintainer = '';
      }

      maintainer += $.trim($('.js-input-maintainer-email').val());

      if (maintainerName) {
        maintainer += '>'
      }
    }
    data.maintainer = maintainer;

    if (maintainer !== null) {
      output += 'MAINTAINER ' + data.maintainer + "\n";
    }


    // TOP - LABEL
    var labels = [];

    $('.js-form-field-block-label').find('.field-input-group').each(function (i, el) {
      var $el   = $(el),
          key   = $.trim($el.find('.js-input-label-key').val()),
          value = $el.find('.js-input-label-value').val();

      if (key.length === 0) {
        return;
      }

      labels.push({key: key, value: value});
    });

    if (labels.length > 0) {
      data.label = labels;

      output += 'LABEL';
      $.each(labels, function (i, el) {
        output += ' "' + el.key + '"="' + el.value + '"';
      });
      output += "\n";
    } else {
      data.label = null;
    }

    output += "\n\n";

    // MAIN
    var main = [];

    $('.js-form-main').children('.js-form-field-block').find('.js-main-value:first').each(function (i, el) {
      var $el = $(el),
          value = $.trim($el.val());

      if (value.length === 0) {
        return;
      }

      var instructionType = $el.data('instruction');
      if (jQuery.inArray(instructionType, mainTypes) === -1) {
        alert('Unknown instruction ' + instructionType);
      }

      var instruction;


      if (instructionType === 'RUN') {
        instruction = instructionType + " " + value;
      } else if (instructionType === 'ADD') {
        var adds = [value];

        var add2 = $.trim($el.next('.js-main-value-more').val());
        if (add2.length > 0) {
          adds.push(add2);
        }

        instruction = instructionType + ' ["' + adds.join('", "') + '"]';
      } else if (instructionType === 'COPY') {
        var copies = [value];

        var copy2 = $.trim($el.next('.js-main-value-more').val());
        if (copy2.length > 0) {
          copies.push(copy2);
        }

        instruction = instructionType + ' ["' + copies.join('", "') + '"]';
      } else if (instructionType === 'ENV') {
        var envs = [];

        var env2 = $.trim($el.next('.js-main-value-more').val());
        envs.push([value, env2]);

        instruction = instructionType;
        $.each(envs, function (i, el) {
          instruction += ' "' + el[0] + '"="' + el[1] + '"';
        });
      } else if (instructionType === 'WORKDIR') {
        instruction = instructionType + " " + value;
      }

      main.push(instruction);
    });


    if (main.length > 0) {
      data.main = main;

      $.each(main, function (i, el) {
        output += el + "\n\n";
      });
    } else {
      data.entrypoint = null;
    }

    // BOTTOM
    // BOTTOM - ENTRYPOINT
    var entrypoints = [];

    $('.js-input-entrypoint').each(function (i, el) {
      var value = $.trim($(el).val());

      if (value.length === 0) {
        return;
      }

      entrypoints.push(value);
    });

    if (entrypoints.length > 0) {
      data.entrypoint = entrypoints;

      output += 'ENTRYPOINT ["' + entrypoints.join('", "') + '"]' + "\n";
    } else {
      data.entrypoint = null;
    }


    // BOTTOM - CMD
    var cmds = [];

    $('.js-input-cmd').each(function (i, el) {
      var value = $.trim($(el).val());

      if (value.length === 0) {
        return;
      }

      cmds.push(value);
    });


    if (cmds.length > 0) {
      data.cmd = cmds;

      output += 'CMD ["' + cmds.join('", "') + '"]' + "\n";
    } else {
      data.cmd = null;
    }


    // BOTTOM - VOLUME
    var volumes = [];

    $('.js-input-volume').each(function (i, el) {
      var value = $.trim($(el).val());

      if (value.length === 0) {
        return;
      }

      volumes.push(value);
    });

    if (volumes.length > 0) {
      data.volume = volumes;

      output += 'VOLUME ["' + volumes.join('", "') + '"]' + "\n";
    } else {
      data.volume = null;
    }


    // BOTTOM - EXPOSE
    var exposes = [];

    $('.js-form-field-block-expose').find('.field-input-group').each(function (i, el) {
      var $el   = $(el),
          port  = $el.find('.js-input-expose').val(),
          isUdp = $el.find('.js-input-expose-port-udp').prop('checked');

      if (port.length === 0) {
        return;
      }
      if (isUdp) {
        port += '/udp';
      }

      exposes.push(port);
    });

    if (exposes.length > 0) {
      data.expose = exposes;

      output += 'EXPOSE ' + exposes.join(' ') + "\n";
    } else {
      data.expose = null;
    }


    $output.val(output);
    autosize.update($output);
  }

  $form.find('input, textarea').on('textchange', createDockerfile);
  $form.find('select').on('change', createDockerfile);
  $form.find('input[type=radio], input[type=checkbox]').on('change', createDockerfile);

  function saveTextAsFile () {
    var textToWrite = $output.val();
    var textFileAsBlob = new Blob([textToWrite], {type: 'text/plain'});
    var fileNameToSaveAs = 'Dockerfile';

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }

    downloadLink.click();
  }

  $form.on('submit', function (e) {
  //$('.js-download').on('click', function (e) {
    e.preventDefault();

    saveTextAsFile();

    return false;
  });
});
