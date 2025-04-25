import React, { useState, useEffect, useContext, useRef}  from 'react'
import '../styles/profile.css'
import AlertsCheckHash from './alertsCheckHash'
import AlertsCheckNormal from './alertsCheckNormal'
import AlertsClaimReward from './alertsClaimReward'
import Maincontext from './context'
import axios from 'axios';
import loading_img from '../icons/loading.gif'

const Profile = () => {
    const mypoolInfo = useContext(Maincontext);
    const [alertCheckHashStatus, setalertCheckHashStatus] = useState(0);
    const [alertCheckNormalStatus, setalertCheckNormalStatus] = useState(0);
    const [alertClaimRewardStatus, setalertClaimRewardStatus] = useState(0);
    const [epoch, setEpoch] = useState(0);
    const [chooseIndex, setChooseIndex] = useState([]);
    const [chooseEpoch, setChooseEpoch] = useState([]);
    const [chooseNums, setChooseNums] = useState([]);
    const [choosePrize, setChoosePrize] = useState([]);
    const [chooseMultiple, setChooseMultiple] = useState([]);

    const ballRef = useRef();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [data, setData] = useState([]);
    const [initStatus, setInitStatus] = useState(0);


    function disPlayCheckNormal(_index, _epoch, _nums, _multiple){
        setChooseIndex(_index);
        setChooseEpoch(_epoch);
        setChooseNums(_nums);
        setChooseMultiple(_multiple);
        setalertCheckNormalStatus(1);
    }

    function disPlayCheckHash(_index, _epoch, _nums, _multiple){
        setChooseIndex(_index);
        setChooseEpoch(_epoch);
        setChooseNums(_nums);
        setChooseMultiple(_multiple);
        setalertCheckHashStatus(1);
    }

    function disPlayClaimReward(_index, _epoch, _nums, _multiple, _prize){
        setChooseIndex(_index);
        setChooseEpoch(_epoch);
        setChooseNums(_nums);
        setChooseMultiple(_multiple);
        setChoosePrize(_prize)
        setalertClaimRewardStatus(1);

    }
    function HandHash(str){
        if(str.length >20){
            let pre = str.substr(0,10);
            let end = str.substr(str.length - 10, 10);
            return pre+'...'+ end;
        }else{
        return str;
        }
    }

    const ParsTime=(time)=>{
        let timestamp = time
        let date = new Date(parseInt(timestamp) * 1000);
        let Year = date.getFullYear();
        let Month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        let  GMT =  Month + '/' + Day + '/' +  Year;
        return GMT;

    }

    const getDatas = async(_pages) =>{
      
        try{
            const res = await axios.get('https://api.hashball.xyz/getmyball', {
              params: {
                page_num: _pages,
                page_size: 10,
                address: mypoolInfo.address,
              }
          })

          if(res.status == 200){
            if(res.data.paging.total%res.data.paging.page_size == 0){
              if(parseInt(res.data.paging.total/res.data.paging.page_size) > 0){
                setTotalPage(parseInt(res.data.paging.total/res.data.paging.page_size))
              }
            }else{
                setTotalPage(parseInt(res.data.paging.total/res.data.paging.page_size) + 1)
            }
            let arr = []
            for(let i = 0; i < res.data.data.length; i++){
              arr.push({id: (res.data.paging.page_num - 1)*10 + i,ball_index: res.data.data[i].ball_index, address: res.data.data[i].address, epoch: res.data.data[i].epoch, multiple: res.data.data[i].multiple, hashball: res.data.data[i].hashball, nums: res.data.data[i].numbers, types: res.data.data[i].types, reward: res.data.data[i].reward, claimstatus: res.data.data[i].claimstatus, time: ParsTime(res.data.data[i].time)})
            }
            if(_pages == 1){
              setData(arr)
            }else{
              setData(data.concat(arr))
            }
            setInitStatus(1);
            
           }
        }catch(e){
          console.log(e)
        }
      }
    
      const handleScroll = () =>{
        let res=ballRef.current.scrollHeight - ballRef.current.clientHeight- ballRef.current.scrollTop;
        if (res>1) {
          } else {
              if(page < totalPage){
                if(mypoolInfo.address.length > 0){
                  getDatas(page+1)
                  setPage(page+1)
                }
              }
        }
      }
    function caculate(){
        setEpoch(mypoolInfo.epoch.toString()*1);
    }
    useEffect ( ()=>{
    if(mypoolInfo.address.length > 0){
        caculate();
        setPage(1);
        getDatas(1);
    }
    }, [mypoolInfo.address, mypoolInfo.isCommunity, mypoolInfo.mycommunityName]);

    return (
        <div className='profile_page'>
          <div className='profile_contain'>
            <div className='profile_title_history'>My Hash Ball Play History</div>
                {(initStatus === 0 && mypoolInfo.address.length > 0) ? <div className='profile_item_contain_nodata'><img src={loading_img}/></div> 
                                : (data.length > 0 ? <div className='profile_item_contain' ref={ballRef} onScroll={handleScroll}>
                
                                                            {data.map(item => <div className='profile_history_item' key={item.id}>
                                                                <div className='profile_history_item_hash'>
                                                                    <div className='profile_history_item_hash_contain'>
                                                                        <li className='profile_history_item_hash_title'>{item.types === 4 ? 'Ball Numbers' : 'Hashball'}</li>
                                                                        <li className='profile_history_item_hash_value'>{item.types === 4 ? item.nums: HandHash(item.hashball)}</li>
                                                                    </div>
                                                                    {(item.epoch*1 + 2 < epoch) ? '' 
                                                                                                : (item.reward === 8 ? (epoch > item.epoch && (item.types === 4 ? <div className='profile_history_item_hash_check' onClick={()=>disPlayCheckNormal(item.ball_index, item.epoch, item.nums, item.multiple)}>Check</div> 
                                                                                                                                                                : <div className='profile_history_item_hash_check' onClick={()=>disPlayCheckHash(item.ball_index, item.epoch, item.hashball, item.multiple)}>Check</div>))
                                                                                                                    : (epoch > item.epoch && item.reward < 4 && item.reward > 0 ? ( item.claimstatus === 1 ? <div className='profile_history_item_hash_check' onClick={()=>disPlayClaimReward(item.ball_index, item.epoch, item.hashball, item.multiple, item.reward)}>Claim</div>
                                                                                                                                                                                                    : '')
                                                                                                                                                                                : ''))}
                                                                </div>
                                                                <div className='profile_history_item_line'></div>
                                                                <div className='profile_history_item_property'>
                                                                    <div className='profile_history_item_property_id'>
                                                                        <div className='profile_history_item_id'>ID</div>
                                                                        <div className='profile_history_item_value'>{item.ball_index}</div>
                                                                    </div>
                                                                    <div className='profile_history_item_property_date'>
                                                                        <div className='profile_history_item_id'>Play Date</div>
                                                                        <div className='profile_history_item_value'>{item.time}</div>
                                                                    </div>
                                                                    <div className='profile_history_item_property_id'>
                                                                        <div className='profile_history_item_id'>Epoch</div>
                                                                        <div className='profile_history_item_value'>{item.epoch}</div>
                                                                    </div>
                                                                    <div className='profile_history_item_property_id'>
                                                                        <div className='profile_history_item_id'>Multiplier</div>
                                                                        <div className='profile_history_item_value'>{item.multiple}x</div>
                                                                    </div>
                                                                    <div className='profile_history_item_property_id'>
                                                                        <div className='profile_history_item_id'>Prize</div>
                                                                        <div className='profile_history_item_value'>{item.reward < 8 ? item.reward : ''}</div>
                                                                    </div>
                                                                    <div className='profile_history_item_property_id'>
                                                                        <div className='profile_history_item_id'>Status</div>
                                                                        <div className='profile_history_item_value'>{(item.epoch*1 + 2 < epoch) ? 'End' : (item.reward === 0 ? 'End' : (item.claimstatus > 0 ? (item.claimstatus === 2 ? 'Claimed' : 'Wait Claim') : (item.epoch*1 < epoch ? 'Check' : 'Waiting')))}</div>
                                                                    </div>
                                                                </div>
                                                            </div>)}
                                                        
                                                    </div> 
                                                    : <div className='profile_item_contain_nodata'>No Datas</div>) }
            </div>
          {alertCheckHashStatus === 1 && <AlertsCheckHash setalertCheckHashStatus={setalertCheckHashStatus} chooseIndex={chooseIndex} chooseEpoch={chooseEpoch} chooseNums={chooseNums} chooseMultiple={chooseMultiple} setPage={setPage} getDatas={getDatas}/>}
          {alertCheckNormalStatus === 1 && <AlertsCheckNormal setalertCheckNormalStatus={setalertCheckNormalStatus} chooseIndex={chooseIndex} chooseEpoch={chooseEpoch} chooseNums={chooseNums} chooseMultiple={chooseMultiple} setPage={setPage} getDatas={getDatas}/>}
          {alertClaimRewardStatus === 1 && <AlertsClaimReward setalertClaimRewardStatus={setalertClaimRewardStatus} currentEpoch={epoch} choosePrize={choosePrize} chooseIndex={chooseIndex} chooseEpoch={chooseEpoch} chooseNums={chooseNums} chooseMultiple={chooseMultiple} setPage={setPage} getDatas={getDatas}/>}
        </div>        
        
    )

}

export default Profile