function jsondatadiv(data,selector){
  for(let i = 0; i < data.length; i++) {
    selector.innerHTML += "<div class='data_element, pb-20'>"+
    "<div class='data_element_nazwaproduktu, justify-center flex text-4xl font-semibold p-3'>"+data[i]['Nazwa_Produktu']+"</div>"+
    "<div class='data_element_otherinfo, flex flex-col text-2xl'>"+
    "<div class='flex flex-row justify-center p-2'>"+"<div class='basis-1/5 text-center'>Id: "+data[i]['Id']+"</div>"+"<div class='basis-1/5 text-center'>Producent: "+data[i]['Nazwa_Producenta']+"</div>"+"<div class='basis-1/5 text-center'>Dostępność: "+data[i]['Czy_dostepne']+"</div>"+
    "<div class='basis-1/5 text-center'>Dostępna Ilość: "+data[i]['Ilosc']+"</div>"+"<div class='basis-1/5 text-center'>Cena: "+data[i]['Cena']+"</div></div>"+"<div class='flex flex-row justify-center p-2'>"+"<div class='basis-1/4 text-center'>Sprzedanych: "+data[i]['Ilosc_sprzedanych']+"</div>"+
    "<div class='basis-1/4 text-center'>Dodane: "+data[i]['Data_dodania']+"</div>"+"<div class='basis-1/4 text-center'>Wersja: "+data[i]['Wersja']+"</div>"+"<div class='basis-1/4 text-center'>Gwarancja: "+data[i]['Gwarancja']+"</div></div>"+
    "<div class='flex justify-center p-2'>Opis: "+data[i]['Opis']+"</div>"+"</div>"+
    "<div class='data_element_opinie, grid grid-cols-5 text-xl gap-6'>";
    for(let j=0;j<data[i]['Opinie'].length;j++){
        selector.innerHTML+="<div class='data_element_opinie_element, text-center'>"+
        "<div>Id: "+data[i]['Opinie'][j]["Id"]+"</div>"+"<div>Ocena: "+data[i]['Opinie'][j]["Rating"]+"</div>"+
        "</div>";
    }
    selector.innerHTML+="</div>"+"</div>";
  };
};

var datadiv = document.querySelector("#dane_id");

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
  })
  .catch((error) => {
    fetch('../EDI/data/licencje.json')
      .then((response) => response.json())
      .then((data) => {
        jsondatadiv(data, datadiv);
      })
  })