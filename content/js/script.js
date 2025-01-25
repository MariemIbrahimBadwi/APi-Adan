const swiper = new Swiper('.swiper', {
    // loop: true,
    // autoplay:{
    //     delay:5000,
    //     disableOnInteraction: false

    // },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  

  // axios.get('http://api.aladhan.com/v1/timingsByCity/{date}', {
  // })
  // .then(function (response) {
  //   // Get Timings To specific City
  //   let timings    =   response.data.data.timings 
  //   //  Get Dates 
  //   let nameOfday  = response.data.data.date.hijri.weekday.ar //اليوم
  //   let dateHijri  = response.data.data.date.hijri.date //هجري
  //   let dateMilady = response.data.data.date.gregorian.date //ميلادي
    
  //   document.querySelector('#date').innerHTML = `
  //     <span>  ${nameOfday} </span>
  //     <span><b>هـ </b>${dateHijri} </span>
  //     <span><b>مـ </b>${dateMilady} </span>
      
  //   `
  // })

// Change select tag and h1 (name City)
let cities     =  ['الرياض','مكةالمكرمة','تبوك']
let selectCity =  document.querySelector('#cities-select')

for(let city of cities){
  selectCity.innerHTML += `
    <option value=${city}>${city}</option>
    `
    
}    
selectCity.addEventListener('change',function(){
    // // document.querySelector('#name-city').innerHTML =  this.value  
    // if(this.value == 'تبوك'){
    //   document.querySelector('#cards').innerHTML  = ''
    //   handelCity('Tabūk')
    // } else if(this.value == 'مكة المكرمة') {
    //   document.querySelector('#cards').innerHTML  = ''
    //   handelCity('Makah')
    // }
       document.querySelector('#name-city').innerHTML =  this.value  
// Ar Riyāḑ
    switch (this.value) {
      case 'مكةالمكرمة':
        document.querySelector('#cards').innerHTML = '';
        handelCity('Makkah al Mukarramah');
        break;
      case 'تبوك':
        document.querySelector('#cards').innerHTML = '';
        handelCity('Tabūk');
        break;
      case 'الرياض':
        document.querySelector('#cards').innerHTML = '';
        handelCity('Ar Riyāḑ');
        break;
      default:
        document.querySelector('#cards').innerHTML = 'No city selected';
    }
    
})

// Axios Library .. get Adan from Api
function handelCity(cityName){
let params = 
  {
    'country' : "SA",
    'city'    :  cityName //"Makah"
  }



    axios.get('http://api.aladhan.com/v1/timingsByCity/{date}', {
      params: params
    })
    .then(function (response) {
      // Get Timings To specific City
      let timings    =   response.data.data.timings 
      //  Get Dates 
      let nameOfday  = response.data.data.date.hijri.weekday.ar //اليوم
      let dateHijri  = response.data.data.date.hijri.date //هجري
      let dateMilady = response.data.data.date.gregorian.date //ميلادي
      
      document.querySelector('#date').innerHTML = `
        <span>  ${nameOfday} </span>
        <span><b>هـ </b>${dateHijri} </span>
        <span><b>مـ </b>${dateMilady} </span>
        
      `
        
        // MAke Cards
        let cards = [
        {
          'name' : 'الفجر',
          'time' : timings.Fajr
        },
        {
          'name' : 'الشروق',
          'time' :  timings.Sunrise
        },
        {
          'name' : 'الضهر',
          'time' : timings.Dhuhr
        },
        {
          'name' : 'العصر',
          'time' : timings.Asr
        },
        {
          'name' : 'المغرب',
          'time' : timings.Maghrib
        },
        {
          'name' : 'العشاء',
          'time' : timings.Isha
        },
        {
          'name' : 'قيام الليل',
          'time' : timings.Midnight
        },
        ]
      // Loop To make Cards
        for(let card of cards){
          document.querySelector('#cards').innerHTML += `
              <div class="cards-times">
                    <h3 class="name">${card.name}</h3>
                    <h4 class="time">${card.time}</h4>
                </div>  
            `
        }
    
    })
    .catch(function (error) {
      alert(error);
    })    
  } // fun handelCity 
  // handelCity('none')
  
