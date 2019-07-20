//Acess explorer
function acessExplorer(){
    $("#app .content").html("<p class='title'>EXPLORER</p><div class='before'></div>");
    $("#app .content .before").before("<div class='open_editor'><div class='header'><p><i class='fas fa-chevron-up' style='position: relative; left: -20px; top: 0px;'></i>OPEN EDITORS</p></div></div> <div class='files'><div class='before'></div></div>");
    filesOpenA();
    acessOpenEditor();
    changeFile();
}

//Acess explorer
function searchCode(){
    $("#app .content").html("<p class='title'>SEARCH</p><input type='text' placeholder='Search for term in the code'/>");
}

//Acess source Control
function sourceControl(){
    $("#app .content").html("<p class='title'>Source Control</p><div class='before'></div>");
}

//Acess debug
function debug(){
    $("#app .content").html("<p class='title'>Debug</p><div class='before'></div>");
}

//Acess extensions
function extensions(){
    $("#app .content").html("<p class='title'>Extensions</p><div class='before'></div>");
}