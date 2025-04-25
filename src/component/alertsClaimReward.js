import React, { useEffect, useState, useContext} from 'react'
import '../styles/alerts_play.css'
import '../styles/alerts_check.css'
import close_img from '../icons/close.svg'
import loading_img from '../icons/loading.gif'
import {ChainWallet} from '../store/chain'
import * as ethers from "ethers";
import Maincontext from './context'


const AlertsClaimReward = ({setalertClaimRewardStatus, chooseIndex, currentEpoch, choosePrize, chooseEpoch, chooseNums, chooseMultiple, setPage, getDatas}) =>{

  const myContractInfo = useContext(Maincontext);
  const [claimstatus, setclaimstatus] = useState(0);
  const [poolRreward, setpoolRreward] = useState(0);
  const [poolMember, setpoolMember] = useState(0);




  function closePage(){
    setalertClaimRewardStatus(0);
  }

  

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  } 

  

  async function doClaimReward() {
      try{
        setclaimstatus(1);
        const tx = await ChainWallet.hashballcontract.claim_prize1_2_3(chooseIndex, chooseEpoch);
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

    useEffect ( ()=>{
      if(myContractInfo.address.length > 0){
         if(myContractInfo.rewardinfo.length > 0){
            for(let i = 0; i< myContractInfo.rewardinfo.length; i++){
              if(myContractInfo.rewardinfo[i].epoch.toString()*1 === chooseEpoch){
                if(choosePrize > 0){
                  setpoolMember(myContractInfo.rewardinfo[i].epoch_prize1_members[choosePrize-1].toString());
                  setpoolRreward(myContractInfo.rewardinfo[i].epoch_prize123_value[choosePrize-1].toString());

                }
                
              }

            }
         }
      }
      }, [myContractInfo.address]);
    
    return(
      <div className='alert_con'>
        <div className='alerts_con_hash'>  
          <div className='alert_title'>
            <div className='alert_title_title'>Claim Your Rewards</div>
            <img src={close_img} onClick={closePage}/>
          </div>  
          
          <div className='check_info_item' style={{marginTop: '40px', height: '25px'}}>
            <div className='check_info_item_name'>ID</div>
            <div className='check_info_item_value'>{chooseIndex}</div>
          </div>
          <div className='check_info_item'>
            <div className='check_info_item_name'>Hashball</div>
            <div className='check_info_item_value'>{chooseNums}</div>
          </div>
          <div className='check_info_item' style={{height: '25px'}}>
            <div className='check_info_item_name'>Multiplier</div>
            <div className='check_info_item_value'>{chooseMultiple}</div>
          </div>
          <div className='check_info_item' style={{height: '25px'}}>
            <div className='check_info_item_name'>Epoch</div>
            <div className='check_info_item_value'>{chooseEpoch}</div>
          </div>
          <div className='check_info_item' style={{height: '25px'}}>
            <div className='check_info_item_name' style={{color: '#CC3100'}}>Prize</div>
            <div className='check_info_item_value' style={{color: '#CC3100'}}>{choosePrize}</div>
          </div>
          <div className='check_info_item' style={{height: '25px'}}>
            <div className='check_info_item_name' style={{color: '#CC3100'}}>Prize {choosePrize} Pool</div>
            <div className='check_info_item_value' style={{color: '#CC3100'}}>{(poolRreward/(10**18)).toFixed(1)} STT</div>
          </div>
          <div className='check_info_item' style={{height: '25px'}}>
            <div className='check_info_item_name' style={{color: '#CC3100'}}>Members</div>
            <div className='check_info_item_value' style={{color: '#CC3100'}}>{poolMember}</div>
          </div>
          <div className='check_info_item' style={{height: '25px'}}>
            <div className='check_info_item_name' style={{color: '#CC3100'}}>Rewards</div>
            <div className='check_info_item_value' style={{color: '#CC3100'}}>{((poolRreward/poolMember)/(10**18)).toFixed(1)} STT</div>
          </div>
           {  claimstatus === 1 ? <div className='alert_ball_button' >
                                                                  <img src={loading_img}/>
                                                                </div>
                                                              : claimstatus === 2 ? <div className='alert_ball_button' >
                                                                                      Claim Success!
                                                                                    </div> 
                                                                                  : (currentEpoch === chooseEpoch + 2 ? <div className='alert_ball_button' onClick={doClaimReward} >
                                                                                                                          Claim Reward
                                                                                                                        </div> 
                                                                                                                      : <div className='alert_ball_button_disable'>
                                                                                                                          Wait 1 Epoch to Claim
                                                                                                                        </div> )}
        </div>
      </div>
    )
  }

  export default AlertsClaimReward