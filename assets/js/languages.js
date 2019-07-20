function dectedLanguage(){
    $("textarea").keyup(function(){
        var coder = $(this).val();
        var id = $(this).data("id") - 1;
        files[id].code = coder;
        filesOpen[id].code = coder;
        colors(coder);
    });

    function colors(code){
        var array = [code];
        for(i = 0; i < array.length; i++){
            $(".code").html("<p>"+array[i]+"</p>");
            console.log(array[i]);
        }
    }

}

