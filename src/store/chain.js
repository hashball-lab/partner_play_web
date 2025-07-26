import * as ethers from "ethers";
import hashballAbi from "../json/hashball_json"
import playballAbi from "../json/playball_json"
import drawwinnerAbi from "../json/drawwinner_json"
import committeesAbi from "../json/committees_json"


import {makeAutoObservable} from 'mobx'

class Wallet{
    
    providers = new ethers.providers.JsonRpcProvider('https://dream-rpc.somnia.network')
    
    hashballcontractAddress = "0x0d884A37bCA6226718cb9d6E0574452F62c4187d"
    committeescontractAddress = "0xD5EC8B599B86F8078fdAeeD7cAA95bFb7f791a20"
    playballcontractAddress = "0xB4aDE14D8F967d416CbfC62253bD029f81eF85B0"
    drawwinnercontractAddress = "0xe5756011922032DeeCB6102d44cF261189D547d2"

    chainID = 50312

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
