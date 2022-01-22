import { useState } from "react";
import { ethers } from 'ethers'

export const useHellos = ({contractAddress, contractABI}) => {
    
    const [allHellos, setAllHellos] = useState([]);


    const getAllHellos = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
            const hellos = await contract.getAllHello();
    
            const newHellos = hellos.map(({user, timestamp, message}) => ({
              address: user,
              timestamp: new Date(timestamp * 1000),
              message: message
            }));
            
            setAllHellos(newHellos);
          } else {
            console.log("Ethereum object doesn't exist!")
          }
        } catch (error) {
          console.log(error);
        }
      }

      
    return {
        getAllHellos,
        allHellos
    }
}


