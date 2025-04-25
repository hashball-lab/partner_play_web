import React, { useEffect, useState, useContext} from 'react'
import '../styles/alertsnetwork.css'
import close_img from '../icons/close.svg'
import somnia_img from '../icons/somnia_logo.png'




const AlertsNetwork = ({setalertsNetworkstatus}) =>{


  function closePage(){
    setalertsNetworkstatus(0);
  }

    return(
      <div className='alert_con_network'>
        <div className='alerts_con_network'>  
          <div className='alert_title_network'>
            <div className='alert_title_title_network'>Network</div>
            <img src={close_img} onClick={closePage}/>
          </div>   
          
          <div className='alert_network'> 
              <img src={somnia_img}/>
              <li>Somnia Testnet</li>
          </div>
          
        </div>
      </div>
    )
  }

  export default AlertsNetwork