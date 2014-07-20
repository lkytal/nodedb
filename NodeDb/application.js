// Generated by CoffeeScript 1.7.1
var JSON_Data, JSON_OK, Run, Setup, addList, addResult, setTr;

JSON_OK = 0;

JSON_Data = null;

addList = function() {
  var item, list, type;
  type = $('#type')[0].value;
  list = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = JSON_Data.length; _i < _len; _i++) {
      item = JSON_Data[_i];
      _results.push(item[type]);
    }
    return _results;
  })();
  console.log(list);
  return $('#index').typeahead("source", list);
};

jQuery.getJSON('data.json', function(data) {
  JSON_OK = 1;
  JSON_Data = data;
  addList();
  if ($('#index')[0].value) {
    return $('#search').click();
  }
});

setTr = function(item) {
  return "<tbody>\n	<tr>\n		<td>" + item.Cid + "</td>\n		<td>" + item.Name + "</td>\n		<td>" + (item.Formula.replace(/(\d+)/, '<sub>$1</sub>')) + "</td>\n		<td>" + item.MW + "</td>\n		<td>" + item.Place + "</td>\n	</tr>\n</tbody>";
};

addResult = function() {
  var index, item, results, type, _i, _len;
  type = $('#type')[0].value;
  index = $('#index')[0].value;
  $('#info, #space').addClass('hide');
  $('#tablediv').removeClass('hide');
  results = "<tbody>\n	<tr class=\"active\">\n		<th>Cid</th>\n		<th>Name</th>\n		<th>Formula</th>\n		<th>MW</th>\n		<th>Place</th>			\n	</tr>\n</tbody>";
  for (_i = 0, _len = JSON_Data.length; _i < _len; _i++) {
    item = JSON_Data[_i];
    if (item[type].match(index, "gi")) {
      results += setTr(item);
    }
  }
  $('#results').empty().append(results);
  return $('body,html').animate({
    scrollTop: $('#tablediv')[0].offsetTop
  }, 400);
};

Run = function($) {
  $('body,html').animate({
    scrollTop: 0
  }, 300);
  $('#search').on('click', function(event) {
    $('#info').removeClass('hide');
    if (JSON_OK) {
      return addResult();
    }
  });
  return $('#type ~ div li').on('click', function(event) {
    return setTimeout(addList, 100);
  });
};

Setup = function($) {
  return $(function() {
    $('#type').removeClass('hide');
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
    return window.prettyPrint && prettyPrint();
  });
};

Setup(jQuery);

jQuery(function() {
  return Run(jQuery);
});
