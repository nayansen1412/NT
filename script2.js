const select = document.querySelectorAll('.currency');
const button = document.getElementById('btn');
const number_box = document.getElementById('number_box');
const answer_box = document.getElementById('answer_box');

fetch('https://api.frankfurter.app/currencies')
.then((response) => response.json())
.then((data) => {
    show(data);
});

function show(data){
    const asArray = Object.entries(data);

    for (let i=0; i<asArray.length; i++){

        select[0].innerHTML += `<option value="${asArray[i][0]}">${asArray[i][1]}</option>`;//3
        select[1].innerHTML += `<option value="${asArray[i][0]}">${asArray[i][1]}</option>`;//3
    }
}

button.addEventListener('click', () => {
    let currency_one = select[0].value;
    let currency_two = select[1].value;
    let value1 = number_box.value;

    if(currency_one != currency_two){ 
        convert(currency_one, currency_two, value1);
        var e = document.getElementById("sel1");
        var value = e.value;
        var text = e.options[e.selectedIndex].value;
        document.getElementById("fromout").innerHTML = e.value;
    
        var e = document.getElementById("sel2");
        var value = e.value;
        var text = e.options[e.selectedIndex].value;
        document.getElementById("toout").innerHTML = e.value;

        document.getElementById("answer_box").innerHTML = answer_box;

    }else{
        alert('choose the currency');
    }
});

function convert(currency_one, currency_two, value){ 
    const host = 'api.frankfurter.app'; 
    fetch(`https://${host}/latest?amount=${value}&from=${currency_one}&to=${currency_two}`)
    .then((val) => val.json())
    .then((val) => {
        answer_box.value = Object.values(val.rates)[0];
    })
}