import React, { useState, useEffect, useContext, useRef }  from 'react'
import '../styles/play.css'
import somnia_img from '../icons/somnia_logo.png'
import add_img from '../icons/add.svg'
import sub_img from '../icons/sub.svg'
import select_img from '../icons/select.svg'
import unselect_img from '../icons/unselect.svg'
import random_img from '../icons/random.svg'
import go_right from '../icons/play_arrow_white.svg'
import AlertsPlayNormal from './alertsPlayNormal'
import AlertsPlayHash from './alertsPlayHash'
import Maincontext from './context'


const Play = () => {
  const myContractInfo = useContext(Maincontext);
  const [hashclicks, setHashClicks] = useState(false);
  const [multiple, setMultiple] = useState(1);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [inputValue6, setInputValue6] = useState('');
  const [inputValueSalt, setInputValueSalt] = useState(0);
  const [alertStatus, setalertStatus] = useState(0);
  const [alertHashStatus, setalertHashStatus] = useState(0);
  const [isProcess, setIsProcess] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);
  const [readonly, setreadonly] = useState(true);

  let timer=useRef();   

  function clickHash(){
    setHashClicks(!hashclicks);
  }

  function doPlus(){
    
    if(multiple<10){
        setMultiple(multiple + 1);
    }
  }

  function doSub(){
    if(multiple>1){
        setMultiple(multiple - 1);
    }
  }

  function doPlay(){
    if(hashclicks){
        setalertHashStatus(1);
    }else{
        setalertStatus(1);
    }
    
  }

  function handleChangeSalt(event){
    setInputValueSalt(event.target.value);
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
        }
    }
    
    if(num === 6){
        if (newValue === '' || (newValue >= 1 && newValue <= 26)) {
            setInputValue6(newValue);
        }
    }
  }

  function auto_random(){
    const uniqueNumbers = generateUniqueRandomNumbers(1, 59, 5);
    let nums = sort_num(uniqueNumbers);
    setInputValue1(nums[0]);
    setInputValue2(nums[1]);
    setInputValue3(nums[2]);
    setInputValue4(nums[3]);
    setInputValue5(nums[4]);
    setInputValue6(Math.floor(Math.random() * 100) % 26 + 1);

  }
  function generateUniqueRandomNumbers(min, max, count) {
    const randomNumbers = new Set();
    
    while (randomNumbers.size < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      randomNumbers.add(randomNumber);
    }
    
    return Array.from(randomNumbers);
  }

  function sort_num(array_data) {
    for (let i = 1; i < 5; i++) {
        let key = array_data[i];
        let j = i;
        while (j > 0 && array_data[j-1] > key) {
            array_data[j] = array_data[j-1];
            j--;
        }
        array_data[j] = key;
    }
    return array_data
  }

  const countDown = (_time) => {
        const nowTime = +new Date(); 
        const times = (_time*1 + myContractInfo.bet_diff - nowTime/1000);
        if(times > 0){
            let d = parseInt(`${(times / 60 / 60 ) / 24}`); 
            let h = parseInt(`${(times / 60 / 60) % 24}`); 
            let m = parseInt(`${(times / 60) % 60}`);
            let s = parseInt(`${times % 60}`); 
        
            if(d < 10){
            d = `0${d}`
            }
            if(h < 10){
            h = `0${h}`
            }
            if(m < 10){
            m = `0${m}`
            }
            if(s < 10){
            s = `0${s}`
            }
            // let times_ = d + "d : " + h + "h : " + m + "m : " + s + "s";
            setDays(d);
            setHours(h);
            setMinutes(m);
            setSecond(s);
            if(times < 3){
                setIsProcess(true);
            }
            
        }else{
        
            if(times > -3){
                setIsProcess(true);
            }
        }
    }


  const toggleReadOnly = () => {
    setTimeout(() => {
        setreadonly(false);
    }, 1000);
    
  };

  function goView(){
    window.open('https://somnia.hashball.xyz/committee', '_blank');
  }

  useEffect ( ()=>{
    if(myContractInfo.address.length > 0){
        if(myContractInfo.starttime){
            if(myContractInfo.starttime != 0){
                const nowTime = +new Date(); 
                const difftimes = parseInt(`${(nowTime/1000 - myContractInfo.starttime) }`);
                if(difftimes < myContractInfo.bet_diff){
                    timer.current = setInterval(()=>{
                        countDown(myContractInfo.starttime);
                    }, 1000);

                }else{
                    setIsProcess(true);
                }

            }
            
        }
    }

    return()=>{
        clearInterval(timer.current);
      }
    
  }, [myContractInfo.address, myContractInfo.starttime]);

    return (
        <div className='play_page'>
            <div className='play_contain'>
                <div className='play_jackpot'>
                    {isProcess ? <div className='play_epoch_contain'> 
                                      <div className='play_inprocess'>
                                            <div className='play_inprocess_content'>Epoch {myContractInfo.epoch.toString()} Drawing Is Live Now</div>
                                            <div className='play_inprocess_content_view' onClick={goView}>View <img src={go_right}/></div>
                                        </div>

                                  </div> 
                                : <div className='play_epoch_contain'>
                                <div className='play_epoch'>
                                    {myContractInfo.address.length > 0 && myContractInfo.starttime === 0 ? <li className='play_epoch_num'>Not Start</li> : <li className='play_epoch_num'>Epoch {myContractInfo.epoch.toString()} Drawing</li>}
                                </div>
                                <div className='play_time'>
                                    <div className='play_time_contain'>
                                        <li className='play_time_contain_time'>{days}</li>
                                        <li className='play_time_contain_name'>DAYS</li>
                                    </div>
                                    <div className='play_time_contain'>
                                        <li className='play_time_contain_time'>{hours}</li>
                                        <li className='play_time_contain_name'>HOURS</li>
                                    </div>
                                    <div className='play_time_contain'>
                                        <li className='play_time_contain_time'>{minutes}</li>
                                        <li className='play_time_contain_name'>MINUTES</li>
                                    </div>
                                    <div className='play_time_contain'>
                                        <li className='play_time_contain_time'>{second}</li>
                                        <li className='play_time_contain_name'>SECONDS</li>
                                    </div>
                                </div>
                            </div>}

                    <div className='play_label'>
                        <li>Current Prize Pool</li>
                    </div>

                    <div className='play_eth'>
                        <img  src={somnia_img}/>
                        <li className='play_eth_num'>{(myContractInfo.jackpot.toString()/(10**18)).toFixed(2)} STT</li>
                    </div>

                </div>
                <div className='play_line'>
                </div>
                <div className='play_info'>
                    <li className='play_info_title'>Enter Your Numbers</li>
                    <li className='play_info_content'>Select five numbers between 1 and 59 for the white balls, then select one number between 1 and 26 for the red ball.</li>
                </div>
                <div className='play_num'>
                    <div className='play_num_random_contain'><img src={random_img} onClick={auto_random}/></div>
                    <div className='play_num_ball'>
                        <div className='play_num_ball_white'>
                            <input autoFocus value={inputValue1} readOnly={readonly} onFocus={toggleReadOnly} 
                                onChange={(e)=>handleChange(e, 1)} />
                        </div>
                        <div className='play_num_ball_white'>
                            <input value={inputValue2}
                                onChange={(e)=>handleChange(e, 2)}/>
                        </div>
                        <div className='play_num_ball_white'>
                            <input value={inputValue3}
                                onChange={(e)=>handleChange(e, 3)}/>
                        </div>
                        <div className='play_num_ball_white'>
                            <input value={inputValue4}
                                onChange={(e)=>handleChange(e, 4)}/>
                        </div>
                        <div className='play_num_ball_white'>
                            <input value={inputValue5}
                                onChange={(e)=>handleChange(e, 5)}/>
                        </div>
                        <div className='play_num_ball_red'>
                            <input value={inputValue6}
                                onChange={(e)=>handleChange(e, 6)}/>
                        </div>
                    </div>
                    <div className='play_num_info'>
                        <div className='play_num_info_crypto'>
                            <div className='play_num_info_crypto_choose' onClick={clickHash}><img src={hashclicks ? select_img: unselect_img}/>Hash Your Ball</div>
                            {hashclicks ? <div className='play_num_info_crypto_tip'>Once you choose, no one know your numbers and you need to keep it safe.</div> : <div className='play_num_info_crypto_tip'></div>}
                        </div>
                        {hashclicks && <div className='play_num_info_contain'>
                            <div className='play_num_info_contain_left'>
                                <li className='play_num_info_contain_name'>Salt</li>
                            </div>
                            <div className='play_num_info_contain_right'>
                                <div className='play_num_info_contain_value'>
                                    <input value={inputValueSalt}
                                onChange={(e)=>handleChangeSalt(e)}/>
                                </div>
                            </div>
                        </div>}
                        <div className='play_num_info_contain'>
                            <div className='play_num_info_contain_left'>
                                <li className='play_num_info_contain_name'>Multiplier</li>
                            </div>
                            <div className='play_num_info_contain_right'>
                                <img src={sub_img} onClick={doSub}/>
                                <li className='play_num_info_contain_multiple'>{multiple}</li>
                                <img src={add_img} onClick={doPlus}/>
                            </div>
                            
                        </div>
                        <div className='play_num_info_contain'>
                            <div className='play_num_info_contain_left'>
                                <li className='play_num_info_contain_name'>Price</li>
                            </div>
                            <div className='play_num_info_contain_right'>
                                <li className='play_num_info_contain_price'>{((myContractInfo.base_price*multiple)/(10**18)).toFixed(1)} STT</li>
                                <img src={somnia_img} style={{marginLeft:'5px'}}/>
                            </div>
                            
                        </div>

                    </div>
                    {(isProcess || myContractInfo.address.length == 0 || myContractInfo.starttime == 0) ? <div className='play_num_button_disable' >
                                        Play
                                 </div> 
                                : <div className='play_num_button' onClick={doPlay}>
                                    Play
                                  </div>}
                </div>
              {alertStatus === 1 && <AlertsPlayNormal setalertStatus={setalertStatus} multi={multiple} num1={inputValue1} num2={inputValue2} num3={inputValue3} num4={inputValue4} num5={inputValue5} num6={inputValue6}/>} 
              {alertHashStatus === 1 && <AlertsPlayHash setalertHashStatus={setalertHashStatus} inputValueSalt={inputValueSalt} multi={multiple} num1={inputValue1} num2={inputValue2} num3={inputValue3} num4={inputValue4} num5={inputValue5} num6={inputValue6}/>} 
            </div>
        </div>
    )

}

export default Play