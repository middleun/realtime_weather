import React from 'react';
import Axios from 'axios';
import './App.css';
import DisplayData from './components/DisplayData';
import NavBar from './components/NavBar';



class App extends React.Component{

  state={
    coords:{
      latitude:37,
      longitude:127
    },
    data:{},
    inputData:""
  }
  // 새로운 변수를 만들고 setState로 지정해주어야.

  componentDidMount(){
    // console.log('render mounted');
    if(navigator.geolocation){
      // console.log('supported');
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude, position.coords.longitude);
        let newCoords={
          latitude:position.coords.latitude,
          longtitude:position.coords.longitude
        }
        this.setState({coords:newCoords});
        // console.log(this.state.coords);

        Axios.get(`http://api.weatherstack.com/current?access_key=3529f1d57aac45975e8d3583d19d5890&query=${this.state.coords.latitude},${this.state.coords.longtitude}`).then((res)=>{
          // console.log(res);
          let weatherData={
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }
          this.setState({data:weatherData});
          // console.log(this.state.data);


        });
      });

    }else{
      console.log('not supported');
    }
  }

  // input에 들어가는 value값
  change=(value)=>{
    // console.log(value);
    this.setState({inputData:value});
    // console.log(this.state.inputData)

  }
  //this값을 바인딩하기 위해 화살표함수 써줘야. 
  // 날씨 img바꾸려면 아이콘 혹은 이미지 저장 후 배열 지정(1.jpg ...)
  changeWeather=(event)=>{
    event.preventDefault();
    Axios.get(`http://api.weatherstack.com/current?access_key=3529f1d57aac45975e8d3583d19d5890&query=${this.state.inputData}`).then((res)=>{
      // console.log(res);
      let weatherData={
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons
      }
      this.setState({data:weatherData});
      // console.log(this.state.data);


    });

  }


  render(){
    return (
      <div className="App">
        <div className="container">
          <NavBar changeRegion={this.change} changeWeather={this.changeWeather}/>
          <DisplayData weather={this.state.data}/>
        </div>
      </div>
    );
  }
    
  
  
}

export default App;
