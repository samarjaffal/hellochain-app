import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Loginbutton } from './components/LoginButton';
import { Newcomment } from './components/NewComment';
import { ListOfHellos } from './components/ListOfHellos';
import abi from './utils/HelloChain.json'

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allHellos, setAllHellos] = useState([]);

  const contractAddress = "0xE949ba232851c43329f999486310dAdE499B4941";
  const contractABI = abi.abi

  useEffect(() => {
    checkIfWalletIsConnected();
    getAllHellos()
  }, [])

  const checkIfWalletIsConnected = async () => {

    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
  }


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

  return (
    <div className="bg-primary flex flex-col min-h-screen p-4">
      <div className="block md:grid md:grid-cols-2">
        <div className='w-full'>
          <div className='sticky top-0'>
            <h1 className="text-white font-bold text-5xl text-center pt-8">👋 HelloChain</h1>
            <p className="text-white-opacity-70 text-lg w-full md:w-96 text-center mx-auto mt-6">Mi nombre es Samar Jaffal, soy <span className="text-secondary font-bold ">desarrolladora web</span> y te invito a que me dejes un saludo a través de la blockchain.</p>
            <div className="mx-auto text-center w-full md:w-80 mt-4"><small className="text-white opacity-70 text-center"><span className="mr-1">💬 </span>Puedes usar tu billetera de Metamask para conectarte y dejar tu comentario.</small></div>

            {
              !currentAccount 
              ? <Loginbutton setAccount={setCurrentAccount} />
              : <Newcomment/>
            }   
          </div>
        </div>
        <ListOfHellos hellos={allHellos}/>
      </div>
    </div>
  );
}

export default App;
