import React from 'react';

function NavBar(props){
    return(
        <div className="row">
            <div className="col-md-6">
                <h1 className="title">Realtime Weather</h1>
            </div>
            <div className="col-md-6">
                <form className="region" onSubmit={(e)=>props.changeWeather(e)}>
                    <input className="region-input" placeholder="Enter your Location" onChange={ 
                        (e)=> {props.changeRegion(e.target.value)}}/>
                </form>
            </div>

        </div>
        
    )

}
export default NavBar;
