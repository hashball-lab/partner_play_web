import './App.css';
import Play from "./component/play"
import Result from './component/result'
import Profile from './component/profile';
import Title from './component/title';
import { useState, useEffect } from "react";
import {ChainWallet} from './store/chain'
import Maincontext from './component/context'

function App() {

  const [choosePage, setChoosePage] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [epoch, setEpoch] = useState(0);
  const [jackpot, setJackpot] = useState(0);
  const [starttime, setStarttime] = useState(0);




  const [rewardinfo, setRewardinfo] = useState([]);

  let obj = {
    address: accounts,
    epoch: epoch,
    starttime: starttime,
    jackpot: jackpot,
    rewardinfo: rewardinfo,

    bet_diff: 3600*46,
    commit_diff: 3600,
    base_price: 1*10**17,
    dealer_address: '0x0000000000000000000000000000000000000000', //replace the address with your partner address
  }


  async function get_reward_info(_epoch) {
    if(_epoch > 0){
      let to = 0;
      if (_epoch > 8){
        to = _epoch - 8;
      }
      let result = await ChainWallet.drawwinnercontract.get_epoch_reward_info_list(_epoch, to);
      setRewardinfo(result);

    }
    
  }

  async function get_first_info() {
    let result = await ChainWallet.committeescontract.get_info_for_first_page();
    if(result.length > 0 ){
      setEpoch(result[0].toString()/1);
      setStarttime(result[1].toString()/1);
      setJackpot(result[2].toString()/1);
      get_reward_info(result[0].toString()*1 - 1);
    }
    
    
  }

  async function getInfo(){
    try {
      await get_first_info();
    }catch(e){
      console.log(e);
    }
  }

  useEffect ( ()=>{
    if(accounts.length > 0){
      setTimeout(() => {
        getInfo();
      }, 1000);
      
    }
  }, [accounts]);

  return (
    <Maincontext.Provider value={obj}>
    <div className="App">
            <Title accounts={accounts} setAccounts={setAccounts} choosePage={choosePage} setChoosePage={setChoosePage}/>
         
            {choosePage === 1 && <Play />}
            {choosePage === 2 && <Result />}
            {choosePage === 3 && <Profile />}
    </div>
    </Maincontext.Provider>
  );
}

export default App;
