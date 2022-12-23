function jsondatadiv(data,selector){
  str=""
  for(let i = 0; i < data.length; i++) {
    str += "<div class='data_element, pb-20'>"+
    "<div class='data_element_nazwaproduktu, justify-center flex text-4xl font-semibold p-3'>"+data[i]['Nazwa_Produktu']+"</div>"+
    "<div class='data_element_otherinfo, flex flex-col text-2xl'>"+
    "<div class='flex flex-row justify-center p-2'>"+"<div class='basis-1/5 text-center'>Id: "+data[i]['Id']+"</div>"+"<div class='basis-1/5 text-center'>Producent: "+data[i]['Nazwa_Producenta']+"</div>"+"<div class='basis-1/5 text-center'>Dostępność: "+data[i]['Czy_dostepne']+"</div>"+
    "<div class='basis-1/5 text-center'>Dostępna Ilość: "+data[i]['Ilosc']+"</div>"+"<div class='basis-1/5 text-center'>Cena: "+data[i]['Cena']+"</div></div>"+"<div class='flex flex-row justify-center p-2'>"+"<div class='basis-1/4 text-center'>Sprzedanych: "+data[i]['Ilosc_sprzedanych']+"</div>"+
    "<div class='basis-1/4 text-center'>Dodane: "+data[i]['Data_dodania']+"</div>"+"<div class='basis-1/4 text-center'>Wersja: "+data[i]['Wersja']+"</div>"+"<div class='basis-1/4 text-center'>Gwarancja: "+data[i]['Gwarancja']+"</div></div>"+
    "<div class='flex justify-center p-2'>Opis: "+data[i]['Opis']+"</div>"+"</div>";
    if(data[i]['Opinie'].length>12){
      str+="<div class='data_element_opinie, flex flex-nowrap overflow-x-auto text-xl gap-6'>";
    } else {
      str+="<div class='data_element_opinie, flex flex-nowrap overflow-x-auto text-xl gap-6 justify-center'>";
    }
    for(let j=0 ; j<data[i]['Opinie'].length ; j++){
       str+="<div class='data_element_opinie_element, text-center'>"+
        "<div>Id: "+data[i]['Opinie'][j]['Id']+"</div><div class='w-24'>Ocena: "+data[i]['Opinie'][j]['Rating']+"</div></div>";
    }
    str+="</div></div>";
  };
  selector.innerHTML=str
};

function charterdonut(data,selector){
  var gwarancje=[];
  for(let i =0;i<8;i++){
    gwarancje.push(0);
  }
  for(let i = 0; i < data.length; i++) {
    var dł = data[i]['Gwarancja']
    dł/=6
    switch (dł){
      case 1:
        gwarancje[dł-1]+=1
        break;
      case 2:
        gwarancje[dł-1]+=1
        break;
      case 3:
        gwarancje[dł-1]+=1
        break;
      case 4:
        gwarancje[dł-1]+=1
        break;
      case 5:
        gwarancje[dł-1]+=1
        break;
      case 6:
        gwarancje[dł-1]+=1
        break;
      case 7:
        gwarancje[dł-1]+=1
        break;
      case 8:
        gwarancje[dł-1]+=1
        break;
    }
  }

  new Chart(selector, {
    type: "doughnut",
    data: {
      labels: ['6 miesiąc','12 miesiące','18 miesiące','24 miesiące','30 miesiące','36 miesiące','42 miesiące','48 miesiące'],
      datasets: [{
        label: 'Ilość produktów z podaną długością gwarancji',
        data: gwarancje,
        hoverOffset: 50
      }]
    }
  })
};

function charterbar(data, selector){
  var hajs=[];
  var opinie=[];
  var sum=0;
  for(let i =0;i<10;i++){
    opinie.push(0);
  }
  for(let i = 0; i < 10; i++) {
    hajs.push(data[i]['Cena']);
    sum=0;
    for(let j=0 ; j<data[i]['Opinie'].length ; j++){
      sum+=data[i]['Opinie'][j]['Rating']
    }
    sum/=data[i]['Opinie'].length
    opinie[i]=sum
  }

  new Chart(selector, {
    type: "bar",
    data: {
      labels: hajs,
      datasets: [{
        label: 'Średnia opinii',
        data: opinie,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

var datadiv = document.querySelector("#dane_id");
var chart1 = document.querySelector("#chart1");
var chart2 = document.querySelector("#chart2");

fetch('https://my.api.mockaroo.com/licencje.json?key=dbf334b000')
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      return response.json();
    }
  })
  .then((data) => {
    jsondatadiv(data, datadiv);
    charterbar(data,chart1);
    charterdonut(data,chart2);
  })
  .catch((error) => {
    fetch('../data/licencje.json')
      .then((response) => response.json())
      .then((data) => {
        jsondatadiv(data, datadiv);
        charterbar(data,chart1);
        charterdonut(data,chart2);
      })
  })