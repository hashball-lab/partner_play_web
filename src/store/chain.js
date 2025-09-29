import * as ethers from "ethers";
import hashballAbi from "../json/hashball_json"
import playballAbi from "../json/playball_json"
import drawwinnerAbi from "../json/drawwinner_json"
import committeesAbi from "../json/committees_json"


import {makeAutoObservable} from 'mobx'

class Wallet{
    
    providers = new ethers.providers.JsonRpcProvider('https://testnet-rpc.monad.xyz')
    
    hashballcontractAddress = "0x7F13609fe56D5BB9f1bbcA365855E9793E685986"
    committeescontractAddress = "0x569aE7dD2111E7128aA019468627F6118bfE343C"
    playballcontractAddress = "0x0d884A37bCA6226718cb9d6E0574452F62c4187d"
    drawwinnercontractAddress = "0xD4642F37AbB2480aaD0732D74f3F08662eE28196"

    chainID = 10143

    hashballcontract = new ethers.Contract(this.hashballcontractAddress, hashballAbi, this.providers)
    playballcontract = new ethers.Contract(this.playballcontractAddress, playballAbi, this.providers)
    drawwinnercontract = new ethers.Contract(this.drawwinnercontractAddress, drawwinnerAbi, this.providers)
    committeescontract = new ethers.Contract(this.committeescontractAddress, committeesAbi, this.providers)
    
    constructor(){
        makeAutoObservable(this)
    }
    async reset() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = await this.provider.getSigner()
        this.hashballcontract = new ethers.Contract(this.hashballcontractAddress, hashballAbi, this.signer)
        this.playballcontract = new ethers.Contract(this.playballcontractAddress, playballAbi, this.signer)
        this.drawwinnercontract = new ethers.Contract(this.drawwinnercontractAddress, drawwinnerAbi, this.signer)
        this.committeescontract = new ethers.Contract(this.committeescontractAddress, committeesAbi, this.signer)
      }

}
const ChainWallet = new Wallet()

export {ChainWallet}
