function dectedLanguage(){
    $("textarea").keyup(function(){
        var code = $(this).val();
        colors(code);
    });
}

function colors(code){
    var array = [code];
    for(i = 0; i < array.length; i++){
        $(".code").html("<p>"+array[i]+"</p>");
        console.log(array[i]);
    }
}