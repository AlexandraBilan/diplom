var current = 'onePage';
function show(id) 
{
	document.getElementById(current).style.display = 'none';
	document.getElementById(id).style.display = 'block';
    current = id;
}

function auth_menu()
{
    document.getElementById('auth-menu').style.display = "none";
    document.getElementById('auth-reg').style.display = "block";
    document.getElementById('main').style.display = "none";
    document.getElementById('auth').style.display = "block";
};
function auth_reg()
{
    document.getElementById('auth-menu').style.display = "block";
    document.getElementById('auth-reg').style.display = "none";
    document.getElementById('main').style.display = "block";
    document.getElementById('auth').style.display = "none";
};   
function description()
{
    document.getElementById('description').style.display = "block";
    document.getElementById('main').style.display = "none";
    document.getElementById('auth-reg').style.display = "block";
}; 
//$inputs = $('input');
//setInterval(function(){
//    $next = $inputs.filter(":checked").next('input');
//    if($next.length) 
//    {$next.prop('checked', true)};
//    
//    else $inputs.first().prop('checked', true);
//}, 3000);