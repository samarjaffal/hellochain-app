import { useState } from "react";

export const Newcomment = ({ sendHello }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const newHello = () => {
      setLoading(true);
      sendHello(message)
      .then((response) => {
        setLoading(false);
        setMessage('')
      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
    }

    return (
        <>
          <div className="flex flex-col items-center mt-6">
            <textarea className="w-full md:w-9/12 rounded-lg resize-none p-4" rows={3} value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button disabled={loading} className={`w-full md:w-9/12 bg-third text-white p-6 rounded-md mt-8 hover:bg-secondary transition ease-in-out delay-150 duration-300 font-bold ${loading ? 'opacity-60' : 'opacity-100'}`} onClick={newHello} ><span className="mr-1">👋 </span>{loading ? 'Un momento...' : 'Saludar'}</button>
          </div>
        </>
    );
}
