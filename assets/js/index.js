    var WhereMe = 0;
    
    function mountHtml(){
          //Include navigation
        $.getScript("../assets/js/navigation.js", function() {
            console.log("Started in ..");
        });
        //Create a taskbar
        let taskBar = [];
        taskBar.push({name: "New file"});
        taskBar.push({name: "Edit"});
        taskBar.push({name: "View"});

        $("#app").html("<div class='taskbar'><div class='before'></div></div> <div class='before'></div>");
        $("#app .taskbar .before").before("<div class='header'><div class='before'></div></div> <div class='menu-left'><div class='before'></div></div> <div class='content'><div class='before'></div></div> <div class='files_open'><div class='header_arq'><div class='before'></div></div> <div class='editor'></div> </div>");

        //Create links menu
        for(var i = 0; i < taskBar.length; i++){
        $("#app .taskbar .header .before").before("<a data-id='"+i+"'>"+taskBar[i].name+"</div>");
        }


        //Create menu left
        let menuLeftApp = [];
        menuLeftApp.push({name: "Explorer", icon : "far fa-file", notification: 0});
        menuLeftApp.push({name: "Search (Ctrl + Shift + F)", icon : "fas fa-search", notification: 0});
        menuLeftApp.push({name: "Source Control", icon : "fas fa-hat-wizard", notification: 0});
        menuLeftApp.push({name: "Debug", icon : "fas fa-bug", notification: 0});
        menuLeftApp.push({name: "Extensions", icon : "fas fa-cart-plus", notification: 0});
        for(var i = 0; i < menuLeftApp.length; i++){
        $("#app .menu-left .before").before("<a class='menuLinks' id='menuLink"+i+"' data-id='"+i+"' title='"+menuLeftApp[i].name+"'><i class='"+menuLeftApp[i].icon+"'></i></a>");
        }

        $(".menuLinks").removeClass("active");
        $("#menuLink" + WhereMe).addClass("active");
        verifyWhereMe();
        headerArq();

        
        console.log("Mounted html sucessfuly");

    }
    var tiposArquivo = [
        {name : "Welcome", type: 0},
        {name : "JavaScript", tpye: 1},
        {name : "PHP", tpye: 2},
        {name : "Java", type: 3},
        {name : "Python", type: 4}
    ];
    var filesOpen = [];
    filesOpen.push({file : "Welcome" , icon : 0, type: 0, code: ""});
    var OpenEditor = 0;
    var icons = [];
    icons.push({name : "Welcome", icon : "fas fa-mug-hot"});
    icons.push({name : "JavaScript", icon : "fab fa-js-square"});
    icons.push({name : "PHP", icon : "fab fa-php"});
    icons.push({name : "JAVA", icon : "fab fa-java"});
    icons.push({name : "Python", icon : "fab fa-python"});
    var files = [];
    files.push({file : "Welcome" , icon : 0, type: 0, code: ""});

    function headerArq(){
        $(".header_arq").html("<div class='before'></div>");
        for(var i = 0; i < filesOpen.length; i++){
            if(filesOpen[i].type == 0){
                $(".header_arq .before").before("<a class='active'><i data-id='"+i+"' class='"+icons[filesOpen[i].icon].icon+"'></i> "+filesOpen[i].file+"</a>");
                welcomeFile();
            } else{
                $(".header_arq .before").before("<a data-id='"+i+"'><i class='"+icons[filesOpen[i].icon].icon+"'></i> "+filesOpen[i].file+"</a>");
            }
        }
        changeFile();
        
    }

    function openFile(){
        headerArq();
        filesOpenA();
        $("#app .content .files p").click(function(){
            var id = $(this).data("id");
            $(".editor").html("<div class='before'></div> <textarea id='input' data-id='"+(files.length)+"'></textarea><div class=''code''><div class='before'></div></div>");
            $("textarea").html(files[id].code);
            $(".code").html("<p>"+files[id].code+"</p>");
            $("#app .content .files p").removeClass("active");
            $(this).addClass("active");
            $("#file" + id).addClass("active");
            
        });
    }

    function changeFile(){
        $(".header_arq a").click(function(){
            $(".header_arq a").removeClass("active");
            $(this).addClass("active");
            var id = $(this).data("id");
            $(".editor").html("<div class='before'></div> <textarea id='input' data-id='"+(files.length)+"'></textarea><div class='code'><div class='before'></div></div>");   
            $(".code").html(files[id].code);
            $("textarea").html(files[id].code);
            
        });
    }

    function welcomeFile(){
        $(".editor").html("<div class='before'></div>");
        $(".editor .before").before("<div class='welcome'><h1>CodeLive Editor</h1>  <h2>Start</h2> <a id='newfile'>New File</a></div>");
        newFile();
    }

    function acessOpenEditor(){
        $("#app .content .open_editor").click(function(){
            if(OpenEditor == 0){
                $("#app .content .files").hide();
                $("#app .content .open_editor .header p").html("<i class='fas fa-chevron-down' style='position: relative; left: -20px; top: 0px;'></i>OPEN EDITORS");
                OpenEditor = 1;
            } else{
                OpenEditor = 0;
                $("#app .content .files").show();
                $("#app .content .open_editor .header p").html("<i class='fas fa-chevron-up' style='position: relative; left: -20px; top: 0px;'></i>OPEN EDITORS");
            }
        });
        changeFile();
    }

    function newFile(){
        $("#newfile").click(function(){
            popUp("New file", "Create a new file", 0);
            changeFile();
        });
    }

    var welcome = true;

    function popUp(title, desc, type){
        $(".popup").css("z-index", "1000");
        $(".popup").html("<div class='before'></div>");
        $(".popup .before").before("<div class='message'><h1>"+title+"</h1> <p>"+desc+"</p> <div class='before'></div></div>");
        if(type == 0){
            $(".popup .message .before").before("<form> <br><input id='namefileinput' type='text' placeholder='Name file'/><br> <button class='blue'>Create</button></form> <button class='red'>Cancel</button>");
        }

        $("button").click(function(){
            var veri = $(this).html();
            if(veri == "Cancel"){
                $(".popup").css("z-index", "-1");
            } else if(veri == "Create"){
                var value = $("#namefileinput").val();
                if(value == ""){
                    $("#namefileinput").css("border", "2px solid #f32148");
                } else{
                    $("#namefileinput").css("border", "2px solid transparent");
                    if(welcome == true){
                        files.shift(1);
                        filesOpen.shift(1);
                    }
                    var type = 0;
                    welcome = false;
                    var str = value;
                    if(str.match(/.js/)){
                        type = 1;
                    } else if(str.match(/.php/)){
                        type = 2;
                    } else if(str.match(/.java/)){
                        type = 3;
                    } else if(str.match(/.py/)){
                        type = 4;
                    }
                    files.push({file: value, icon : type, type: type, code: ""});
                    filesOpen.push({file : value , icon : type, type: type, code: ""});
                    $(".files_open .editor").html("<div class='before'></div>");
                    $(".files_open .editor").html("<div class='before'></div> <textarea id='input' data-id='"+filesOpen.length+"'></textarea><div class='code'><div class='before'></div></div>");
                    openFile();
                    $(".popup").css("z-index", "-1");
                }
            }
            return false;
        });
        changeFile();

    }

    function filesOpenA(){
        console.log("Files open");
        var returnFile = [];
        returnFile = filesOpen;
        if(filesOpen.length == 0){
            returnFile.push({name : "Nenhum arquivo aberto", error: 1});
        }

        $("#app .content .files").html("<div class='before'></div>");
        for(var i = 0; i < returnFile.length; i++){
            if(returnFile[i].error == 1){
                $("#app .content .files .before").before("<p class='error'>"+returnFile[i].name+"</p>");
            } else{
                $("#app .content .files .before").before("<p data-id='"+i+"'><i class='"+icons[filesOpen[i].icon].icon+"'></i> "+returnFile[i].file+"</p>");
            }
        }
    }

    function codeEditor(){
        for(var i = 0; i < filesOpen.length; i++){
            $("#app .files_open .header_arq .before").before("<a id='file"+i+"' data-id='"+i+"'><i class='"+icons[filesOpen[i].icon].icon+"'></i> "+filesOpen[i].file+" </a>")
        }
    }

    function acessMenuLink(){
        $(".menuLinks").click(function(){
            var dataId = $(this).data("id");
            $(".menuLinks").removeClass("active");
            $(this).addClass("active");
            WhereMe = dataId;
            verifyWhereMe();
        });
    }

    function verifyWhereMe(){
            if(WhereMe == 0){
                acessExplorer();
            } else if(WhereMe == 1){
                searchCode();
            } else if(WhereMe == 2){
                sourceControl();
            } else if(WhereMe == 3){
                debug();
            } else if(WhereMe == 4){
                extensions();
            }
    }
    

    function dom(){
        $(".taskbar .header a").click(function(){
            var text = $(this).html();
            if(text == "New file"){
                popUp("New file", "Create a new file", 0);
                changeFile();
            }
        })
    }

    $(document).ready(function(){
        mountHtml();
        acessMenuLink();
        dom();
    });