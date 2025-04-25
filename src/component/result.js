import React, { useState, useEffect, useRef, useContext}  from 'react'
import '../styles/result.css'
import Maincontext from './context'
import {ChainWallet} from '../store/chain'


const Result = () => {

  const myContractInfo = useContext(Maincontext);

  const resultRef = useRef();
  const [toNum, settoNum] = useState(0);
  const [data, setData] = useState([]);
  const [currentEpoch, setCurrentEpoch] = useState(0);

  function caculate(){
    if(myContractInfo.rewardinfo.length > 0){
      let arr = []
      for(let i = 0; i < myContractInfo.rewardinfo.length; i++){
        arr.push({id: myContractInfo.epoch*1 -1 - i, epoch: myContractInfo.rewardinfo[i].epoch, jackpot: myContractInfo.rewardinfo[i].jackpot, reward_nums: myContractInfo.rewardinfo[i].reward_nums, epoch_prize1_members: myContractInfo.rewardinfo[i].epoch_prize1_members, epoch_prize123_value: myContractInfo.rewardinfo[i].epoch_prize123_value})
      }
      setData(arr);
      let to = 0;
      if (myContractInfo.epoch*1 -1 > 8){
        to = myContractInfo.epoch*1 -1 - 8;
      }
      settoNum(to);
    }

  }

  async function getDatas(_epoch) {
    if(_epoch > 0){
      let to = 0;
      if (_epoch > 8){
        to = _epoch - 8;
      }
      settoNum(to);
      let result = await ChainWallet.drawwinnercontract.get_epoch_reward_info_list(_epoch, to);
      if(result.length > 0){
          let arr = []
          for(let i = 0; i < result.length; i++){
            arr.push({id: _epoch - i, epoch: result[i].epoch, jackpot: result[i].jackpot, reward_nums: result[i].reward_nums, epoch_prize1_members: result[i].epoch_prize1_members, epoch_prize123_value: result[i].epoch_prize123_value})
          }
          if(_epoch === myContractInfo.epoch*1 - 1){
            setData(arr)
          }else{
            setData(data.concat(arr))
          }
      }

    }
    
  }

  const handleScroll = () =>{
    let res=resultRef.current.scrollHeight - resultRef.current.clientHeight- resultRef.current.scrollTop;
    if (res>1) {
      } else {
          if(toNum > 0){
              getDatas(toNum);
            }
          }
    }

  useEffect ( ()=>{
      if(myContractInfo.address.length > 0){
        setCurrentEpoch(myContractInfo.epoch);
        caculate();    
      }
    }, [myContractInfo.address]);

    return (
        <div className='result_page'>
          <div className='result_contain'>
            <div className='result_title'>
              <li className='result_title_title'>Previous Results</li>
              <div className='result_title_content'>Drawing results are fully decentralized by applying crypto and blockchain technology. Winning numbers are determined by committee's random, future blcok hash and third party random. 
              </div>
            </div>
            {data.length > 0 ? <div className='result_epoch_contain' ref={resultRef} onScroll={handleScroll}>
            {data.map(item => <div className='result_epoch' key={item.id}>
                  <div className='result_epoch_title'>
                    <div className='result_epoch_title_num'>Epoch {item.epoch.toString()}</div>
                    {currentEpoch*1 > (item.epoch.toString()*1 +2) ? <div className='result_epoch_title_disable'>
                                                                      End
                                                                      <li className='result_epoch_title_disable_dot'></li>
                                                                    </div> 
                                                                  : <div className='result_epoch_title_active'>
                                                                    Claiming
                                                                    <li className='result_epoch_title_active_dot'></li>
                                                                  </div>}
                  </div>
                  <div className='result_epoch_ball'>
                        <div className='result_epoch_ball_white'>{item.reward_nums[0]}</div>
                        <div className='result_epoch_ball_white'>{item.reward_nums[1]}</div>
                        <div className='result_epoch_ball_white'>{item.reward_nums[2]}</div>
                        <div className='result_epoch_ball_white'>{item.reward_nums[3]}</div>
                        <div className='result_epoch_ball_white'>{item.reward_nums[4]}</div>
                        <div className='result_epoch_ball_red'>{item.reward_nums[5]}</div>
                      
                  </div>
              </div>)}
            </div>: <div className='result_epoch_contain_nodata'>No Datas</div>}
          </div>

            
        </div>        
        
    )

}

export default Result