/*Объявление всех глобальных переменных*/
var options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            };
var now = new Date();
var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());


$(document).ready(function() {
    $("#btn_add_task").click(
		function(){
			sendAjaxForm('result_form', 'add_task', 'add.php');
			return false; 
		}
	);
});

$(document).ready(function() {
    $("#btn_add_tag").click(
		function(){
			sendAjaxForm('result_form', 'add_tag', 'add_tag.php');
			get_tag();
//            window.location.reload();
		}
	);
});

$(document).ready(function() {
    $("#btn_add_tag2").click(
		function(){
			sendAjaxForm('result_form', 'add_tag2', 'add_tag.php');
			get_tag();
//            window.location.reload();
		}
	);
});

$(document).ready(function() {
    $("#btn_add_tag3").click(
		function(){
			sendAjaxForm('result_form', 'add_tag3', 'add_tag.php');
			get_tag();
//            window.location.reload();
		}
	);
});

$(document).ready(function() {
    $("#btn_add_event").click(
		function(){
			sendAjaxForm('result_form', 'add_event', 'add_event.php');
			return false; 
		}
	);
});

function userInfoOn()
{
    $('#body_userInfo').show();
    $('#new_pass').hide(); 
}

function passOn()
{
    $('#body_userInfo').hide();
    $('#new_pass').show(); 
}

function userInfoGet()
{
        $.ajax({
        url:     'infoUser.php', 
        type:     "POST", 
        dataType: "json",
        data: '',  
        success: function(result) { 
           var user = '<h2 class="profile">Данные профиля</h2><form method="post" id="userInfo"><input type="text" name="user_name" placeholder="Имя" value="'+result[0].user_name+'"><input type="text" name="user_surname" placeholder="Фамилия" value="'+result[0].user_surname+'"><input type="text" name="login" value="'+result[0].login+'" placeholder="Логин"><input type="text" name="mail" value="'+result[0].mail+'" placeholder="E-mail"><input type="text" name="phone" placeholder="Телефон" value="'+result[0].phone+'"><button class="btn" onclick="userInfoUpdate(); show_add_task(`user_info`);">Обновить данные</button></form>';
           $('#body_userInfo').html(user);            
    	},
    	error: function(response) { 
            $('#result_form_add_task').html(response.responseText);
    	}
 	});  
}

function userInfoUpdate()
{
    $.ajax({
        url:     'infoUserUpdate.php', 
        type:     "POST", 
        dataType: "html",
        data: $("#userInfo").serialize(),  
        success: function(result) { 
    	},
    	error: function(response) { 
            $('#result_form_add_task').html(response.responseText);
    	}
 	});  
}


/*получение задач*/
function get_task() 
{
$('#result_form_overdue_task').hide();
$('#result_form_overdue_event').hide();
$('#result_form').show();
        $.ajax({
        url:     'getTask.php', 
        type:     "POST", 
        dataType: "json", 
        data: '',  
        cache: false,
        success: function(result) 
{ 
            if(result==0)
                {
                    var hello = "Привет новичок! Создавай скорее свою первую задачу!";
                    $('#result_form').html(hello);
                }
            else
            {
              
            var cnt = result.length;
                var html = "<h2 class='main_title'>Актуальные задачи</h2>";
                var html2 = ""; 
                var html_overdue = "";
                var html2_overdue = "<h2 class='main_title'>Просроченные задачи</h2>";
                var html_done = "";
                var html2_done = "<h2 class='main_title'>Выполненные задачи</h2>";
            for(var i=0; i < cnt; i++)
                {
                    if(result[i].process_id == 1)
                        {
                    var date2 = new Date(result[i].date);
                    if(date2 >= today)
                         {
                              html+='<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`task`, '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`task`, '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_task+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].time+'</p></div>';
                    
                             html2+='<div id="showThis" title="Показать полностью" onclick="getThisTask('+result[i].id+')"><p class="name_task_preview">'+result[i].name_task+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p></div>';
                         }
                    else 
                        {
                html2_overdue+='<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`task`, '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`task`, '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_task+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].time+'</p></div>';
                            
                html_overdue+='<div id="showThis" title="Показать полностью" onclick="getThisTask('+result[i].id+')"><p class="name_task_preview">'+result[i].name_task+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p></div>';
                        }
                        }
                    else
                        {
                            html_done+='<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`task`, '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`task`, '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_task+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].time+'</p></div>';                             
                            html2_done+='<div id="showThis" title="Показать полностью" onclick="getThisTask('+result[i].id+')"><p class="name_task_preview">'+result[i].name_task+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p></div>';
                        }
   
                $('#result_form').html(html);
                $('#result_form_overdue_task').html(html2_overdue);
                $('#show_task_preview').html(html2);
                $('#show_overdue_preview_task').html(html_overdue);
                $('#show_task_done_preview').html(html2_done);
                $('#result_form_done_task').html(html_done);
            }
                
        }
},
    	error: function(result) { 
            $('#result_form').html(result.responseText);
    	}
 	});
}

/*получение событий*/
function get_full_event() 
{
$('#result_form_overdue_task').hide();
$('#result_form_overdue_event').hide();
$('#result_form').show();
        $.ajax({
        url:     'getEvent.php', 
        type:     "POST", 
        dataType: "json", 
        data: '',  
        cache: false,
        success: function(result) { 
            if(result==0)
                {
                    var hello = "Привет новичок! Создавай скорее свое первое событие!";
                    $('#result_form').html(hello);
                }
            else
            {
              
            var cnt = result.length;
            var html = "<h2 class='main_title'>Актуальные события</h2>";
            var html2 = "<h2 class='main_title'>Просроченные события</h2>";
            var html_done = "<h2 class='main_title'>Выполненные события</h2>";
        for(var i=0; i < cnt; i++)
        {
          if(result[i].process_id == 1)
              {  
        var date2 = new Date(result[i].date);     
        if(date2 >= today)
         {
           html+='<div id="main_event" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`event`, '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`event`, '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_event+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_event+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].place+'</p></div>';
            }
          else
            {
                html2+='<div id="main_event" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`event`, '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`event`, '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_event+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_event+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].place+'</p></div>';
            }
           }
            else
             {
                    html_done+='<div id="main_event" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`event`, '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`event`, '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_event+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_event+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].place+'</p></div>';
             }
        }
                
           $('#result_form').html(html);
           $('#result_form_overdue_event').html(html2);
           $('#result_form_done_event').html(html_done);
    	}
            },
    	error: function(result) { 
            $('#result_form').html(result.responseText);
    	}
 	});
}

function get_event() 
{
        $.ajax({
        url:     'getEvent.php', 
        type:     "POST", 
        dataType: "json", 
        data: '',  
        cache: false,
        success: function(result) { 
            if(result==0)
                {
                    var hello = "Событий нет!";
                    $('#show_event_preview').html(hello);
                }
            else
            {
              
        var cnt = result.length;
        var html2 = "";
        var html_overdue = "";
        var html_done = "";
        for(var i=0; i < cnt; i++)
        {
           if(result[i].process_id == 1)
              {    
            var date2 = new Date(result[i].date);
            if(date2 >= today)
                {
                    html2+='<div id="showThis" title="Показать полностью" onclick="getThisEvent('+result[i].id+')"><p class="name_task_preview">'+result[i].name_event+'</p><p class="event_place">'+result[i].place+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p></div>';
                }
           else
               {
                   html_overdue+='<div id="showThis" title="Показать полностью" onclick="getThisEvent('+result[i].id+')"><p class="name_task_preview">'+result[i].name_event+'</p><p class="event_place">'+result[i].place+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p></div>';
               }
              }
            else
            {
                html_done+='<div id="showThis" title="Показать полностью" onclick="getThisEvent('+result[i].id+')"><p class="name_task_preview">'+result[i].name_event+'</p><p class="event_place">'+result[i].place+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p></div>';
            }
        }
           $('#show_event_preview').html(html2);
           $('#show_overdue_preview_event').html(html_overdue);
           $('#show_event_done_preview').html(html_done);
    	}
            },
    	error: function(result) { 
            $('#result_form').html(result.responseText);
    	}
 	});
}

function getThisTask(id)
{
     $.ajax({
        url:     'getThisTask.php',
        type:     "POST", 
        dataType: "json",
        data: {id: id},  
        success: function(result) { 
            
            var html ='<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`task`, '+result[0].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`task`, '+result[0].id+')"></i><h3 class="name_task">'+result[0].name_task+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[0].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[0].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[0].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[0].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[0].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[0].time+'</p></div>';
            
            $('#result_form').html(html);
            
    	},
    	error: function(response) { 
            $('#result_form_add_task').html(response.responseText);
    	}
 	});
}

function getThisEvent(id)
{
     $.ajax({
        url:     'getThisEvent.php',
        type:     "POST", 
        dataType: "json",
        data: {id: id},  
        success: function(result) { 
            
            var html ='<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`event`, '+result[0].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`event`, '+result[0].id+')"></i><h3 class="name_task">'+result[0].name_event+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[0].body_event+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[0].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[0].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[0].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[0].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[0].place+'</p></div>';
            
            $('#result_form').html(html);
            
    	},
    	error: function(response) { 
            $('#result_form_add_task').html(response.responseText);
    	}
 	});
}

function show_overdue_task()
{
   $('#result_form_overdue_task').show();
   $('#result_form').hide();
}
function show_done_task()
{
   $('#result_form_done_task').show();
   $('#result_form').hide();
}
function show_done_event()
{
   $('#result_form_done_event').show();
   $('#result_form').hide();
}
function show_overdue_event()
{
    get_full_event();
     $('#result_form').hide();
   $('#result_form_overdue_event').show();
  
}
/*Перенести в выполненное*/
function done(table, id)
{
        $.ajax({
        url:     'done.php',
        type:     "POST", 
        dataType: "json",
        data: {table: table,
              id: id},  
        success: function(result) { 
//            console.log(result);
             window.location.reload();
    	},
    	error: function(response) { 
            $('#result_form_add_task').html(response.responseText);
    	}
 	});
}

/*удаление всякого*/
function delete_something(table, id)
{
        $.ajax({
        url:     'delete.php',
        type:     "POST", 
        dataType: "json",
        data: {table: table,
              id: id},  
        success: function(result) { 
             window.location.reload();
    	},
    	error: function(response) { 
            $('#result_form_add_task').html(response.responseText);
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
            success: function(result) {
                var cnt = result.length;
                var ex = '';
                var ex2 = '';
                for(var i=0; i<cnt; i++)
            {
                var count = i+1;
                ex+= '<option value='+count+'>'+result[i].name_tag+'</otion>';
                ex2+= '<li><a href="#" onclick="sortTask(`tag`, '+result[i].id+')">'+result[i].name_tag+'</a><i title="Удалить" class="fa fa-trash" id="tag_delete" onclick="delete_something(`tag`, '+result[i].id+')"></i></li>';
            }
                
                $('#result_form_get_tag').html(ex);
                $('#result_form_get_tag_event').html(ex);
                $('#sort_tag').html(ex2);
            },
        });
    }

function init()
{
    get_task();
    get_event();
    get_tag();
}
$(window).on('load', init());

function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url:     url, 
        type:     "POST", 
        dataType: "html",
        data: $("#"+ajax_form).serialize(),  
        success: function(response) { 
        	$('#result_form_add_task').html('Все прошло успешно');
    	},
    	error: function(response) { 
            $('#result_form_add_task').html(response.responseText);
    	}
 	});
}

function sortTask(type, send_data) {
    $.ajax({
        url:     'sortTask.php', 
        type:     "POST", 
        dataType: "json", 
        data: {type: type,
            send_name: send_data}, 
        success: function(result) { 
            if(result==0)
                {
                    var hello = "Задач с таким параметром нет:)";
                    $('#not_sort').html(hello);
                }
            else
            {
            
            var cnt = result.length;
            var table = "`task`";
            var html = "";
           for(var j=0; j < cnt; j++)
         {
            var date2 = new Date(result[i].date);
            if(date2 >= today && result[i].process_id != 2)
                {
                    html+='<div id="sort_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something('+table+', '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done('+table+', '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_task+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].time+'</p></div>';
               }
             else
             {
                    $('#not_sort').html(hello);
             }
        }
           $('#result_form').html(html);
    	}
        },
    	error: function(response) {
            $('#result_form_add_task').html(response.responseText);
    	}
 	});
}

function add_task()
{
     document.getElementById('add_task').style.display = "block";
}


//Всплывающее окно для добавления задачи/события/воспоминания

function show_add_task(name_div)
{
   window.location.hash = name_div;
    $wrapper = $('#'+name_div+'');
    let windowHeight = $(window).height();
    let windowWidth = $(window).width();
    let popupWidth = $wrapper.width();
    let popupHeight = $wrapper.height();
    let popupPositionLeft = (windowWidth - popupWidth) / 2;
    let popupPositionTop = (windowHeight - popupHeight) / 2;
    let closeLeft = popupWidth-25;
    $wrapper.css({top: popupPositionTop + "px", left: popupPositionLeft + "px",  "z-index": 100, position: "absolute"});
    $('.close_add_form').css({left: closeLeft +"px", position: "relative"});
    $wrapper.show();
    $('.shadow').show();
}

function hide_add_task(name_div)
{
    window.location.hash = 'main_task';
     $('#'+name_div+'').hide();
     $('.shadow').hide();

}

