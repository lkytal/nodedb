(function ($)
{
	$(function ()
	{

		// Todo list
		$(".todo").on('click', 'li', function ()
		{
			$(this).toggleClass("todo-done");
		});

		// Custom Selects
		$("#selectlist").selectpicker({ style: 'btn-primary', menuStyle: 'dropdown-inverse' });

		// Tooltips
		$("[data-toggle=tooltip]").tooltip("show");

		// Focus state for append/prepend inputs
		$('.input-group').on('focus', '.form-control', function ()
		{
			$(this).closest('.input-group, .form-group').addClass('focus');
		}).on('blur', '.form-control', function ()
		{
			$(this).closest('.input-group, .form-group').removeClass('focus');
		});

		$(".btn-group").on('click', "a", function ()
		{
			$(this).siblings().removeClass("active").end().addClass("active");
		});

		// Disable link clicks to prevent page scrolling
		$(document).on('click', 'a[href="#fakelink"]', function (e)
		{
			e.preventDefault();
		});

		window.prettyPrint && prettyPrint();

	});

})(jQuery);