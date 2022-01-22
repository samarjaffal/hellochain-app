import { Loginbutton } from './components/LoginButton';
import { Newcomment } from './components/NewComment';
import { ListOfHellos } from './components/ListOfHellos';
import abi from './utils/HelloChain.json'
import { useInitApp } from './hooks/useInitApp';
import { useHellos } from './hooks/useHellos';

function App() {
  const contractAddress = "0xE949ba232851c43329f999486310dAdE499B4941";
  const contractABI = abi.abi
  
  const {getAllHellos, allHellos, sendHello} = useHellos({contractAddress, contractABI})
  const {currentAccount, setCurrentAccount } = useInitApp({getHellos: getAllHellos})
  

  return (
    <div className="bg-primary flex flex-col min-h-screen p-4">
      <div className={!currentAccount ? 'block' : 'block md:grid md:grid-cols-2'}>
        <div className='w-full'>
          <div className='sticky top-0'>
            <h1 className="text-white font-bold text-4xl md:text-6xl text-center pt-8">👋 HelloChain</h1>
            <p className="text-white-opacity-70 text-lg w-full md:w-96 text-center mx-auto mt-6">Mi nombre es Samar Jaffal, soy <span className="text-secondary font-bold ">desarrolladora web</span> y te invito a que me dejes un saludo a través de la blockchain.</p>
            <div className="mx-auto text-center w-full md:w-80 mt-4 text-base"><small className="text-white opacity-70 text-center"><span className="mr-1">💬 </span>Puedes usar tu billetera de Metamask para conectarte y dejar tu comentario.</small></div>

            {
              !currentAccount 
              ? <Loginbutton setAccount={setCurrentAccount} getHellos={getAllHellos} />
              : <Newcomment sendHello={sendHello}/>
            }   
          </div>
        </div>
        <ListOfHellos hellos={allHellos}/>
      </div>
    </div>
  );
}

export default App;
