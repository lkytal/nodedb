var JSON_Data, JSON_ERR, JSON_OK, Run, Setup, addList, addResult, doSearch, hideTimer, rstCount, setHide, setTr;

JSON_OK = 0;

JSON_Data = null;

JSON_ERR = 0;

addList = function() {};

hideTimer = null;

setHide = function() {
  var hideTimeout;
  clearTimeout(hideTimer);
  return hideTimeout = setTimeout(function() {
    return $('#info').slideUp(600);
  }, 2500);
};

rstCount = 0;

setTr = function(item) {
  rstCount += 1;
  return "<tbody>\n	<tr>\n		<td>" + item.Cid + "</td>\n		<td>" + item.Name + "</td>\n		<td>" + (item.Formula.toUpperCase().replace(/(\d+)/gi, '<sub>$1</sub>')) + "</td>\n		<td>" + item.MW + "</td>\n		<td>" + item.Size + "</td>\n		<td>" + item.Place + "</td>\n	</tr>\n</tbody>";
};

addResult = function() {
  var index, item, results, type, _i, _len;
  if (!JSON_OK) {
    setTimeout(addResult, 400);
    return;
  }
  rstCount = 0;
  type = $('#type')[0].value;
  index = $('#index')[0].value;
  $('#loadding, #space').addClass('hidden');
  $('#tablediv').removeClass('hidden');
  results = "<tbody>\n	<tr class=\"active\">\n		<th>Cid</th>\n		<th>Name</th>\n		<th>Formula</th>\n		<th>MW</th>\n		<th>Size</th>\n		<th>Place</th>\n	</tr>\n</tbody>";
  for (_i = 0, _len = JSON_Data.length; _i < _len; _i++) {
    item = JSON_Data[_i];
    if ((item != null) && item[type].toLowerCase().match(index.toLowerCase())) {
      results += setTr(item);
    }
  }
  $('#results').empty().append(results);
  setHide();
  $('#info').slideDown(400);
  $('#rstnum').html("<p>" + rstCount + " result(s) found</p>");
  return $('body,html').animate({
    scrollTop: $('#info')[0].offsetTop - 30
  }, 600);
};

doSearch = function() {
  $('#loadding').slideDown(400);
  return addResult();
};

Run = function($) {
  $('body,html').animate({
    scrollTop: 0
  }, 400);
  jQuery.getJSON("http://lkytal.qiniudn.com/data.json?id=" + ((new Date()).valueOf()), function(data) {
    JSON_OK = 1;
    JSON_Data = data;
    return addList();
  }).fail(function(rqt) {
    return jQuery.getJSON("data.json?id=" + ((new Date()).valueOf()), function(data) {
      JSON_OK = 1;
      JSON_Data = data;
      return addList();
    }).fail(function(rqt) {
      JSON_ERR = 1;
      $('#search').addClass('disabled');
      $('#loadding').addClass('hidden');
      $('#loadErr').removeClass('hidden');
      $('body,html').animate({
        scrollTop: $('#main')[0].offsetTop - 200
      }, 300);
      return $('#static').modal();
    });
  });
  $('#search').on('click', function(event) {
    return doSearch();
  });
  $('#index').val('').focus().on('keydown', function(event) {
    if (event.which === 13) {
      return doSearch();
    }
  });
  $('#refresh').on('click', function(e) {
    return location.reload();
  });
  return $('#type ~ div li').on('click', function(event) {
    return setTimeout(addList, 100);
  });
};

Setup = function($) {
  return $(function() {
    $('#type').removeClass('hidden');
    $('#info, #loadding').hide();
    $("select.select-list").selectpicker({
      style: 'btn-primary',
      menuStyle: 'dropdown-inverse'
    });
    $('.input-group').on('focus', '.form-control', function() {
      return $(this).closest('.input-group, .form-group').addClass('focus');
    }).on('blur', '.form-control', function() {
      return $(this).closest('.input-group, .form-group').removeClass('focus');
    });
    $(".btn-group").on('click', "a", function() {
      return $(this).siblings().removeClass("active").end().addClass("active");
    });
    return Run(jQuery);
  });
};

Setup(jQuery);
