export const Hello = ({address, message, time}) => {
    return (
        <li className="my-3 w-full md:w-9/12">
        <div className="bg-white rounded-md p-4 ">
            <p>{message}</p>
            <hr className="my-2" />
            <a className="underline text-gray-500 font-semibold" href="#">{address}</a>
            <div className="mt-2">
              <time>{time.toString()}</time>
            </div>
          </div>
      </li>
    );
}
