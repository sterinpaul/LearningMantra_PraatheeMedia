import { useNavigate } from "react-router-dom";

const ErrorPage = ()=>{
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };
    return(
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg relative">
            <h2 className="text-lg font-bold mb-4 mt-[-28px]">404</h2>
                <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
                <div className="flex flex-col gap-6 mb-1">
                    <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-300">
                        This page does not exist.
                        <p>The URL maybe incorrect, or the page could have been removed or deleted</p>
                    </h6>
                </div>
                <div className="flex justify-end mt-16">
                    <button onClick={handleGoBack} className="select-none rounded-lg bg-gradient-to-tr from-[rgb(1,123,254)] to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Go Back To Home
                    </button> 
                </div>
                </form>
        </div>
    </div>  
    )
}

export default ErrorPage