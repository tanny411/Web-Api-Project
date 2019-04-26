$(function (){

    /// Setting Cookies ///

    var ck = document.cookie.split(',');
    console.log(ck);
    if(ck.length>1){
        $(".in").toggle();
        document.getElementById("welcome").innerHTML+="Hi "+ck[0];
        if(ck[1]=="set"){
            $(".acc").hide();
        }
    }




    ///  Sign In functionality ///

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
                    document.cookie = name+",notset";
                    form.submit();
                }
                else if(result == "2") {
                    document.cookie = name+",set";
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



    ///  Bank Adding functionality ///

    $("#acc").submit(function(e){
        e.preventDefault();
        var form = this;
        var acc = Number(document.getElementById("acc-num").value);
        var pin = Number(document.getElementById("acc-pin").value);
        var div = document.getElementById("acc-info");
        // console.log(typeof(acc), typeof(pin));

        var obj = {
            Acc: acc,
            Pin: pin
        };

        $.ajax({
            url: "http://localhost:3000/accVerify",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(obj),
            success: function (result) {
                // console.log(result);
                if(result == "1") {
                    
                    var obj2 = {
                        Acc: acc,
                        Pin: pin,
                        Name: ck[0]
                    };

                    $.ajax({
                        url: "http://localhost:4000/addAcc",
                        contentType: "application/json",
                        type: "POST",
                        data: JSON.stringify(obj2),
                        success: function (result) {
                            // console.log(result);
                            if(result == "1") {
                                document.cookie = ck[0]+",set";
                                form.submit();
                            }
                            else{
                                div.innerHTML = "Some Error Occured!";
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            div.innerHTML = "Update Error Occured!";
                        }
                    });

                }
                else{
                    div.innerHTML = "Pic/Account Not Valid. Please Provide a Valid Account.";
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                div.innerHTML = "Account Verification Error Occured!";
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                console.log(obj);
            }
        });
    });

});