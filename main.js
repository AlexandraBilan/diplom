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
			return false; 
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



/*получение задач*/
function get_task() 
{
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
              var options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            };
            var cnt = result.length;
            var now = new Date();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                var html = "";
                var html2 = ""; 
                var html_overdue = "";
                var html2_overdue = "";
               var table = "'task'";
            for(var t=0; t < cnt; t++)
                {
                    var date2 = new Date(result[t].date);
                    if(date2 >= today)
                         {
                              html+='<div class="task"><i title="Удалить" class="fa fa-trash" id="done_delete" onclick="delete_something('+table+', '+result[t].id+')"></i><a title="Выполнить"  href="#" onclick="done()"><i class="fa fa-check-square-o"  id="done_delete"></i></a><h2 class="name_task">'+result[t].name_task+'</h2><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[t].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[t].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[t].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[t].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[t].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[t].time+'</p></div>';
                    
                             html2+='<p class="name_task_preview">'+result[t].name_task+'</p><p class="task_date_preview">'+new Date(result[t].date).toLocaleDateString("ru", options)+'</p>';
                         }
                    else 
                        {
                                             
                html_overdue+='<p class="name_task_preview">'+result[t].name_task+'</p><p class="task_date_preview">'+new Date(result[t].date).toLocaleDateString("ru", options)+'</p>';
                        }
                $('#result_form').html(html);
                $('#show_task_preview').html(html2);
                $('#show_overdue_preview_task').html(html_overdue);
            }
                
        }
},
    	error: function(result) { 
            $('#result_form').html(result.responseText);
    	}
 	});
}

/*удаление всякого*/

function delete_something(table, id)
{
        $.ajax({
        url:     'delete.php',
        type:     "", 
        dataType: "json",
        data: {table: table,
              id: id},  
        success: function(response) { 
            console.log(response);
//            location.reload();
    	},
    	error: function(response) { 
            $('#result_form_add_task').html(response.responseText);
    	}
 	});
}

/*Вывести список всех просроченных задач*/

/*получение событий*/
function get_full_event() 
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
                    var hello = "Привет новичок! Создавай скорее свое первое событие!";
                    $('#result_form').html(hello);
                }
            else
            {
              var options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            };
            var cnt = result.length;
            var html = "";
            var now = new Date();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        for(var j=0; j < cnt; j++)
        {
        var date2 = new Date(result[j].date);
        if(date2 >= today)
         {
           html+='<div class="task"><a title="Удалить"  href="#" onclick="delete()"><i class="fa fa-trash" id="done_delete"></i></a><a title="Выполнить"  href="#" onclick="done()"><i class="fa fa-check-square-o"  id="done_delete"></i></a><h2 class="name_task">'+result[j].name_event+'</h2><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[j].body_event+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[j].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[j].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[j].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[j].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[j].place+'</p></div>';
        }
            
        }
                
           $('#result_form').html(html);
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
              var options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            };
        var cnt = result.length;
        var html2 = "";
        var html_overdue = "";
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        for(var i=0; i < cnt; i++)
        {
            var date2 = new Date(result[i].date);
            if(date2 >= today)
                {
                    html2+='<p class="name_task_preview">'+result[i].name_event+'</p><p class="event_place">'+result[i].place+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p>';
                }
           else
               {
                   html_overdue+='<p class="name_task_preview">'+result[i].name_event+'</p><p class="event_place">'+result[i].place+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p>';
               }
        }
           $('#show_event_preview').html(html2);
           $('#show_overdue_preview_event').html(html_overdue);
    	}
            },
    	error: function(result) { 
            $('#result_form').html(result.responseText);
    	}
 	});
}

function get_tag() { 
        $.ajax({
            type: 'POST',
            url: 'getName.php',
            data: '',
            dataType: 'json',
            cache: false,
            success: function(result) {
                var cnt = result.length;
                var ex = '';
                for(var i=0; i<cnt; i++)
            {
                var count = i+1;
                ex += '<option value='+count+'>'+result[i]+'</otion>';
            }
                
                $('#result_form_get_tag').html(ex);
                $('#result_form_get_tag_event').html(ex);
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

function sortTask(url, send_data) {
    $.ajax({
        url:     url, 
        type:     "POST", 
        dataType: "json", 
        data: {send_name: send_data}, 
        success: function(result) { 
            if(result==0)
                {
                    var hello = "Задачи с таким параметром Вы еще не создавали:)";
                    $('#result_form').html(hello);
                }
            else
            {
            var options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            };
            var cnt = result.length;
            var html = "";
        for(var j=0; j < cnt; j++)
        {
           html+='<div class="task"><a title="Удалить"  href="#" onclick="delete()"><i class="fa fa-trash"  id="done_delete"></i></a><a title="Выполнить"  href="#" onclick="done()"><i class="fa fa-check-square-o"  id="done_delete"></i></a><h2 class="name_task">'+result[j].name_task+'</h2><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[j].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[j].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[j].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[j].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[j].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[j].time+'</p></div>';
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

