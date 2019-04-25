$(function (){

    ///Product List Enumeration
    add = document.getElementById('add');

    store = window.localStorage.getItem('PPminicartk');
    store = JSON.parse(decodeURIComponent(store));
    ln = store.value.items.length;
    
    it = document.getElementById('num_prod');
    it.innerHTML = ln+" "+it.innerHTML;

    for(var i=0;i<ln;i++){
        var item = store.value.items[i].item_name;
        var amt = store.value.items[i].amount;
        var qnt = store.value.items[i].quantity;
        var img = getImg(item);
        // console.log(item+" "+amt+" "+qnt);
        add.innerHTML+="<tr class='rem1'><td class='invert'>"+(i+1)+"</td><td class='invert-image'><a href='single2.html'><img src='images/"+img+".jpg' alt=' ' class='img-responsive'></a></td><td class='invert'><div class='quantity'>"+qnt+"</div></td><td class='invert'>"+item+"</td><td class='invert'>$"+qnt*amt+"</td></tr>";
    }

    function getImg(item){
        if(item=="Almonds, 100g") return "m1";
        else if(item=="Cashew Nuts, 100g") return "m2";
        else return "m3";
    }

    $('#pay').click(function(e){
        // console.log('Aysha');
        
    });
    
});