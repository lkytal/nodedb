
JSON_OK = 0
JSON_Data = null

addList = () ->
	#type = $('#type')[0].value
	#list = ( item[type] for item in JSON_Data )
	
	#$('#index').typeahead { source: list}

# 'http://coldfire.qiniudn.com/data.json'

jQuery.getJSON 'data.json', (data) ->
	JSON_OK = 1
	JSON_Data = data
	addList()
	
setTr = (item) ->
	"""
	<tbody>
		<tr>
			<td>#{item.Cid}</td>
			<td>#{item.Name}</td>
			<td>#{item.Formula.toUpperCase().replace /(\d+)/gi, '<sub>$1</sub>'}</td>
			<td>#{item.MW}</td>
			<td>#{item.Size}</td>
			<td>#{item.Place}</td>
		</tr>
	</tbody>
	"""
	
addResult = () ->
	type = $('#type')[0].value
	index = $('#index')[0].value
	
	$('#info, #space').addClass('hidden')
	$('#tablediv').removeClass 'hidden'
	
	results = """
		<tbody>
			<tr class="active">
				<th>Cid</th>
				<th>Name</th>
				<th>Formula</th>
				<th>MW</th>
				<th>Size</th>
				<th>Place</th>
			</tr>
		</tbody>
		"""
	
	results += setTr item for item in JSON_Data when item[type].toLowerCase().match index.toLowerCase()
	$('#results').empty().append results
	
	$('body,html').animate({ scrollTop: $('#tablediv')[0].offsetTop }, 400)

doSearch = () ->
	$('#info').removeClass('hidden')
	setTimeout doSearch, 400 if not JSON_OK
	addResult()
	
Run = ($) ->
	$('body,html').animate({ scrollTop: 0 }, 300)

	$('#search').on 'click', (event) -> doSearch()
		
	$('#type ~ div li').on 'click', (event) ->
		setTimeout addList, 100
		
Setup = ($) ->
	$ () ->
		$('#type').removeClass('hidden')
		$('#index').focus().on 'keydown', (event) ->
			doSearch() if event.which == 13

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

		Run jQuery

Setup jQuery
