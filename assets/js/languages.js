function AutoSave(){
$("textarea").keyup(function(){
    var text = $(this).val();
    files[editando].code = text;
    filesOpen[editando].code = text;
    console.log(text);
});
}