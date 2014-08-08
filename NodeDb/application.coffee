
JSON_OK = 0
JSON_Data = null
JSON_ERR = 0

addList = () ->
	#type = $('#type')[0].value
	#list = ( item[type] for item in JSON_Data )
	#$('#index').typeahead { source: list}

hideTimer = null
setHide = () ->
	clearTimeout hideTimer
	hideTimeout = setTimeout () ->
		$('#info').slideUp 600
	, 2500

rstCount = 0

setTr = (item) ->
	rstCount += 1
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
	if not JSON_OK
		setTimeout addResult, 400
		return

	rstCount = 0
	type = $('#type')[0].value
	index = $('#index')[0].value
	
	$('#loadding, #space').addClass 'hidden'
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
	
	results += setTr item for item in JSON_Data when item? and item[type].toLowerCase().match index.toLowerCase()
	$('#results').empty().append results
	
	setHide()
	$('#info').slideDown 400
	$('#rstnum').html "<p>#{rstCount} result(s) found</p>"

	$('body,html').animate { scrollTop: $('#info')[0].offsetTop - 30 }, 600

doSearch = () ->
	$('#loadding').slideDown 400
	addResult()
	
Run = ($) ->
	$('body,html').animate { scrollTop: 0 }, 400
	jQuery
	.getJSON 'http://lkytal.qiniudn.com/datas.json', (data) ->
		JSON_OK = 1
		JSON_Data = data
		addList()
	.fail (rqt) ->
		JSON_ERR = 1
		$('#search').addClass 'disabled'
		$('#loadding').addClass 'hidden'
		$('#loadErr').removeClass 'hidden'
		$('body,html').animate { scrollTop: $('#main')[0].offsetTop - 200 }, 300

	$('#search').on 'click', (event) -> doSearch()
	$('#index').focus().on 'keydown', (event) -> doSearch() if event.which == 13
		
	$('#type ~ div li').on 'click', (event) -> setTimeout addList, 100
		
Setup = ($) ->
	$ () ->
		$('#type').removeClass 'hidden'
		$('#info, #loadding').hide()

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
