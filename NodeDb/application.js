var JSON_Data, JSON_OK, Run, Setup, addList, addResult, doSearch, setTr;

JSON_OK = 0;

JSON_Data = null;

addList = function() {};

jQuery.getJSON('data.json', function(data) {
  JSON_OK = 1;
  JSON_Data = data;
  return addList();
});

setTr = function(item) {
  return "<tbody>\n	<tr>\n		<td>" + item.Cid + "</td>\n		<td>" + item.Name + "</td>\n		<td>" + (item.Formula.toUpperCase().replace(/(\d+)/gi, '<sub>$1</sub>')) + "</td>\n		<td>" + item.MW + "</td>\n		<td>" + item.Size + "</td>\n		<td>" + item.Place + "</td>\n	</tr>\n</tbody>";
};

addResult = function() {
  var index, item, results, type, _i, _len;
  type = $('#type')[0].value;
  index = $('#index')[0].value;
  $('#info, #space').addClass('hidden');
  $('#tablediv').removeClass('hidden');
  results = "<tbody>\n	<tr class=\"active\">\n		<th>Cid</th>\n		<th>Name</th>\n		<th>Formula</th>\n		<th>MW</th>\n		<th>Size</th>\n		<th>Place</th>\n	</tr>\n</tbody>";
  for (_i = 0, _len = JSON_Data.length; _i < _len; _i++) {
    item = JSON_Data[_i];
    if (item[type].toLowerCase().match(index.toLowerCase())) {
      results += setTr(item);
    }
  }
  $('#results').empty().append(results);
  return $('body,html').animate({
    scrollTop: $('#tablediv')[0].offsetTop
  }, 400);
};

doSearch = function() {
  $('#info').removeClass('hidden');
  if (!JSON_OK) {
    setTimeout(doSearch, 400);
  }
  return addResult();
};

Run = function($) {
  $('body,html').animate({
    scrollTop: 0
  }, 300);
  $('#search').on('click', function(event) {
    return doSearch();
  });
  return $('#type ~ div li').on('click', function(event) {
    return setTimeout(addList, 100);
  });
};

Setup = function($) {
  return $(function() {
    $('#type').removeClass('hidden');
    $('#index').focus().on('keydown', function(event) {
      if (event.which === 13) {
        return doSearch();
      }
    });
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
    window.prettyPrint && prettyPrint();
    return Run(jQuery);
  });
};

Setup(jQuery);
