/*Объявление всех глобальных переменных*/
var options = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	weekday: 'long'
};
var now = new Date();
var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var defining_the_graph = '';
var what_table_body = '';
var what_table_name = '';

$(document).ready(function () {
	$("#btn_add_task").click(
		function () {
			add_some_post('add_task', 'add_task.php');
			count();
		}
	);
	$("#btn_add_event").click(
		function () {
			add_some_post('add_event', 'add_event.php');
			count();
		}
	);
	$("#btn_add_tag3").click(
		function () {
			add_some_post('add_tag3', 'add_tag.php');
			get_tag();
		}
	);
	$("#btn_add_tag4").click(
		function () {
			add_some_post('add_tag4', 'add_tag.php');
			get_tag();
		}
	);
});

function add_some_post(ajax_form, url) {
	$.ajax({
		url: url,
		type: "POST",
		dataType: "html",
		data: $("#" + ajax_form).serialize(),
		success: function (response) {
			$('#result_form').html('Все прошло успешно');
		},
		error: function (response) {
			$('#result_form').html(response.responseText);
		}
	});
}

function get_task(table) {
	hideAll();
	$('#result_form').show();
	$.ajax({
		url: 'get_any_posts.php',
		type: "POST",
		dataType: "json",
		data: {
			table: table
		},
		cache: false,
		success: function (result) {
			if (result == 0) {
				var hello = "Привет новичок! Создавай скорее свою первую задачу!";
				$('#result_form').html(hello);
			} else {
				var cnt = result.length;
				var html = "<h2 class='main_title'>Актуальные задачи</h2>";
				var html2 = "";
				var html_overdue = "";
				var this_step_post = "";
				var this_step_post_preview = "";
				var html2_overdue = "<h2 class='main_title'>Просроченные задачи</h2>";
				var html2_done = "";
				var html_done = "<h2 class='main_title'>Выполненные задачи</h2>";
				for (var i = 0; i < cnt; i++) {
					this_step_post = '<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`task`, ' + result[i].id + ')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`task`, ' + result[i].id + ')"></i><h3 class="name_task">' + result[i].name_task + '</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">' + result[i].body_task + '</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">' + result[i].name_regularity + '</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">' + result[i].name_priority + '</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">' + result[i].name_tag + '</p><div class="clearfix"></div><p class="task_date">' + new Date(result[i].date).toLocaleDateString("ru", options) + '</p><div class="clearfix"></div><p class="task_time">' + result[i].time + '</p></div>';

					this_step_post_preview = '<div class="count_task" id="showThis" title="Показать полностью" onclick="get_this_post(`task`, ' + result[i].id + ')"><p class="name_task_preview">' + result[i].name_task + '</p><p class="task_date_preview">' + new Date(result[i].date).toLocaleDateString("ru", options) + '</p></div>';
					if (result[i].process_id == 1) {
						var date2 = new Date(result[i].date);
						if (date2 >= today) {
							html += this_step_post;
							html2 += this_step_post_preview;
						} else {
							html2_overdue += this_step_post;
							html_overdue += this_step_post_preview;
						}
					} else {
						html_done += this_step_post;
						html2_done += this_step_post_preview;
					}

					$('#result_form').html(html);
					$('#result_form_overdue_task').html(html2_overdue);
					$('#show_task_preview').html(html2);
					$('#show_overdue_preview_task').html(html_overdue);
					$('#show_task_done_preview').html(html2_done);
					$('#result_form_done_task').html(html_done);
					count();
				}

			}
		},
		error: function (result) {
			$('#result_form').html(result.responseText);
		}
	});
}

function get_full_event(table) {
	hideAll();
	$('#result_form').show();
	$.ajax({
		url: 'get_any_posts.php',
		type: "POST",
		dataType: "json",
		data: {
			table: table
		},
		cache: false,
		success: function (result) {
			if (result == 0) {
				var hello = "Привет новичок! Создавай скорее свое первое событие!";
				$('#result_form').html(hello);
			} else {
				var count = '';
				var this_step_post = "";
				var count_done = '';
				var count_overdue = '';
				var cnt = result.length;
				var html = "<h2 class='main_title'>Актуальные события</h2>";
				var html2 = "<h2 class='main_title'>Просроченные события</h2>";
				var html_done = "<h2 class='main_title'>Выполненные события</h2>";
				for (var i = 0; i < cnt; i++) {
					this_step_post = '<div id="main_event" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`event`, ' + result[i].id + ')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`event`, ' + result[i].id + ')"></i><h3 class="name_task">' + result[i].name_event + '</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">' + result[i].body_event + '</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">' + result[i].name_regularity + '</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">' + result[i].name_priority + '</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">' + result[i].name_tag + '</p><div class="clearfix"></div><p class="task_date">' + new Date(result[i].date).toLocaleDateString("ru", options) + '</p><div class="clearfix"></div><p class="task_time">' + result[i].place + '</p></div>';
					if (result[i].process_id == 1) {
						var date2 = new Date(result[i].date);
						if (date2 >= today) {
							html += this_step_post;
						} else {
							html2 += this_step_post;
						}
					} else {
						html_done += this_step_post;
					}
				}
				$('#result_form').html(html);
				$('#result_form_overdue_event').html(html2);
				$('#result_form_done_event').html(html_done);
			}
		},
		error: function (result) {
			$('#result_form').html(result.responseText);
		}
	});
}

function get_event_preview(table) {
	hideAll();
	$.ajax({
		url: 'get_any_posts.php',
		type: "POST",
		dataType: "json",
		data: {
			table: table
		},
		cache: false,
		success: function (result) {
			if (result == 0) {
				var hello = "Событий нет!";
				$('#show_event_preview').html(hello);
			} else {
				var cnt = result.length;
				var html2 = "";
				var html_overdue = "";
				var html_done = "";
				var this_step_post = "";
				for (var i = 0; i < cnt; i++) {
					this_step_post = '<div class="count_event"  id="showThis" title="Показать полностью" onclick="get_this_post(`event`, ' + result[i].id + ')"><p class="name_task_preview">' + result[i].name_event + '</p><p class="event_place">' + result[i].place + '</p><p class="task_date_preview">' + new Date(result[i].date).toLocaleDateString("ru", options) + '</p></div>';
					if (result[i].process_id == 1) {
						var date2 = new Date(result[i].date);
						if (date2 >= today) {
							html2 += this_step_post;
						} else {
							html_overdue += this_step_post;
						}
					} else {
						html_done += this_step_post;
					}
				}
				$('#show_event_preview').html(html2);
				$('#show_overdue_preview_event').html(html_overdue);
				$('#show_event_done_preview').html(html_done);
				count();
			}
		},
		error: function (result) {
			$('#result_form').html(result.responseText);
		}
	});
}

function get_note(table) {
	$.ajax({
		type: 'POST',
		url: 'get_any_posts.php',
		data: {
			table: table
		},
		dataType: 'json',
		cache: false,
		success: function (result) {
			if (result == 0) {
				var hello = "Вы не создали еще ни одной заметки! Самое время это исправить:)";
				$('#show_event_preview').html(hello);
			} else {
				var cnt = result.length;
				var html = '';
				var html2 = '';
				for (var i = 0; i < cnt; i++) {
					html += '<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`note`, ' + result[i].id + ')"></i><h3 class="name_task">' + result[i].body_note + '</h3><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">' + result[i].name_tag + '</p><div class="clearfix"></div><p class="task_date">' + new Date(result[i].date).toLocaleDateString("ru", options) + '</p><div class="clearfix"></div><p class="task_time">' + result[i].place + '</p><img id="note_img" src="' + result[i].photo + '"></div>';
				}
				$('#result_form').html(html);
				count();
			}
		},
		error: function (response) {
			$('#result_form').html(response.responseText);
		}

	});
}

function get_note_preview(table) {
	$.ajax({
		type: 'POST',
		url: 'get_any_posts.php',
		data: {
			table: table
		},
		dataType: 'json',
		cache: false,
		success: function (result) {
			if (result == 0) {
				var hello = "Вы не создали еще ни одной заметки! Самое время это исправить:)";
				$('#show_event_preview').html(hello);
			} else {
				var cnt = result.length;
				var html2 = '';
				for (var i = 0; i < cnt; i++) {
					html2 += '<div class="count_note" id="showThis" title="Показать полностью" onclick="get_this_post(`note`, ' + result[i].id + ')"><p class="name_task_preview">' + result[i].body_note + '</p><p class="event_place">' + result[i].place + '</p></div>';
					$('#show_note_preview').html(html2);
					count();
				}
			}
		},
		error: function (response) {
			$('#result_form').html(response.responseText);
		}

	});
}

function get_tag() {
	$.ajax({
		type: 'POST',
		url: 'getTag.php',
		data: '',
		dataType: 'json',
		cache: false,
		success: function (result) {
			var cnt = result.length;
			var ex = '';
			var ex2 = '';
			var ex3 = '';
			for (var i = 0; i < cnt; i++) {
				ex += '<option value=' + result[i].id + '>' + result[i].name_tag + '</otion>';
				ex2 += '<li><a href="#" onclick="sort_posts(`task`, `tag`, ' + result[i].id + ')">' + result[i].name_tag + '</a><i title="Удалить" onclick="delete_something(`tag`, ' + result[i].id + ')"><sup>x</sup></i></li>';
				ex3 += '<li><a href="#" onclick="sort_posts(`event`, `tag`, ' + result[i].id + ')">' + result[i].name_tag + '</a><i title="Удалить" onclick="delete_something(`tag`, ' + result[i].id + ')"><sup>x</sup></i></li>';
			}

			$('#result_form_get_tag').html(ex);
			$('#result_form_get_tag_event').html(ex);
			$('#result_form_get_tag_note').html(ex);
			$('#sort_tag').html(ex2);
			$('#sort_tag2').html(ex3);
		},
		error: function (response) {

			$('#result_form').html(response.responseText);
		}
	});
}

function get_this_post(table, id) {
	hideAll();
	$.ajax({
		url: 'get_this_post.php',
		type: "POST",
		dataType: "json",
		data: {
			table: table,
			id: id
		},
		success: function (result) {
			if (table == 'task') {
				defining_the_graph = result[0].time;
				what_table_body = result[0].body_task;
				what_table_name = result[0].name_task;
			} else if (table == 'event') {
				defining_the_graph = result[0].place;
				what_table_body = result[0].body_event;
				what_table_name = result[0].name_event;
			}
			if (table == 'task' || table == 'event') {
				var html = '<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`task`, ' + result[0].id + ')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`task`, ' + result[0].id + ')"></i><h3 class="name_task">' + what_table_name + '</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">' + what_table_body + '</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">' + result[0].name_regularity + '</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">' + result[0].name_priority + '</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">' + result[0].name_tag + '</p><div class="clearfix"></div><p class="task_date">' + new Date(result[0].date).toLocaleDateString("ru", options) + '</p><div class="clearfix"></div><p class="task_time">' + defining_the_graph + '</p></div>';

				$('#result_form').html(html);
			} else if (table == 'note') {
				var html = '<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`note`, ' + result[0].id + ')"></i><h3 class="name_task">' + result[0].body_note + '</h3><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">' + result[0].name_tag + '</p><div class="clearfix"></div><p class="task_date">' + new Date(result[0].date).toLocaleDateString("ru", options) + '</p><div class="clearfix"></div><p class="task_time">' + result[0].place + '</p><img id="note_img" src="' + result[0].photo + '"></div>';

				$('#result_form').html(html);
			}
		},
		error: function (response) {
			$('#result_form').html(response.responseText);
		}
	});
}

function sort_posts(table, type, type_id) {
	$('#result_form').show();
	hideAll();
	$.ajax({
		url: 'sort_posts.php',
		type: "POST",
		dataType: "json",
		data: {
			table: table,
			type: type,
			type_id: type_id
		},
		success: function (result) {
			if (result == 0) {
				var hello = '';
				$('#result_form').html(hello);
			} else {
				var cnt = result.length;
				var html = "";
				for (var i = 0; i < cnt; i++) {
					if (table == 'task') {
				defining_the_graph = result[i].time;
				what_table_body = result[i].body_task;
				what_table_name = result[i].name_task;
				hello = "Задач с таким параметром нет:)";
			} else if (table == 'event') {
				defining_the_graph = result[i].place;
				what_table_body = result[i].body_event;
				what_table_name = result[i].name_event;
				hello = "Событий с таким параметром нет:)";
			}
					var date2 = new Date(result[i].date);
					if (date2 >= today && result[i].process_id != 2) {
						html += '<div id="sort_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(' + table + ', ' + result[i].id + ')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(' + table + ', ' + result[i].id + ')"></i><h3 class="name_task">' + what_table_name + '</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">' + what_table_body + '</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">' + result[i].name_regularity + '</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">' + result[i].name_priority + '</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">' + result[i].name_tag + '</p><div class="clearfix"></div><p class="task_date">' + new Date(result[i].date).toLocaleDateString("ru", options) + '</p><div class="clearfix"></div><p class="task_time">' + defining_the_graph + '</p></div>';
					} else {
						$('#result_form').html(hello);
					}
				}
				$('#result_form').html(html);
			}
		},
		error: function (response) {
			$('#result_form').html(response.responseText);
		}
	});
}

function userInfoOn() {
	$('#body_userInfo').show();
	$('#new_pass').hide();
}

function passOn() {
	$('#body_userInfo').hide();
	$('#new_pass').show();
}

function get_user_info() {
	$.ajax({
		url: 'infoUser.php',
		type: "POST",
		dataType: "json",
		data: '',
		cache: false,
		success: function (result) {
			var user = '<h2 class="profile">Данные профиля</h2><form method="post" id="userInfo"><input type="text" name="user_name" placeholder="Имя" value="' + result[0].user_name + '"><input type="text" name="user_surname" placeholder="Фамилия" value="' + result[0].user_surname + '"><input type="text" name="login" value="' + result[0].login + '" placeholder="Логин"><input type="text" name="mail" value="' + result[0].mail + '" placeholder="E-mail"><input type="text" name="phone" placeholder="Телефон" value="' + result[0].phone + '"><button class="btn" onclick="update_user_info(); show_add_popup(`user_info`);">Обновить данные</button></form>';
			$('#body_userInfo').html(user);
		},
		error: function (response) {
			$('#result_form').html(response.responseText);
		}
	});
}

function update_user_info() {
	$('#result_form').show();
	hideAll();
	$.ajax({
		url: 'infoUserUpdate.php',
		type: "POST",
		dataType: "html",
		data: $("#userInfo").serialize(),
		cache: false,
		success: function (result) {
			if (result == 0) {
				var hello = "Данные успешно изменены.";
				$('#result_form').html(hello);
			} else {
				var hello = "Произошла ошибка";
				$('#result_form').html(hello);
			}
		},
		error: function (response) {
			$('#result_form').html(response.responseText);
		}
	});
}

function update_pass() {
	$.ajax({
		url: 'updatePass.php',
		type: "POST",
		dataType: "html",
		data: $("#userPass").serialize(),
		success: function (result) {
			$('#response').html(result[0]);
		},
		error: function (response) {
			$('#result_form').html(response.responseText);
		}
	});
}

function hideAll() {
	$('#result_form_overdue_task').hide();
	$('#result_form_done_task').hide();
	$('#result_form_done_event').hide();
	$('#result_form_overdue_event').hide();
}

function show_overdue_task() {
	$('#result_form_overdue_task').show();
	$('#result_form').hide();
}

function show_done_task() {
	$('#result_form_done_task').show();
	$('#result_form_done_event').hide();
	$('#result_form').hide();
}

function show_done_event() {
	get_full_event();
	$('#result_form_done_event').show();
	$('#result_form_done_task').hide();
	$('#result_form').hide();
}

function show_overdue_event() {
	get_full_event();
	$('#result_form').hide();
	$('#result_form_overdue_event').show();

}

function done(table, id) {
	var choice = '';
	if (table === 'task') {
		choice = 'эту задачу';
	} else if (table === 'event') {
		choice = 'это событие';
	}
	var html = '<p>Выполнить ' + choice + '?</p><button id="yes" class="btn">Выполнить</button><button id="no" class="btn">Отмена</button>';
	$('#confirm').html(html);
	$('#confirm').css({
		width: 230 + "px"
	});
	show_add_popup('confirm');
	$('#yes').click(function () {
		$.ajax({
			url: 'done.php',
			type: "POST",
			dataType: "json",
			data: {
				table: table,
				id: id
			},
			success: function (result) {
				window.location.reload();
			},
			error: function (response) {
				$('#result_form').html(response.responseText);
			}
		});
	});
	$('#no').click(function () {
		hide_add_popup('confirm');
	});
}

function delete_something(table, id) {
	var html = '<p>Удалить эту запись?</p><button id="yes" class="btn">Удалить</button><button id="no" class="btn">Отмена</button>';
	$('#confirm').html(html);
	show_add_popup('confirm');
	$('#yes').click(function () {
		$.ajax({
			url: 'delete.php',
			type: "POST",
			dataType: "json",
			data: {
				table: table,
				id: id
			},
			success: function (result) {
			},
			error: function (response) {
				$('#result_form').html(response.responseText);
			}
		});
	});
	$('#no').click(function () {
		hide_add_popup('confirm');
	});
}

function count() {
	var a = $("div.count_note").length;
	$("#count_note").html(a);

	var b = $("div.count_task").length;
	$("#count_task").html(b);

	var c = $("div.count_event").length;
	$("#count_event").html(c);

	var e = $("div.count_task_done").length;
	var f = $("div.count_event_done").length;
	$("#count_done").html(e + f);

	var j = $("div.count_task_overdue").length;
	var h = $("div.count_event_overdue").length;
	$("#count_overdue").html(j + h);
}

function addNote() {
	var fd = new FormData();
	var photo = document.getElementById('photo');
	fd.append('file', photo.files[0]);
	$.ajax({
		data: fd,
		url: 'addNote.php',
		type: "POST",
		processData: false,
		contentType: false,
		dataType: 'text',
		cache: false,
		success: function (result) {
			var body_note = document.getElementById('body_note').value;
			var place = document.getElementById('place').value;
			var date = document.getElementById('date').value;
			var tag = document.getElementById('result_form_get_tag_note').value;
			var path = result;
			$.ajax({
				data: {
					body_note: body_note,
					place: place,
					date: date,
					tag: tag,
					path: path
				},
				url: 'addTextNote.php',
				type: "POST",
				success: function (response) {
					$('#result_form3').html('Вы добавиль новую заметку:)');
				},
				error: function (response) {
					$('#result_form3').html(response.responseText);
				}
			});
		},
		error: function (response) {
			$('#result_form').html(response.responseText);
		}
	});
}

//Всплывающее окно для добавления задачи/события/воспоминания
function show_add_popup(name_div) {
	$wrapper = $('#' + name_div + '');
	let windowHeight = $(window).height();
	let windowWidth = $(window).width();
	let popupWidth = $wrapper.width();
	let popupHeight = $wrapper.height();
	let popupPositionLeft = (windowWidth - popupWidth) / 2;
	let popupPositionTop = (windowHeight - popupHeight) / 2;
	let closeLeft = popupWidth - 25;
	$wrapper.css({
		top: popupPositionTop + "px",
		left: popupPositionLeft + "px",
		"z-index": 100,
		position: "absolute"
	});
	$('.close_add_form').css({
		left: closeLeft + "px",
		position: "relative"
	});
	$wrapper.show();
	$('.shadow').show();
}

function hide_add_popup(name_div) {
	$('#' + name_div + '').hide();
	$('.shadow').hide();
}

function init() {
	get_task('task');
	get_event_preview('event');
	get_note_preview('note');
	get_tag();
	count();
}
$(window).on('ready', init());
