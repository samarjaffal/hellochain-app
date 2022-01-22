import dayjs from 'dayjs';
import 'dayjs/locale/es-us';
dayjs.locale('es-us')
export const Hello = ({address, message, time}) => {
    return (
        <li className="my-3 w-full">
        <div className="bg-white rounded-md p-4 ">
            <p>{message}</p>
            <hr className="my-2" />
            <a className="underline text-gray-500 font-semibold" target="_blank" href={`https://rinkeby.etherscan.io/address/${address}`} rel="noreferrer">{address}</a>
            <div className="mt-2">
              <time className="capitalize">{dayjs(time.toString()).format('MMM D, YYYY h:mm A')}</time>
            </div>
          </div>
      </li>
    );
}
