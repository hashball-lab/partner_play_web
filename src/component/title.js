import React, { useState, useEffect}  from 'react'
import '../styles/title.css'
import logo_img from '../icons/logo.svg'
import somnia_img from '../icons/somnia_logo.png'
import wallet_img from '../icons/wallet.svg'
import {ChainWallet } from '../store/chain';
import * as ethers from "ethers";
import AlertsNetwork from './alertsNetwork';
import AlertsWallet from './alertsWallet';
import AlertsConnected from './alertsConnected'

const Title = ({accounts, setAccounts, choosePage, setChoosePage}) => {

    // const [names, setNames] = useState(accounts);
    const isConnected = Boolean(accounts[0]);
    const [alertsNetworkstatus, setalertsNetworkstatus] = useState(0);
    const [alertsWalletstatus, setalertsWalletstatus] = useState(0);
    const [alertsConnectedstatus, setalertsConnectedstatus] = useState(0);


    const clickPlay = () =>{
      setChoosePage(1)
    }
    const clickResults = () =>{
      setChoosePage(2)
    }

    const clickProfile=()=>{
      setChoosePage(3)
    }

    function redirectToPage() {
        window.open('https://hashball.xyz', '_blank');
    }

    function disPlayNetwork(){
      setalertsNetworkstatus(1);
    }
    function disPlayWallet(){
      setalertsWalletstatus(1);
    }
    function disPlayConnected(){
      setalertsConnectedstatus(1);
    }

    async function connectAccount() {
        if (window.ethereum) {
          try {
                let accounts = await window.ethereum.request({
                  method: "eth_requestAccounts"
                });
                await checkNetwork();
                setAccounts(accounts[0]);
                // setNames(accounts[0]);
                setalertsWalletstatus(0);
              } catch (error) {
                console.log(error)
                console.warn("Please authorize to access tour account");
              };
        } else {
          alert("Pls Install MetaMask or Okx wallet!");
        };
    }

    async function checkNetwork(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let chain = await provider.getNetwork();
          if(chain.chainId != 10143){
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                chainId: "0x279f"
                } 
              ]
            });
            
          } catch (error) {
            try {
              await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: "0x279f",
                      chainName: 'Monad Testnet',
                      rpcUrls: ['https://testnet-rpc.monad.xyz'],
                      blockExplorerUrls: ['https://testnet.monadexplorer.com'],
                      nativeCurrency: {
                        name: 'MON',
                        symbol: 'MON',
                      },
                    }
                  ]
                })
            } catch (ee) {
              alert("Please add Monad Testnet manually");
            }
            
          };
        }
        ChainWallet.reset()
    }

    async function disConnect(){
        setAccounts([]);
        // setNames([]);
        if (window.ethereum) {
          setalertsConnectedstatus(0);
          await window.ethereum.request({ method: 'wallet_disconnect' });
        } else {
          console.error('No Ethereum wallet found.');
        }
    }
    

    return (
      <div className='title_contain'>
        <div className='titles'>
          <div className='titles_contain'>
                <div className='title_tab'>
                  <div className='title_item_play' onClick={clickPlay}>
                  {choosePage === 1 ? 
                    <li className='choose_item'>Play</li>:
                    <li className='no_choose_item'>Play</li>}
                  </div>
                  <div className='title_item' onClick={clickResults}>
                  {choosePage === 2 ?
                    <li className='choose_item'>Results</li>:
                    <li className='no_choose_item'>Results</li>}
                    </div>
                  <div className='title_item' onClick={clickProfile}>
                  {choosePage === 3 ?
                    <li className='choose_item'>Profile</li>:
                    <li className='no_choose_item'>Profile</li>}
                    </div>
                </div>
                <div className='network_wallet'>
                    <div className='network'>
                        <img src={logo_img} onClick={redirectToPage}/>
                    </div>
                    <div className='network'>
                        <img src={somnia_img} style={{width:'28px',height:'28px'}} onClick={disPlayNetwork}/>
                    </div>
                    {isConnected ? <div className='connect_wallet_mobile' style={{background:'linear-gradient(to right, #CC3100, white)', width:'26px', height:'26px', borderradius:'13px'}} onClick={ disPlayConnected}>
                                    </div>
                                  : <div className='connect_wallet_mobile' onClick={ disPlayWallet}>
                                    <img src={wallet_img}/>
                                  </div>}
                </div>
          </div>
        </div>
        {alertsNetworkstatus === 1 && <AlertsNetwork setalertsNetworkstatus={setalertsNetworkstatus}/>}
        {alertsWalletstatus === 1 && <AlertsWallet setalertsWalletstatus={setalertsWalletstatus} connectAccount={connectAccount}/>}
        {alertsConnectedstatus === 1 && <AlertsConnected setalertsConnectedstatus={setalertsConnectedstatus} disConnect={disConnect} accounts={accounts}/>}
      </div>
    )
}

export default Title
