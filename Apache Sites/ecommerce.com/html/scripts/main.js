$(function (){
    var ck = document.cookie
    console.log(ck);
    if(ck.length>0){
        $(".in").toggle();
        document.getElementById("welcome").innerHTML+="Hi "+ck;
    }

    $("#in-form").submit(function(e){
        e.preventDefault();
        var form = this;
        var name = document.getElementById("in-name").value;
        var pass = document.getElementById("in-pass").value;
        var div = document.getElementById("in-div");
        // console.log(name, pass);
        // console.log(div.innerHTML);
        var obj = {
            username: name,
            password: pass
        };
        $.ajax({
            url: "http://localhost:4000/login",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(obj),
            success: function (result) {
                // console.log(result);
                if(result == "1") {
                    document.cookie = name;
                    form.submit();
                }
                else{
                    div.innerHTML = "Username/Password Dont Match!";
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR);
                // console.log(textStatus);
                // console.log(errorThrown);
                // console.log(obj);
            }
        });
    });

});