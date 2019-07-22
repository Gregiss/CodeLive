    var WhereMe = 0;
    
    $(document).ready(function(){
        $(document).bind("contextmenu",function(e){
        return false;
        });
        });

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
        taskBar.push({name: "Credits"});

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
        {name : "Python", type: 4},
        {name: "CSS", type: 5},
        {name: "HTML", type: 6},
        {name: "Nothing", type: 7}
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
    icons.push({name: "CSS", icon: "fab fa-css3-alt" });
    icons.push({name: "HTML", icon: "fab fa-html5" });
    icons.push({name: "Nothing", icon: "fas fa-mug-hot" });
    var files = [];
    files.push({file : "Welcome" , icon : 0, type: 0, code: ""});
    var abertoAux = 0;
    var aberto = [];
    aberto = [{id: 0, file : "Welcome" , icon : 0, type: 0, code: ""}];

    function headerArq(){
        $(".header_arq").html("<div class='before'></div>");
        for(var i = 0; i < filesOpen.length; i++){
            if(filesOpen[i].type == 0){
                $(".header_arq .before").before("<a class='active' id='code"+i+"' data-id='"+i+"'><i data-id='"+i+"' class='"+icons[filesOpen[i].icon].icon+"'></i> "+filesOpen[i].file+"</a>");
                welcomeFile();
            } else{
                $(".header_arq .before").before("<a data-id='"+i+"'><i class='"+icons[filesOpen[i].icon].icon+"'></i> "+filesOpen[i].file+"</a>");
            }
        }
    }

    function openFile(){
        filesOpenA();
        $("#app .content .files p").click(function(){
            var id = $(this).data("id");

            $(".editor").html("<div class='before'></div> <textarea id='input' data-id='"+(files.length)+"'></textarea> <textarea id='output'></textarea>");
            $("textarea").html(files[id].code);
            $(".code").html("<p>"+files[id].code+"</p>");
            $("#app .content .files p").removeClass("active");
            $(this).addClass("active");
            $("#file" + id).addClass("active");
            editorCoded();
            changeFile();
            aberto = [{id: id, file : filesOpen[id].file , icon : filesOpen[id].icon, type: filesOpen[id].type, code: filesOpen[id].code}];
            if(filesOpen[id].type == 0){
                welcomeFile();
            }
            else{
                editando = [{id: id, file : filesOpen[id].file , icon : filesOpen[id].icon, type: filesOpen[id].type, code: filesOpen[id].code}];
                $(".header_arq").html("<div class='before'></div>");
                $(".header_arq .before").before("<a data-id='"+id+"' id='code"+id+"'><i class='"+icons[filesOpen[id].icon].icon+"'></i> "+filesOpen[id].file+"</a>");
                $(".header_arq a").removeClass("active");
                $("#code" + id).addClass("active");
                AutoSave();
                return false;
            }
        });
    }

    function changeFile(){
        $(".header_arq a").click(function(){
            $(".header_arq a").removeClass("active");
            $(this).addClass("active");
            var id = $(this).data("id");
            if(filesOpen[id].type == 0){
                welcomeFile();
            } else{
            aberto = [{id: id, file : filesOpen[id].file , icon : filesOpen[id].icon, type: filesOpen[id].type, code: filesOpen[id].code}];
            $(".editor").html("<div class='before'></div> <textarea id='input' data-id='"+(files.length)+"'></textarea> <textarea id='output'></textarea><div class='code'><div class='before'></div></div>");   
            $(".code").html(files[id].code);
            $("textarea").html(files[id].code);
            editorCoded();
            editando = [{id: id, file : filesOpen[id].file , icon : filesOpen[id].icon, type: filesOpen[id].type, code: filesOpen[id].code}];
            AutoSave();
            }
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
        } else if(type == 1){
            $(".popup .message .before").before("<button class='red'>Close</button>");
        }

        $("button").click(function(){
            var veri = $(this).html();
            if(veri == "Cancel"){
                $(".popup").css("z-index", "-1");
            } else if(veri == "Close"){
                $(".popup").css("z-index", "-1");
            } else if(veri == "Create"){
                var value = $("#namefileinput").val();
                if(value == ""){
                    $("#namefileinput").css("border", "2px solid #f32148");
                } else{
                    $("#namefileinput").css("border", "2px solid transparent");
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
                    } else if(str.match(/.css/)){
                        type = 5;
                    } else if(str.match(/.html/)){
                        type = 6;
                    } else{
                        type = 7;
                    }
                    files.push({file: value, icon : type, type: type, code: ""});
                    filesOpen.push({file : value , icon : type, type: type, code: ""});
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
                $("#app .content .files .before").before("<div data-id='"+i+"' id='menu"+i+"' class='menu'> <a>Remove</a> <a>Rename</a>  </div>");
            }
        }
        $(".files p").mousedown(function(e){ 
            if( e.button == 2 ) {
            var menuid = $(this).data("id"); 
            $(".menu").hide();
             $("#menu"+ menuid).show();
            } 
          }); 
        $(".menu").hide();

        $(".menu").mouseout(function(){
            $(".menu").hide();
        })
        
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
            } else if(text == "Credits"){
                popUp("Credits", "Created by kaway404 (PassaUmDollar) <br> <a><i class='fab fa-github'></i>   PassaUmDollar<br> <i class='fab fa-github'></i>     kaway404", 1);
            }
        })
    }

    $(document).ready(function(){
        mountHtml();
        acessMenuLink();
        dom();
    });

    function editorCoded(){
        function mediaExpander(stylesheet) {
            const rules = []
            process(
              parse(stylesheet),
              (rule, name='media') => {
                const queries = []
                if (
                  rule.style
                  && [...rule.style].some(property => 
                    property.startsWith(`--${name}`)
                    && rule.style.getPropertyValue(property).trim().match(/^\([^)]+\)/)
                    && rule.style.getPropertyValue(property).trim().match(/\{[^}]+\}$/)
                  )
                ) {
                  [...rule.style]
                    .filter(property => property.startsWith(`--${name}`))
                    .forEach(property => {
                      const value = rule.style.getPropertyValue(property).trim()
                      rule.style.removeProperty(property)
                      queries.push(
                        `@media ${value.match(/^\([^)]+\)/)} {
                          ${rule.selectorText} ${value.match(/\{[^}]+\}$/)}
                        }`
                      )
                    })
                }
                rules.push(rule.cssText)
                queries.forEach(query => rules.push(query))
              }
            )
            return parse(rules.join(''))
          }       

        // trigger extension
        ace.require("ace/ext/language_tools");
        var editor = ace.edit("input");
        editor.session.setMode("ace/mode/html");
        editor.setTheme("ace/theme/tomorrow");
        // enable autocompletion and snippets
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: false
        });

          // Demo setup below
          const pluginName = 'mediaexpander'
          const input = ace.edit('input')
          const output = ace.edit('output')
          const beautify = ace.require('ace/ext/beautify')
          
          input.setTheme('ace/theme/cobalt')
          if(aberto[0].type == 1){
            input.session.setMode('ace/mode/javascript')
          } else if(aberto[0].type == 2){
            input.session.setMode('ace/mode/php')
          } else if(aberto[0].type == 3){
            input.session.setMode('ace/mode/java')
          } else if(aberto[0].type == 4){
            input.session.setMode('ace/mode/python')
          } else if(aberto[0].type == 5){
            input.session.setMode('ace/mode/css')
          } else if(aberto[0].type == 6){
            input.session.setMode('ace/mode/html')
          }
          input.setFontSize(28)
          input.session.setTabSize(2)
          input.container.style.lineHeight = 1.4
          input.renderer.setScrollMargin(10, 10)
          input.session.setUseSoftTabs(true)
          input.session.setUseWrapMode(true)
          input.getSession().setUseWorker(false)
          
          if (localStorage[pluginName] !== undefined) {
            input.getSession().setValue(localStorage[pluginName])
          }
          
          ['keyup', 'blur', 'paste'].forEach(evt =>
            input.textInput.getElement().addEventListener(evt, render)
          )
          
          output.setTheme('ace/theme/cobalt')
          
          if(aberto[0].type == 1){
            output.session.setMode('ace/mode/javascript')
          } else if(aberto[0].type == 2){
            output.session.setMode('ace/mode/php')
          } else if(aberto[0].type == 3){
            output.session.setMode('ace/mode/java')
          } else if(aberto[0].type == 4){
            output.session.setMode('ace/mode/python')
          } else if(aberto[0].type == 5){
            output.session.setMode('ace/mode/css')
          } else if(aberto[0].type == 6){
            output.session.setMode('ace/mode/html')
          }
          output.setFontSize(18)
          output.session.setTabSize(2)
          output.container.style.lineHeight = 1.4
          output.renderer.setScrollMargin(10, 10)
          output.session.setUseSoftTabs(true)
          output.session.setUseWrapMode(true)
          output.getSession().setUseWorker(false)
          
          window.addEventListener('load', render)
    }
    
    
    function AutoSave(){
        $("textarea").keyup(function(){
            var text = $(this).val();
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                return false;
            }
            console.log(text);
        });
        }

    //Acess explorer
    function acessExplorer(){
        $("#app .content").html("<p class='title'>EXPLORER</p><div class='before'></div>");
        $("#app .content .before").before("<div class='open_editor'><div class='header'><p><i class='fas fa-chevron-up' style='position: relative; left: -20px; top: 0px;'></i>OPEN EDITORS</p></div></div> <div class='files'><div class='before'></div></div>");
        filesOpenA();
        acessOpenEditor();
        changeFile();
        openFile();
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