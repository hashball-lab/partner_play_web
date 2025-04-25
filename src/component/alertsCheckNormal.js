import React, { useEffect, useState, useContext} from 'react'
import '../styles/alerts_play.css'
import '../styles/alerts_check.css'
import close_img from '../icons/close.svg'
import {ChainWallet} from '../store/chain'
import loading_img from '../icons/loading.gif'
import Maincontext from './context'


const AlertsCheckNormal = ({setalertCheckNormalStatus, chooseIndex, chooseEpoch, chooseNums, chooseMultiple, setPage, getDatas}) =>{
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [num6, setNum6] = useState(0);
  const [prize, setPrize] = useState(0);
  const [checkstatus, setcheckstatus] = useState(0);
  const [savestatus, setsavestatus] = useState(0);
  const [claimstatus, setclaimstatus] = useState(0);
  const [claimRequestStatus, setclaimRequestStatus] = useState(0);
  const myContractInfo = useContext(Maincontext);

  function closePage(){
    setalertCheckNormalStatus(0);
  }

  function caculate(){
    if(chooseNums.length > 0){
      let numArray = chooseNums.split(',').map(Number);
      setNum1(numArray[0]);
      setNum2(numArray[1]);
      setNum3(numArray[2]);
      setNum4(numArray[3]);
      setNum5(numArray[4]);
      setNum6(numArray[5]);
    }
  }

  async function doCheck() {
    try{
      setcheckstatus(1);
      const res = await ChainWallet.hashballcontract.check_ball_normal(chooseIndex, chooseEpoch);
      setPrize(res[0]);
      setcheckstatus(2);
    }catch(e){
        console.log(e)
    }
    
  }

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  } 

  async function doSaveStatus() {
    try{
      setsavestatus(1);
      const tx = await ChainWallet.hashballcontract.save_prize_status([num1, num2, num3, num4, num5, num6], 0, chooseIndex, chooseEpoch);
      let res = await tx.wait();
      if(res.status === 1){
        await sleep(5*1000);
        setsavestatus(2);
        setTimeout(() => {
          setPage(1);
          getDatas(1);
        }, 5*1000);
      }
      
    }catch(e){
        console.log(e)
    }
    
  }

  async function doClaimReward() {
        try{
          setclaimstatus(1);
          const tx = await ChainWallet.hashballcontract.claim_prize4_5_6_normal(chooseIndex, chooseEpoch);
          let res = await tx.wait();
          if(res.status === 1){
            await sleep(5*1000);
            setclaimstatus(2);
            setTimeout(() => {
              setPage(1);
              getDatas(1);
            }, 5*1000);
          }
          
        }catch(e){
            console.log(e)
        }
  }

  async function doClaimRequestReward() {
    try{
      setclaimRequestStatus(1);
      const tx = await ChainWallet.hashballcontract.submit_claim_request_normal(chooseIndex, chooseEpoch);
      let res = await tx.wait();
      if(res.status === 1){
        await sleep(5*1000);
        setclaimRequestStatus(2);
        setTimeout(() => {
          setPage(1);
          getDatas(1);
        }, 5*1000);
        
      }
      
    }catch(e){
        console.log(e)
    }
}

  useEffect ( ()=>{
    caculate();
  }, []);
    
    return(
      <div className='alert_con'>
        <div className='alerts_con_hash'>  
          <div className='alert_title'>
            <div className='alert_title_title'>Check Your Hashball Numbers</div>
            <img src={close_img} onClick={closePage}/>
          </div>  

          <div className='check_info_item_num'>
            <div className='check_info_item_name_num'>Hashball Numbers</div>
            <div className='check_info_item_value_num'>
              <li>{num1}</li>
              <li>{num2}</li>
              <li>{num3}</li>
              <li>{num4}</li>
              <li>{num5}</li>
              <li style={{color:'#CC3100'}}>{num6}</li>
            </div>
          </div>
          
          <div className='check_info_item'>
            <div className='check_info_item_name'>Multiplier</div>
            <div className='check_info_item_value'>{chooseMultiple}</div>
          </div>
          <div className='check_info_item'>
            <div className='check_info_item_name'>ID</div>
            <div className='check_info_item_value'>{chooseIndex}</div>
          </div>
          <div className='check_info_item'>
            <div className='check_info_item_name'>Epoch</div>
            <div className='check_info_item_value'>{chooseEpoch}</div>
          </div>
          {checkstatus === 2 && <div className='check_info_item'>
            <div className='check_info_item_name' style={{color: '#CC3100'}}>Prize</div>
            <div className='check_info_item_value' style={{color: '#CC3100'}}>{prize}</div>
          </div>}
          {(checkstatus === 0 || checkstatus === 1) && <div className='check_info_item' >
            </div>}
          {checkstatus === 2 && (prize > 3 && prize < 7) && <div className='check_info_item' >
            <div className='check_info_item_name' style={{color: '#CC3100'}}>Rewards</div>
            <div className='check_info_item_value' style={{color: '#CC3100'}}>{prize === 6 ? (myContractInfo.base_price*2/(10**18)).toFixed(1) : (prize === 5 ? (myContractInfo.base_price*3.5/(10**18)).toFixed(1) : (myContractInfo.base_price*50/(10**18)).toFixed(1))} STT</div>
          </div>}
          {checkstatus === 1 ? <div className='alert_ball_button' style={{marginTop: '80px'}}>
            <img src={loading_img}/>
          </div> : (checkstatus === 2 ? '' : <div className='alert_ball_button' onClick={doCheck} style={{marginTop: '80px'}}>
            Check
          </div>)}
          {checkstatus === 2 && prize === 0 && ( savestatus === 1 ? <div className='alert_ball_button'>
                                                        <img src={loading_img}/>
                                                      </div>
                                                    : savestatus === 2 ? <div className='alert_ball_button'>
                                                                            Save Success!
                                                                          </div> 
                                                                        : <div className='alert_ball_button' onClick={doSaveStatus} >
                                                                            Save Status
                                                                          </div>)}
          {checkstatus === 2 && (prize > 3 && prize < 7) && ( claimstatus === 1 ? <div className='alert_ball_button'>
                                                        <img src={loading_img}/>
                                                      </div>
                                                    : claimstatus === 2 ? <div className='alert_ball_button'>
                                                                            Claim Success!
                                                                          </div> 
                                                                        : <div className='alert_ball_button' onClick={doClaimReward} >
                                                                            Claim Reward
                                                                          </div>)}
          {checkstatus === 2 && (prize > 0 && prize < 4) && ( claimRequestStatus === 1 ? <div className='alert_ball_button'>
                                                        <img src={loading_img}/>
                                                      </div>
                                                    : claimRequestStatus === 2 ? <div className='alert_ball_button'>
                                                                            Claim Request Success!
                                                                          </div> 
                                                                        : <div className='alert_ball_button' onClick={doClaimRequestReward} >
                                                                            Claim Request Reward
                                                                          </div>)}
          
        </div>
      </div>
    )
  }

  export default AlertsCheckNormal