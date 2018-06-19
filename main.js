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

  $(window).on('load', function() {
        $.ajax({
        url:     'getTask.php', 
        type:     "POST", 
        dataType: "json", 
        data: '',  
        cache: false,
        success: function(result) { 
            if(result==0)
                {
                    var hello = "Привет новичок! Создавай скорее свою первую новость!";
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
           html+='<div class="task"><h2 class="name_task">'+result[j].name_task+'</h2><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[j].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[j].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[j].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[j].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[j].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[j].time+'</p></div>';
        }
           $('#result_form').html(html);

        var html2 = "";
        for(var i=0; i < cnt; i++)
        {
           html2+='<p class="name_task_preview">'+result[i].name_task+'</p><p class="task_date_preview">'+new Date(result[i].date).toLocaleDateString("ru", options)+'</p>';
        }
           $('#show_task_preview').html(html2);
    	}
            }
 ,
    	error: function(result) { 
            $('#result_form').html(result.responseText);
    	}
 	});
		}
	);

    $(window).on('load', function() { //выполнить скрипт сразу, как загрузится страница
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
    });

function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url:     url, //url страницы с php кодом
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	$('#result_form_add_task').html('Все прошло успешно');
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form_add_task').html(response.responseText);
    	}
 	});
}

function sortTask(url, send_data) {
    $.ajax({
        url:     url, //url страницы с php кодом
        type:     "POST", //метод отправки
        dataType: "json", //формат данных
        data: {send_name: send_data},  // Сеарилизуем объект
        success: function(result) { 
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
           html+='<div class="task"><h2 class="name_task">'+result[j].name_task+'</h2><div class="clearfix"></div><span class="task_comment">Комментарий:</span><p class="body_task">'+result[j].body_task+'</p><div class="clearfix"></div><span class="task_comment">Регулярность:</span><p class="name_regularity">'+result[j].name_regularity+'</p><div class="clearfix"></div><span class="task_comment">Приоритет:</span><p class="name_priority">'+result[j].name_priority+'</p><div class="clearfix"></div><span class="task_comment">Тэги:</span><p class="tag_task">'+result[j].name_tag+'</p><div class="clearfix"></div><p class="task_date">'+new Date(result[j].date).toLocaleDateString("ru", options)+'</p><div class="clearfix"></div><p class="task_time">'+result[j].time+'</p></div>';
        }
           $('#result_form').html(html);
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form_add_task').html(response.responseText);
    	}
 	});
}

function add_task()
{
     document.getElementById('add_task').style.display = "block";
}

function get_task()
{
     document.getElementById('body_note').style.display = "none";
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

