function AutoSave(){
$("textarea").keyup(function(){
    var text = $(this).val();
    var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
        editando[editando[0].id].code += text;
        filesOpen[editando[0].id].code += text;
        files[editando[0].id].code += text;
	} else{
        editando[editando[0].id].code += text;
        filesOpen[editando[0].id].code += text;
        files[editando[0].id].code += text;
    }
    console.log(text);
});
}