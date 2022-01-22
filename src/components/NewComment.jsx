export const Newcomment = () => {
    return (
        <>
          <div className="flex flex-col items-center mt-6">
            <textarea className="w-full md:w-9/12 rounded-lg resize-none p-4" rows={3}></textarea>
            <button className="w-full md:w-9/12 bg-third text-white p-6 rounded-md mt-8 hover:bg-secondary transition ease-in-out delay-150 duration-300 font-bold"><span className="mr-1">👋 </span>Saludar</button>
          </div>
        </>
    );
}
