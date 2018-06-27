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
             count();
		}
	);
});

$(document).ready(function() {
    $("#btn_add_tag3").click(
		function(){
			sendAjaxForm('result_form', 'add_tag3', 'add_tag.php');
			get_tag();
		}
	);
});
$(document).ready(function() {
    $("#btn_add_tag4").click(
		function(){
			sendAjaxForm('result_form', 'add_tag4', 'add_tag.php');
			get_tag();
		}
	);
});
$(document).ready(function() {
    $("#btn_add_event").click(
		function(){
			sendAjaxForm('result_form', 'add_event', 'add_event.php');
             count();
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
        cache: false,
        success: function(result) { 
           var user = '<h2 class="profile">Данные профиля</h2><form method="post" id="userInfo"><input type="text" name="user_name" placeholder="Имя" value="'+result[0].user_name+'"><input type="text" name="user_surname" placeholder="Фамилия" value="'+result[0].user_surname+'"><input type="text" name="login" value="'+result[0].login+'" placeholder="Логин"><input type="text" name="mail" value="'+result[0].mail+'" placeholder="E-mail"><input type="text" name="phone" placeholder="Телефон" value="'+result[0].phone+'"><button class="btn" onclick="userInfoUpdate(); show_add_task(`user_info`);">Обновить данные</button></form>';
           $('#body_userInfo').html(user);            
    	},
    	error: function(response) { 
            $('#result_form').html(response.responseText);
    	}
 	});  
}

function userInfoUpdate()
{    $('#result_form').show();
    hideAll();
    $.ajax({
        url:     'infoUserUpdate.php', 
        type:     "POST", 
        dataType: "html",
        data: $("#userInfo").serialize(),  
        cache: false,
        success: function(result) 
        { 
            if(result==0)
                {
                     var hello = "Данные успешно изменены.";
                    $('#result_form').html(hello);
                }
            else
            {
                 var hello = "Произошла ошибка";
                    $('#result_form').html(hello);
            }
    	},
    	error: function(response) 
        { 
            $('#result_form').html(response.responseText);
    	}
 	});  
}

function updatePass()
{
    $.ajax({
        url:     'updatePass.php', 
        type:     "POST", 
        dataType: "html",
        data: $("#userPass").serialize(),  
        success: function(result) { 
//        console.log(result);
             $('#response').html(result[0]);
    	},
    	error: function(response) { 
            $('#result_form').html(response.responseText);
    	}
 	});  
}

/*получение задач*/
function get_task() 
{
hideAll();
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
                var html2_done = "";
                var html_done = "<h2 class='main_title'>Выполненные задачи</h2>";
            for(var i=0; i < cnt; i++)
                {
                    if(result[i].process_id == 1)
                        {
                    var date2 = new Date(result[i].date);
                    if(date2 >= today)
                         {
                              html+='<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`task`, '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`task`, '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_task+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].time+'</p></div>';
                    
                             html2+='<div class="count_task" id="showThis" title="Показать полностью" onclick="getThisTask('+result[i].id+')"><p class="name_task_preview">'+result[i].name_task+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p></div>';
                         }
                    else 
                        {
                html2_overdue+='<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`task`, '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`task`, '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_task+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].time+'</p></div>';
                            
                html_overdue+='<div class="count_task_overdue" id="showThis" title="Показать полностью" onclick="getThisTask('+result[i].id+')"><p class="name_task_preview">'+result[i].name_task+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p></div>';
                        }
                        }
                    else
                        {
                            html_done+='<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`task`, '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done(`task`, '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_task+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].time+'</p></div>';
                            
                            html2_done+='<div class="count_task_done" id="showThis" title="Показать полностью" onclick="getThisTask('+result[i].id+')"><p class="name_task_preview">'+result[i].name_task+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div></div>';
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
    	error: function(result) { 
            $('#result_form').html(result.responseText);
    	}
 	});
}

/*получение событий*/
function get_full_event() 
{
hideAll();
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
            var count = '';  
            var count_done = '';  
            var count_overdue = '';  
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
    hideAll();
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
                    html2+='<div class="count_event"  id="showThis" title="Показать полностью" onclick="getThisEvent('+result[i].id+')"><p class="name_task_preview">'+result[i].name_event+'</p><p class="event_place">'+result[i].place+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p></div>';
                }
           else
               {
                   html_overdue+='<div class="count_event_overdue" id="showThis" title="Показать полностью" onclick="getThisEvent('+result[i].id+')"><p class="name_task_preview">'+result[i].name_event+'</p><p class="event_place">'+result[i].place+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p></div>';
               }
              }
            else
            {
                html_done+='<div class="count_event_done" id="showThis" title="Показать полностью" onclick="getThisEvent('+result[i].id+')"><p class="name_task_preview">'+result[i].name_event+'</p><p class="event_place">'+result[i].place+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div></div>';
            }
        }
           $('#show_event_preview').html(html2);
           $('#show_overdue_preview_event').html(html_overdue);
           $('#show_event_done_preview').html(html_done);
                 count();
    	}
            },
    	error: function(result) { 
            $('#result_form').html(result.responseText);
    	}
 	});
}

function getThisTask(id)
{
    hideAll();
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
            $('#result_form').html(response.responseText);
    	}
 	});
}

function getThisEvent(id)
{
    hideAll();
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
            $('#result_form').html(response.responseText);
    	}
 	});
}

function getThisNote(id)
{
    hideAll();
     $.ajax({
        url:     'getThisNote.php',
        type:     "POST", 
        dataType: "json",
        data: {id: id},  
        success: function(result) { 
            var html = '';
            html+='<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`note`, '+result[0].id+')"></i><h3 class="name_task">'+result[0].body_note+'</h3><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[0].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[0].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[0].place+'</p><img id="note_img" src="'+result[0].photo+'"></div>';
            
            $('#result_form').html(html);
             count();
            
    	},
    	error: function(response) { 
            $('#result_form').html(response.responseText);
    	}
 	});
}

function hideAll()
{
    $('#result_form_overdue_task').hide();
    $('#result_form_done_task').hide();
    $('#result_form_done_event').hide();
    $('#result_form_overdue_event').hide();
}

function show_overdue_task()
{
   $('#result_form_overdue_task').show();
   $('#result_form').hide();
}
function show_done_task()
{
   $('#result_form_done_task').show();
   $('#result_form_done_event').hide();
   $('#result_form').hide();
}
function show_done_event()
{
get_full_event();
   $('#result_form_done_event').show();
   $('#result_form_done_task').hide();
   $('#result_form').hide();
}
function show_overdue_event()
{
    get_full_event();
   $('#result_form').hide();
   $('#result_form_overdue_event').show();
  
}
/*Перенести в выполненное*/
function done(table2, id)
{
    var table = table2;
    var choice = '';
    if(table === 'task')
        {
            choice = 'эту задачу';
        }
    else if(table === 'event')
    {
        choice = 'это событие';
    }
    var html = '<p>Выполнить '+choice+'?</p><button id="yes" class="btn">Выполнить</button><button id="no" class="btn">Отмена</button>';
    $('#confirm').html(html);
    $('#confirm').css({width: 230 +"px"});
    show_add_task('confirm');
    $('#yes').click(function(){
      $.ajax({
        url:     'done.php',
        type:     "POST", 
        dataType: "json",
        data: {table: table,
              id: id},  
        success: function(result) { 
             window.location.reload();
    	},
    	error: function(response) { 
            $('#result_form').html(response.responseText);
    	}
 	      });
    });
     $('#no').click(function()
    {
        hide_add_task('confirm');
     });
}

/*удаление всякого*/
function delete_something(table, id)
{
    var html = '<p>Удалить эту запись?</p><button id="yes" class="btn">Удалить</button><button id="no" class="btn">Отмена</button>';
    $('#confirm').html(html);
    show_add_task('confirm');
    $('#yes').click(function(){
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
            $('#result_form').html(response.responseText);
    	}
 	      });
    });
     $('#no').click(function()
    {
        hide_add_task('confirm');
     });
}

function delete_tag(table, id)
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
            success: function(result) {
                var cnt = result.length;
                var ex = '';
                var ex2 = '';
                var ex3 = '';
                for(var i=0; i<cnt; i++)
            {
                ex+= '<option value='+result[i].id+'>'+result[i].name_tag+'</otion>';
                ex2+= '<li><a href="#" onclick="sortTask(`tag`, '+result[i].id+')">'+result[i].name_tag+'</a><i title="Удалить" onclick="delete_tag(`tag`, '+result[i].id+')"><sup>x</sup></i></li>';
                ex3+= '<li><a href="#" onclick="sortEvent(`tag`, '+result[i].id+')">'+result[i].name_tag+'</a><i title="Удалить" onclick="delete_tag(`tag`, '+result[i].id+')"><sup>x</sup></i></li>';
            }
                
                $('#result_form_get_tag').html(ex);
                $('#result_form_get_tag_event').html(ex);
                $('#result_form_get_tag_note').html(ex);
                $('#sort_tag').html(ex2);
                $('#sort_tag2').html(ex3);
            },
            	error: function(response) { 
                    
            $('#result_form').html(response.responseText);
    	}
        });
    }

function get_note() { 
        $.ajax({
            type: 'POST',
            url: 'getNote.php',
            data: '',
            dataType: 'json',
            cache: false,
            success: function(result) {
                if(result == 0)
                    {
                    var hello = "Вы не создали еще ни одной заметки! Самое время это исправить:)";
                    $('#show_event_preview').html(hello);
                    }
                else 
                    {                    
                var cnt = result.length;
                var html = '';
                var html2 = '';
               for(var i = 0; i<cnt; i++)
                   {
                       html+='<div id="main_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something(`note`, '+result[i].id+')"></i><h3 class="name_task">'+result[i].body_note+'</h3><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].place+'</p><img id="note_img" src="'+result[i].photo+'"></div>';
                   }
                $('#result_form').html(html);
                        count();
            }
            },
            error: function(response) { 
            $('#result_form').html(response.responseText);
    	}
                
        });
    }

function get_note_preview()
{
     $.ajax({
            type: 'POST',
            url: 'getNote.php',
            data: '',
            dataType: 'json',
            cache: false,
            success: function(result) {
                if(result == 0)
                    {
                    var hello = "Вы не создали еще ни одной заметки! Самое время это исправить:)";
                    $('#show_event_preview').html(hello);
                    }
                else 
                    {                    
                var cnt = result.length;
                var html2 = '';
               for(var i = 0; i<cnt; i++)
                   {
                       html2+='<div class="count_note" id="showThis" title="Показать полностью" onclick="getThisNote('+result[i].id+')"><p class="name_task_preview">'+result[i].body_note+'</p><p class="event_place">'+result[i].place+'</p></div>';
                        $('#show_note_preview').html(html2);
                        count();
            }
            }
            },
            error: function(response) { 
            $('#result_form').html(response.responseText);
    	}
                
        });
}

function count()
{
   var a = $("div.count_note").length;
   $("#countN").html(a);
    
    var b = $("div.count_task").length;
   $("#countZ").html(b);
    
    var c = $("div.count_event").length;
   $("#countS").html(c);
    
    var e = $("div.count_task_done").length;
    var f= $("div.count_event_done").length;
   $("#countV").html(e+f);
    
    var j = $("div.count_task_overdue").length;
    var h = $("div.count_event_overdue").length;
   $("#countP").html(j+h);
}

function init()
{
    get_task();
    get_event();
    get_note_preview();
    get_tag();
    count();
}
$(window).on('ready', init());

function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url:     url, 
        type:     "POST", 
        dataType: "html",
        data: $("#"+ajax_form).serialize(),  
        success: function(response) { 
        	$('#result_form').html('Все прошло успешно');
    	},
    	error: function(response) { 
            $('#result_form').html(response.responseText);
    	}
 	});
}

function addNote() {
var fd = new FormData(); 
var photo = document.getElementById('photo');
fd.append('file', photo.files[0]);   
    $.ajax({
        data: fd,
        url:     'addNote.php', 
        type:     "POST", 
        processData: false,
        contentType: false,
        dataType : 'text',
        cache: false,
        success: function(result) { 
                        var body_note = document.getElementById('body_note').value;
                        var place = document.getElementById('place').value;
                        var date = document.getElementById('date').value;
                        var tag = document.getElementById('result_form_get_tag_note').value;
                        var path = result;
                        $.ajax({
                            data: {body_note: body_note,
                                  place: place,
                                  date: date,
                                  tag: tag,
                                  path: path},  
                            url:     'addTextNote.php', 
                            type:     "POST", 
                            success: function(response) { 
                                $('#result_form3').html('Вы добавиль новую заметку:)');
                            },
                            error: function(response) { 
                                $('#result_form3').html(response.responseText);
                            }
                        });
    	},
    	error: function(response) { 
            $('#result_form').html(response.responseText);
    	}
 	});
}

function sortTask(type, send_data) {
    $('#result_form').show();
    hideAll();
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
                    $('#result_form').html(hello);
                }
            else
            {
            
            var cnt = result.length;
            var table = "`task`";
            var html = "";
           for(var i=0; i < cnt; i++)
         {
            var date2 = new Date(result[i].date);
            if(date2 >= today && result[i].process_id != 2)
                {
                    html+='<div id="sort_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something('+table+', '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done('+table+', '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_task+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].time+'</p></div>';
               }
             else
             {
                    $('#result_form').html(hello);
             }
        }
           $('#result_form').html(html);
    	}
        },
    	error: function(response) {
            $('#result_form').html(response.responseText);
    	}
 	});
}

function sortEvent(type, send_data) {
     $('#result_form').show();
    hideAll();
    
    $.ajax({
        url:     'sortEvent.php', 
        type:     "POST", 
        dataType: "json", 
        data: {type: type,
               send_name: send_data}, 
        success: function(result) { 
            if(result==0)
                {
                    var hello = "Событий с таким параметром нет:)";
                    $('#result_form').html(hello);
                }
            else
            {
            
            var cnt = result.length;
            var table = "`event`";
            var html = "";
           for(var i=0; i < cnt; i++)
         {
            var date2 = new Date(result[i].date);
            if(date2 >= today && result[i].process_id != 2)
                {
                    html+='<div id="sort_task" class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something('+table+', '+result[i].id+')"></i><i title="Выполнить" class="fa fa-check-square-o"  id="done_delete" onclick="done('+table+', '+result[i].id+')"></i><h3 class="name_task">'+result[i].name_event+'</h3><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[i].body_event+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[i].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[i].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[i].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[i].place+'</p></div>';
               }
             else
             {
                    $('#result_form').html(hello);
             }
        }
           $('#result_form').html(html);
    	}
        },
    	error: function(response) {
            $('#result_form').html(response.responseText);
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
     $('#'+name_div+'').hide();
     $('.shadow').hide();

}

