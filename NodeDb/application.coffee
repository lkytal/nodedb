
JSON_OK = 0
JSON_Data = null

addList = () ->
	type = $('#type')[0].value
	list = ( item[type] for item in JSON_Data )
	console.log list
	
	$('#index').typeahead "source", list

jQuery.getJSON 'data.json', (data) ->
	JSON_OK = 1
	JSON_Data = data
	addList()
	$('#search').click() if $('#index')[0].value
	
setTr = (item) ->
	"""
	<tbody>
		<tr>
			<td>#{item.Cid}</td>
			<td>#{item.Name}</td>
			<td>#{item.Formula.replace /(\d+)/, '<sub>$1</sub>'}</td>
			<td>#{item.MW}</td>
			<td>#{item.Place}</td>
		</tr>
	</tbody>
	"""
	
addResult = () ->
	type = $('#type')[0].value
	index = $('#index')[0].value
	
	$('#info, #space').addClass('hide')
	$('#tablediv').removeClass 'hide'
	
	results = """
		<tbody>
			<tr class="active">
				<th>Cid</th>
				<th>Name</th>
				<th>Formula</th>
				<th>MW</th>
				<th>Place</th>			
			</tr>
		</tbody>
		"""
	
	results += setTr item for item in JSON_Data when item[type].match index, "gi"
	$('#results').empty().append results
	
	$('body,html').animate({ scrollTop: $('#tablediv')[0].offsetTop }, 400);
	
Run = ($) ->
	$('body,html').animate({ scrollTop: 0 }, 300);

	$('#search').on 'click', (event) ->
		$('#info').removeClass('hide')		
		addResult() if JSON_OK
		
	$('#type ~ div li').on 'click', (event) ->
		setTimeout addList, 100
		
Setup = ($) ->
	$ ()->
		$('#type').removeClass('hide')
		#Custom Selects
		$("select.select-list").selectpicker { style: 'btn-primary', menuStyle: 'dropdown-inverse' }

		#Focus state for append/prepend inputs
		$('.input-group').on('focus', '.form-control', () ->
			$(this).closest('.input-group, .form-group').addClass('focus')
		).on 'blur', '.form-control', () ->
			$(this).closest('.input-group, .form-group').removeClass('focus')

		$(".btn-group").on 'click', "a", () ->
			$(this).siblings().removeClass("active").end().addClass("active")

		window.prettyPrint && prettyPrint()

Setup jQuery
jQuery () -> Run jQuery
