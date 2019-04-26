function do1(txt,tot){
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
            console.log(result);
            var acc = result.acc;
            var pin = result.pin;
            txt.innerHTML="Information Fetched...";
            do2(acc,pin,txt,tot);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            txt.innerHTML = "Error Fetching Data!";
            $('#rem').hide();
            console.log(jqXHR);
        }
    });
}

function do2(acc,pin,txt,tot){
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
            console.log(result);
            if(result>=tot){
                txt.innerHTML="Checked Balance...";
                do3(acc,pin,txt);
            }
            else{
                txt.innerHTML = "Sorry, Insufficient Balance!";
                $('#rem').hide();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            txt.innerHTML = "Error Fetching Data!";
            $('#rem').hide();
            console.log(jqXHR);
        }
    });
}

function do3(){

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

    for(var i=0;i<ln;i++){
        var item = store.value.items[i].item_name;
        var amt = store.value.items[i].amount;
        var qnt = store.value.items[i].quantity;
        var img = getImg(item);
        // console.log(item+" "+amt+" "+qnt);
        add.innerHTML+="<tr class='rem1'><td class='invert'>"+(i+1)+"</td><td class='invert-image'><a href='single2.html'><img src='images/"+img+".jpg' alt=' ' class='img-responsive'></a></td><td class='invert'><div class='quantity'>"+qnt+"</div></td><td class='invert'>"+item+"</td><td class='invert'>$"+qnt*amt+"</td></tr>";
        tot+=qnt*amt;
    }

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
        do1(txt,tot);
    });
});