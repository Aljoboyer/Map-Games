import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '1000px',
    height: '600px'
  };
  
  const center = {
    lat: 46.383297187442025,
    lng: 23.219772123743617
  };

    const cities = [ 
   
    { 
   
    name: "Amsterdam",  position: { 
   
    lat: 52.370216,  lng: 4.895168  } 
   
    }, 
   
    { 
   
    name: "Rome",  position: { 
   
    lat: 41.902783,  lng: 12.496366  } 
   
    }, 
   
    { 
   
    name: "Helsenki",  position: { 
   
    lat: 60.169856,  lng: 24.938379  } 
   
    }, 
   
    { 
   
    name: "Stockholm",  position: { 
   
    lat: 59.329323,  lng: 18.068581  } 
   
    }, 
   
    { 
   
    name: "London",  position: { 
   
    lat: 51.507351,  lng: -0.127758  } 
   
    }, 
   
    { 
   
    name: "Oslo", 
   
    position: { 
   
    lat: 59.913869,  lng: 10.752245  } 
   
    }, 
   
    { 
   
    name: "Paris", 
   
    position: { 
   
    lat: 48.856614,  lng: 2.352222  } 
   
    }, 
   
    { 
   
    name: "Wien", 
   
    position: { 
   
    lat: 48.208174,  lng: 16.373819  } 
   
    }, 
   
    { 
   
    name: "Budapest",  position: { 
   
    lat: 47.497912,  lng: 19.040235  } 
   
    } 
   
    ] 
   
  
const MapPlayGround = () => {
  const [mark , setMark] = useState(center);
  const [correct, setCorrect] = useState('');
  const [mainD, setMainD] = useState(1500);
  const [distance, setDistance] = useState('');
  const [markArr, setMarkArr] = useState([])

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY
      })
    if(!isLoaded){
      return <h1>Loading</h1>
    }

    const ClickHandler = (e) =>{

      const LatLangdata = JSON.stringify(e.toJSON(), null, 2)
      const LatLang = JSON.parse(LatLangdata)
      setMark(LatLang)
      let R = 6371;

      cities.forEach(city => {
        let dLat = toRad(LatLang.lat - city.position.lat);
        let dLon = toRad(LatLang.lng - city.position.lng);
        let lat1 = toRad(city.position.lat);
        let lat2 = toRad(LatLang.lat);
  
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
          let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          let d = R * c;
          const dimension = parseInt(d)
          if(dimension >= 50){
            setDistance(`The distance Between Two city is ${dimension} Km`)
              setMainD(mainD - dimension)
              setMarkArr([...markArr, city.position])
              console.log('dukse', city.position)
          }
          else if (dimension <= 50 ){
            setCorrect(`correct`)
            console.log('correct')
          }
      });
}

    // Converts numeric degrees to radians
    const toRad = (Value) =>  
    {
        return Value * Math.PI / 180;
    }
console.log('arr', markArr)
console.log('mark', mark)
  return (
    <section className='game_container'>
        <div className='game_div'>
        <h1 className='game_title'>This is Map Play Ground</h1>
        <h1>{correct}</h1>
         {mainD >= 0 ? <h4>Your Total Points: {mainD} </h4> : <h4 className='fw-bold text-danger'>Game Over</h4>}
        <h4>{distance}</h4>
        {
            isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={2}
                  onClick={(e) => ClickHandler(e.latLng)}
                >
                  {
                    markArr.length > 0 && 
                      markArr.map(m => <Marker position={m}/>)
                    
                  }
                 <Marker position={mark}/>
                </GoogleMap>
            ) :  <h1>Loading....</h1>
          }
        </div>
    </section>
  );
}

export default MapPlayGround;
// AIzaSyD7fc4UWNO_d6GJfmaSLaQWddj8ZWagnmU



