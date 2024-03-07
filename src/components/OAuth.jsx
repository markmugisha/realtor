import { FcGoogle } from "react-icons/fc"

const OAuth = () => {
  return (
    <button className="flex items-center justify-center w-full bg-red-600 text-white px-7 py-3 rounded uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transitio duration-150 ease-in-out">
        <FcGoogle className="bg-white rounded-full text-2xl mr-2"/>
      Continue with Google
    </button>
  )
};

export default OAuth
