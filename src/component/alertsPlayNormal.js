import React, { useContext, useState} from 'react'
import '../styles/alerts_play.css'
import close_img from '../icons/close.svg'
import loading_img from '../icons/loading.gif'
import {ChainWallet} from '../store/chain'
import Maincontext from './context'


const AlertsPlayNormal = ({setalertStatus, multi, num1, num2, num3, num4, num5, num6}) =>{
  const [playstatus, setplaystatus] = useState(0);
  const myContractInfo = useContext(Maincontext);

  function closePage(){
    setalertStatus(0);
  }

  async function doPlay() {
    try{
      let nums = [num1, num2, num3, num4, num5, num6];
      setplaystatus(1);
      const tx = await ChainWallet.playballcontract.play_ball_normal(nums, multi, {value: (myContractInfo.base_price*multi).toString()});
      let res = await tx.wait();
      if(res.status === 1){
        setplaystatus(2);        
      }
      
  }catch(e){
      console.log(e)
  }

  }
    
    return(
      <div className='alert_con'>
        <div className='alerts_con'>  
          <div className='alert_title'>
            <div className='alert_title_title'>Play Hash Ball</div>
            <img src={close_img} onClick={closePage}/>
          </div>   
          <div className='alert_ball_num'>
            <div className='alert_ball_num_name'>Ball Numbers</div>
            <div className='alert_ball_num_value'>
              <li>{num1}</li>
              <li>{num2}</li>
              <li>{num3}</li>
              <li>{num4}</li>
              <li>{num5}</li>
              <li style={{color:'#CC3100'}}>{num6}</li>
            </div>
          </div>
          <div className='alert_ball_item'>
            <li className='alert_ball_item_name'>Multiplier</li>
            <li className='alert_ball_item_value'>{multi}</li>
          </div>
          <div className='alert_ball_item'>
            <li className='alert_ball_item_name'>Price</li>
            <li className='alert_ball_item_value'>{((myContractInfo.base_price*multi)/(10**18)).toFixed(1)} STT</li>
          </div>
          {playstatus === 1 ? <div className='alert_ball_button'>
            <img src={loading_img}/> Confirming...
          </div> : (playstatus === 2 ? <div className='alert_ball_button'>
            Success!
          </div> : <div className='alert_ball_button' onClick={doPlay}>
            Confirm
          </div>)}
          
        </div>
      </div>
    )
  }

  export default AlertsPlayNormal