//Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=4a56e19759958027f46d52fb6cd5db31';


document.getElementById('generate').addEventListener('click', getWeatherAppData);

function getWeatherAppData(e) {

  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;


  if (zipCode === '' || isNaN(zipCode)) {
    alert('please enter valid zip code')
  } else if (zipCode.length < 4) {
    alert(`sorry enter at least 4 digits`)
  } else {

    getdata(baseURL, zipCode, apiKey).then(function (data) {

        try {
          postData('/postRoute', {
            temp: data.main.temp,
            feelings: feelings,
            date: newDate
          });
        } catch (error) {
          console.log('Error', error);
        }

      })
      .then(
        updateUI()
      )
  }
}


const getdata = async (baseURL, zip, apiKey) => {

  const response = await fetch(baseURL + zip + apiKey);
  const data = await response.json();
  try {
    return data
  } catch (error) {
    console.log('Error', error);
  }

}


const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {

    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {

    const newPostData = await response.json();
    return newPostData;

  } catch (error) {
    console.log("error", error);
  }
}


const updateUI = async () => {

  const response = await fetch('/getRoute');

  try {
    const allData = await response.json();
    // console.log(allData, 'new data');

    document.getElementById('date').innerHTML = `Date : ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temp : ${allData.temp}`;
    document.getElementById('content').innerHTML = `Content : ${allData.feelings}`


  } catch (error) {
    console.log("error", error);
  }

}
