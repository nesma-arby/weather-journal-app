//Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=4a56e19759958027f46d52fb6cd5db31';

const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');



document.getElementById('generate').addEventListener('click', getWeatherAppData);

function getWeatherAppData(e) {

  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  if (zipCode === '' || isNaN(zipCode)) {
    alert('please enter valid zip code')
  } else {

    getdata(baseURL, zipCode, apiKey).then(function (data) {

      if (data) {
        postData('/postRoute', {
          temp: data.main.temp,
          feelings: feelings,
          date: newDate
        })
        updateUI()
      }

    })
  }
}


const getdata = async (baseURL, zip, apiKey) => {

  const response = await fetch(baseURL + zip + apiKey);
  const data = await response.json();

  if (data.cod != 200) {
    alert(`sorry ${data.message}`);
    date.textContent = `Date :`
    temp.textContent = `Temp:`
    content.textContent = `Content: `
  } else {

    try {
      return data
    } catch (error) {
      console.log('Error in getdata function', error);
    }

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
    console.log("error in postdata function", error);
  }
}


const updateUI = async () => {

  const response = await fetch('/getRoute');

  try {
    
    const allData = await response.json();

    date.textContent = ` Date: ${allData.date}`;
    temp.textContent = `Temp: ${allData.temp}`;
    content.textContent = `Content: ${allData.feelings}`


  } catch (error) {
    console.log("error in update ui function", error);
  }

}
