import { useState, useEffect } from "react";
import { ethers } from 'ethers'

export const useHellos = ({contractAddress, contractABI}) => {
    
    const [allHellos, setAllHellos] = useState([]);

    useEffect(() => {
        let helloContract;
      
        const onNewHello = (from, timestamp, message) => {
          setAllHellos(prevState => [
            {
              address: from,
              timestamp: new Date(timestamp * 1000),
              message: message,
            },
            ...prevState,
          ]);
        };
      
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
      
          helloContract = new ethers.Contract(contractAddress, contractABI, signer);
          helloContract.on("newHello", onNewHello);
        }
      
        return () => {
          if (helloContract) {
            helloContract.off("newHello", onNewHello);
          }
        };
      }, []);
      


    const getAllHellos = async () => {
        try {
          console.log('getAllHellos')
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
            })).reverse();
            
            setAllHellos(newHellos);
          } else {
            console.log("Ethereum object doesn't exist!")
          }
        } catch (error) {
          console.log(error);
        }
      }

      const sendHello = async (message) => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const helloTxn = await contract.hello(message, { gasLimit: 300000 });
            console.log("Mining...", helloTxn.hash);
    
            await helloTxn.wait();
            console.log("Mined -- ", helloTxn.hash);
            
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error)
        }
      }
    

      
    return {
        getAllHellos,
        allHellos,
        sendHello
    }
}


