function jsondatadiv(data,selector){
  for(let i = 0; i < data.length; i++) {
    selector.innerHTML +=
    "<div class='data_element'>"+
    "<div class='data_element_nazwaproduktu'>"+data[i]['Nazwa_Produktu']+"</div>"+
    "<div class='data_element_otherinfo'>"+
    "<div>Id: "+data[i]['Id']+"</div>"+"<div>Producent: "+data[i]['Nazwa_Producenta']+"</div>"+"<div>Dostępność: "+data[i]['Czy_dostepne']+"</div>"+
    "<div>Dostępna Ilość: "+data[i]['Ilosc']+"</div>"+"<div>Cena: "+data[i]['Cena']+"</div>"+"<div>Sprzedanych: "+data[i]['Ilosc_sprzedanych']+"</div>"+
    "<div>Dodane: "+data[i]['Data_dodania']+"</div>"+"<div>Wersja: "+data[i]['Wersja']+"</div>"+"<div>Opis: "+data[i]['Opis']+"</div>"+"<div>Gwarancja: "+data[i]['Gwarancja']+"</div>"+
    "</div>"+
    "<div class='data_element_opinie'>";
    for(let j=0;j<data[i]['Opinie'].length;j++){
        selector.innerHTML+="<div class='data_element_opinie_element'>"+
        "<div>Id: "+data[i]['Opinie'][j]["Id"]+"</div>"+"<div>Ocena: "+data[i]['Opinie'][j]["Rating"]+"</div>"+
        "</div>";
    }
    selector.innerHTML+="</div>"+"</div>";
  };
};

var datadiv = document.querySelector("#dane_id");

fetch('https://my.api.mockaroo.com/licencje.json?key=dbf334b0')
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      response.json()
    }
    return response;
  })
  .then((data) => {
    jsondatadiv(data, datadiv);
  })
  .catch((error) => {
    fetch('../EDI/data/licencje.json')
      .then((response) => response.json())
      .then((data) => {
        jsondatadiv(data, datadiv);
      })
  })
