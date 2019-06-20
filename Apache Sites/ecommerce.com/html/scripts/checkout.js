function do1(txt,tot,stuff){
    ///FETCH USER INFO
    obj={
        name:(document.cookie.split(','))[0]
    }
    $.ajax({
        url: "http://localhost:4000/fetch",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(obj),
        success: function (result) {
            // console.log(result);
            var acc = result.acc;
            var pin = result.pin;
            txt.innerHTML="Information Fetched...";
            do2(acc,pin,txt,tot,stuff);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            txt.innerHTML = "Error Fetching Data!";
            $('#rem').hide();
            // console.log(jqXHR);
        }
    });
}

function do2(acc,pin,txt,tot,stuff){
    ///CHECK BALANCE
    obj={
        acc:acc,
        pin:pin
    }
    $.ajax({
        url: "http://localhost:3000/balance",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(obj),
        success: function (result) {
            // console.log(result);
            if(result>=tot){
                txt.innerHTML="Checked Balance...";
                do3(acc,pin,txt,tot,stuff);
            }
            else{
                txt.innerHTML = "Sorry, Insufficient Balance!";
                $('#rem').hide();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            txt.innerHTML = "Error Fetching Data!";
            $('#rem').hide();
            // console.log(jqXHR);
        }
    });
}

function do3(facc,pin,txt,tot,stuff){
    var tacc=2015331000; //ecommerce bank account
    ///TELL BANK TO TRANSFER MONEY
    obj={
        'From Account' : facc,
        Pin : pin,
        Amount : tot,
        'To Account' : tacc
    }
    // console.log(obj);
    $.ajax({
        url: "http://localhost:3000/send",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(obj),
        success: function (result) {
            // console.log(result);
            txt.innerHTML="Congratulations, Payment Successful!";
            do4(tot-5,txt,stuff); // ecommerce keeps some money
        },
        error: function (jqXHR, textStatus, errorThrown) {
            txt.innerHTML = "Error Fetching Data!";
            $('#rem').hide();
            // console.log(jqXHR);
        }
    });
}

function do4(tot,txt,stuff){
    var facc=2015331000; //ecommerce bank account
    var pin=10;
    var tacc=2015331028; //supplier bank account
    ///TELL BANK TO TRANSFER MONEY TO SUPPLIER
    obj={
        'From Account' : facc,
        Pin : pin,
        Amount : tot,
        'To Account' : tacc
    }
    console.log(obj);
    $.ajax({
        url: "http://localhost:3000/send",
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(obj),
        success: function (result) {
            console.log(result);
            do5(result,tot,stuff,txt);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            txt.innerHTML = "Error With Supplier!";
            $('#rem').hide();
            // console.log(jqXHR);
        }
    });
}

function do5(result,tot,stuff,txt){
    obj={
        Amount : tot,
        Account : 2015331000, //ecommerce bank account
        Record : result,
        Items : stuff
    }
    $.ajax({
        url: "http://localhost:2000/recieve",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(obj),
        success: function (result) {
            if(result == "1"){
                txt.innerHTML += "<br/> Products Supplied.";
                $('#rem').hide();
            }
            else{
                txt.innerHTML += "<br/> Error supplier!";
                $('#rem').hide();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            txt.innerHTML = "Error supplying products!";
            $('#rem').hide();
            // console.log(jqXHR);
        }
    });
}

$(function (){

    ///Product List Enumeration
    add = document.getElementById('add');

    store = window.localStorage.getItem('PPminicartk');
    store = JSON.parse(decodeURIComponent(store));
    ln = store.value.items.length;
    
    it = document.getElementById('num_prod');
    it.innerHTML = ln+" "+it.innerHTML;

    var tot=0;
    stuff=new Array();

    for(var i=0;i<ln;i++){
        var item = store.value.items[i].item_name;
        var amt = store.value.items[i].amount;
        var qnt = store.value.items[i].quantity;
        var img = getImg(item);
        // console.log(item+" "+amt+" "+qnt);
        add.innerHTML+="<tr class='rem1'><td class='invert'>"+(i+1)+"</td><td class='invert-image'><a href='single2.html'><img src='images/"+img+".jpg' alt=' ' class='img-responsive'></a></td><td class='invert'><div class='quantity'>"+qnt+"</div></td><td class='invert'>"+item+"</td><td class='invert'>$"+qnt*amt+"</td></tr>";
        tot+=qnt*amt;
        var obj={
            name:item,
            number:qnt
        }
        stuff.push(obj);
    }
    // console.log(stuff);
    document.getElementById('tot').innerHTML+=tot;

    function getImg(item){
        if(item=="Almonds, 100g") return "m1";
        else if(item=="Cashew Nuts, 100g") return "m2";
        else return "m3";
    }

    var prog = document.getElementById('progress');

    $('#pay').click(function(e){
        prog.innerHTML="<i id='rem' class='fa fa-circle-o-notch fa-spin' style='margin-right: 10px;font-size: 30px;'></i>"+prog.innerHTML;
        var txt = document.getElementById('progtxt');
        txt.innerHTML="Process Started...";
        do1(txt,tot,stuff);
    });
});