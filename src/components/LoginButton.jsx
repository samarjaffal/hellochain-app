export const Loginbutton = ({setAccount}) => {

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

    return (
        <>
          <div className="text-center w-full">
              <button className="bg-secondary text-white p-6 rounded-md mt-8 hover:bg-third transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 font-bold" onClick={connectWallet}>Conectarte con Metamask</button>
          </div>
        </>
    );
}
