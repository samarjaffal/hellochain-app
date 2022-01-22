import { Hello } from "./Hello";

export const ListOfHellos = ({hellos}) => {
    
  return (
    <ul className=" mt-4 px-4 w-full flex flex-col">
        {hellos.map((hello, index) => (
           <Hello key={index} message={hello.message} address={hello.address} time={hello.timestamp}/>
          ))}
      </ul>
  );
};
