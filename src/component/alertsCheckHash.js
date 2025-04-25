import React, { useEffect, useState, useContext} from 'react'
import '../styles/alerts_play.css'
import '../styles/alerts_check.css'
import close_img from '../icons/close.svg'
import loading_img from '../icons/loading.gif'
import {ChainWallet} from '../store/chain'
import * as ethers from "ethers";
import Maincontext from './context'


const AlertsCheckHash = ({setalertCheckHashStatus, chooseIndex, chooseEpoch, chooseNums, chooseMultiple, setPage, getDatas}) =>{

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [inputValue6, setInputValue6] = useState('');
  const [inputValueSalt, setInputValueSalt] = useState(0);
  const [prize, setPrize] = useState(0);
  const [checkstatus, setcheckstatus] = useState(0);
  const myContractInfo = useContext(Maincontext);
  const [savestatus, setsavestatus] = useState(0);
  const [claimstatus, setclaimstatus] = useState(0);
  const [claimRequestStatus, setclaimRequestStatus] = useState(0);



  function closePage(){
    setalertCheckHashStatus(0);
  }

  function handleChange(event, num){
    const newValue = event.target.value;
    if (newValue === '' || (newValue >= 1 && newValue <= 59)) {
        if(num === 1){
            setInputValue1(newValue);
        }else if(num === 2){
            setInputValue2(newValue);
        }else if(num === 3){
            setInputValue3(newValue);
        }else if(num === 4){
            setInputValue4(newValue);
        }else if(num === 5){
            setInputValue5(newValue);
        }else if(num === 6){
            setInputValue6(newValue);
        }
        
    }
  }

  async function doCheck() {
    if(myContractInfo.address.length > 0){
      let hash = ethers.utils.solidityKeccak256(["uint32[6]", "uint256"], [[inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6], inputValueSalt]);
      
      // console.log(hash);
      if(hash == chooseNums){
        try{
        setcheckstatus(1);
        const res = await ChainWallet.hashballcontract.check_ball([inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6], inputValueSalt, chooseIndex, chooseEpoch);
        setPrize(res[0]);
        setcheckstatus(2);
        }catch(e){
          console.log(e)
        }

      }else{
        alert('Your Input numbers and salt does not match the submitted hash, pls input the right numbers');
      }
       
    }
    
  }

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  } 

  async function doSaveStatus() {
      try{
        setsavestatus(1);
        const tx = await ChainWallet.hashballcontract.save_prize_status([inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6], inputValueSalt, chooseIndex, chooseEpoch);
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
        const tx = await ChainWallet.hashballcontract.claim_prize4_5_6([inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6], inputValueSalt, chooseIndex, chooseEpoch);
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
        const tx = await ChainWallet.hashballcontract.submit_claim_request([inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6], inputValueSalt, chooseIndex, chooseEpoch);
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

    
    return(
      <div className='alert_con'>
        <div className='alerts_con_hash'>  
          <div className='alert_title'>
            <div className='alert_title_title'>Check Your Hashball Numbers</div>
            <img src={close_img} onClick={closePage}/>
          </div>  
          <div className='check_content'>
            <div className='check_num_ball'>
                  <div className='check_num_ball_white'>
                      <input autoFocus value={inputValue1}
                          onChange={(e)=>handleChange(e, 1)}/>
                  </div>
                  <div className='check_num_ball_white'>
                      <input value={inputValue2}
                          onChange={(e)=>handleChange(e, 2)}/>
                  </div>
                  <div className='check_num_ball_white'>
                      <input value={inputValue3}
                          onChange={(e)=>handleChange(e, 3)}/>
                  </div>
                  <div className='check_num_ball_white'>
                      <input value={inputValue4}
                          onChange={(e)=>handleChange(e, 4)}/>
                  </div>
                  <div className='check_num_ball_white'>
                      <input value={inputValue5}
                          onChange={(e)=>handleChange(e, 5)}/>
                  </div>
                  <div className='check_num_ball_red'>
                      <input value={inputValue6}
                          onChange={(e)=>handleChange(e, 6)}/>
                  </div>
            </div>
            <div className='check_num_salt'>
              <li>Salt</li>
              <input value={inputValueSalt}
                    onChange={(e)=>setInputValueSalt(e.target.value)}/>
            </div>
          </div> 
          <div className='check_info_item' >
            <div className='check_info_item_name'>Multiplier</div>
            <div className='check_info_item_value'>{chooseMultiple}</div>
          </div>
          <div className='check_info_item'>
            <div className='check_info_item_name'>ID</div>
            <div className='check_info_item_value'>{chooseIndex}</div>
          </div>
          <div className='check_info_item'>
            <div className='check_info_item_name'>Hashball</div>
            <div className='check_info_item_value'>{chooseNums}</div>
          </div>
          {(checkstatus === 0 || checkstatus === 1) && <div className='check_info_item' >
          </div>}
          {checkstatus === 2 && <div className='check_info_item' >
            <div className='check_info_item_name' style={{color: '#CC3100'}}>Prize</div>
            <div className='check_info_item_value' style={{color: '#CC3100'}}>{prize}</div>
          </div>}
          {checkstatus === 2 && (prize > 3 && prize < 7) && <div className='check_info_item' >
            <div className='check_info_item_name' style={{color: '#CC3100'}}>Rewards</div>
            <div className='check_info_item_value' style={{color: '#CC3100'}}>{prize === 6 ? (myContractInfo.base_price*2/(10**18)).toFixed(1) : (prize === 5 ? (myContractInfo.base_price*3.5/(10**18)).toFixed(1) : (myContractInfo.base_price*50/(10**18)).toFixed(1))} STT</div>
          </div>}
          {checkstatus === 1 ? <div className='alert_ball_button'>
                      <img src={loading_img}/>
                    </div> : (checkstatus === 2 ? '' : <div className='alert_ball_button' onClick={doCheck}>
                      Check
                    </div>)}
          {checkstatus === 2 && prize === 0 && ( savestatus === 1 ? <div className='alert_ball_button'>
                                                                  <img src={loading_img}/>
                                                                </div>
                                                              : savestatus === 2 ? <div className='alert_ball_button' >
                                                                                      Save Success!
                                                                                    </div> 
                                                                                  : <div className='alert_ball_button' onClick={doSaveStatus} >
                                                                                      Save Status
                                                                                    </div>)}
           {checkstatus === 2 && (prize > 3 && prize < 7) && ( claimstatus === 1 ? <div className='alert_ball_button' >
                                                                  <img src={loading_img}/>
                                                                </div>
                                                              : claimstatus === 2 ? <div className='alert_ball_button' >
                                                                                      Claim Success!
                                                                                    </div> 
                                                                                  : <div className='alert_ball_button' onClick={doClaimReward} >
                                                                                      Claim Reward
                                                                                    </div>)}
           {checkstatus === 2 && (prize > 0 && prize < 4) && ( claimRequestStatus === 1 ? <div className='alert_ball_button' >
                                                                   <img src={loading_img}/>
                                                                 </div>
                                                               : claimRequestStatus === 2 ? <div className='alert_ball_button' >
                                                                                       Claim Request Success!
                                                                                     </div> 
                                                                                   : <div className='alert_ball_button' onClick={doClaimRequestReward} >
                                                                                       Claim Request Reward
                                                                                     </div>)}
        </div>
      </div>
    )
  }

  export default AlertsCheckHash