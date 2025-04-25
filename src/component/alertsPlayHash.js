import React, { useEffect, useState, useContext} from 'react'
import '../styles/alerts_play_hash.css'
import '../styles/alerts_play.css'
import close_img from '../icons/close.svg'
import copy_alert_img from '../icons/copy_alert.svg'
import copied_img from '../icons/copied.svg'
import unselect_img from '../icons/unselect.svg'
import select_img from '../icons/select.svg'
import loading_img from '../icons/loading.gif'
import * as ethers from "ethers";
import Maincontext from './context'
import {ChainWallet} from '../store/chain'
import copy from  'copy-to-clipboard';


const AlertsPlayHash = ({setalertHashStatus, inputValueSalt, multi, num1, num2, num3, num4, num5, num6}) =>{
  const [readclicks, setReadclicks] = useState(false);
  const [copyclicks, setCopyclicks] = useState(false);
  const [hashrandom, setHashrandom] = useState('');
  const [playstatus, setplaystatus] = useState(0);
  const myContractInfo = useContext(Maincontext);

  function closePage(){
    setalertHashStatus(0);
  }

  function clickRead(){
    setReadclicks(!readclicks);
  }
  function clickCopy(){
    copy('numbers: ' + num1 + ',' + num2 + ',' + num3 + ',' + num4 + ',' + num5 + ',' + num6 + '; salt: ' + inputValueSalt + '; hash: ' + hashrandom);
    setCopyclicks(true);
  }

  async function doPlay() {
      try{
        setplaystatus(1);
        const tx = await ChainWallet.playballcontract.play_ball(hashrandom, multi, {value: (myContractInfo.base_price*multi).toString()});
        let res = await tx.wait();
        if(res.status === 1){
          setplaystatus(2);          
        }
        
      }catch(e){
          console.log(e)
      }

  }

  useEffect ( ()=>{
    if(myContractInfo.address.length > 0){
      setHashrandom(ethers.utils.solidityKeccak256(["uint32[6]","uint256"], [[num1, num2, num3, num4, num5, num6], inputValueSalt]));
    }

  }, []);
    
    return(
      <div className='alert_con'>
        <div className='alerts_con_hash'>  
          <div className='alert_title'>
            <div className='alert_title_title'>Play Hash Ball</div>
            <img src={close_img} onClick={closePage}/>
          </div>   
          <div className='alert_ball_num_hash'>
            <div className='alert_ball_num_hash_contain'>
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
            <div className='alert_ball_num_hash_contain'>
              <div className='alert_ball_num_name'>Salt</div>
              <div className='alert_ball_num_value'>
                {inputValueSalt}
              </div>
            </div>
            <div className='alert_ball_num_hash_contain'>
              <div className='alert_ball_num_name_hash'>Hash Ball</div>
              <div className='alert_ball_num_value_hash'>
                 {hashrandom}
              </div>
            </div>
            <div className='alert_ball_num_hash_contain'>
              <div className='alert_ball_num_name_hash'></div>
              <div className='alert_ball_num_value_hash'>
                {copyclicks && <li>Copied</li>}<img src={copyclicks ? copied_img : copy_alert_img} onClick={clickCopy}/>
              </div>
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
          <div className='alert_ball_item_hash' onClick={clickRead}>
            <img src={readclicks ? select_img: unselect_img}/>
            <li>I have saved the above Hash Ball Numbers, Salt and Hash. And I konw I can't get rewards if I lost them.</li>
          </div>
          {readclicks ? (playstatus === 1 ? <div className='alert_ball_button'><img src={loading_img}/> Confirming...</div>
                                          : (playstatus === 2 ? <div className='alert_ball_button' >Success!</div>
                                                              : <div className='alert_ball_button' onClick={doPlay}>
                                                                Confirm
                                                              </div>) )
                      : <div className='alert_ball_button_disable'>
                        Confirm
                      </div>}
          
        </div>
      </div>
    )
  }

  export default AlertsPlayHash