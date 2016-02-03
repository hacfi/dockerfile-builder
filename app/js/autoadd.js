$(function () {
  var autoAddLinks = $('.link-label-auto-add');

  function autoAdd (lastBlock, type, eventType) {
    var emptyValue = false,
        newInput;

    lastBlock.find('input').each(function (i, el) {
      if ($.trim($(el).val()).length === 0 && (typeof el.type === 'undefined' || el.type !== 'radio')) {
        emptyValue = true;
        if (eventType === 'click') {
          $(el).focus();

          return false;
        }
      }
    });

    if (emptyValue) {
      return false;
    }

    newInput = lastBlock.clone(true);

    var index = newInput.data('index');

    if (index !== undefined) {
      var newIndex = index + 1;
      newInput.find('[name]').each(function (i, el) {
        $(el).attr('name', $(el).attr('name').replace('[' + index + ']', '[' + newIndex + ']'));
      });
      newInput.data('index', newIndex);
      newInput.attr('data-index', newIndex);
    }

    newInput.find('input').each(function (i, el) {
      $(el).val('');
    });

    lastBlock.after(newInput);
    newInput.find('input:first').focus();

    return true;
  };

  autoAddLinks.on('click focus', function (e) {
    var $currentEl = $(e.currentTarget),
        type       = $currentEl.data('type'),
        block      = $currentEl.closest('.field-body'),
        lastBlock  = block.find('.field-input-group:last'),
        added;
    e.preventDefault();

    added = autoAdd(lastBlock, type, e.type);

    if (added) {
      return;
    }

    var $currentBlock = $currentEl.closest('.form-field-block');
    var $nextBlock = $currentBlock.next('.form-field-block');

    if (!$nextBlock.length) {
      $nextBlock = $currentBlock.closest('fieldset').next('fieldset');
      if (!$nextBlock.length) {
        return;
      }
    }

    $nextInput = $nextBlock.find('input:first');
    if ($nextInput.is($(e.relatedTarget))) {
      return;
    }

    $nextInput.focus();
  });

});
