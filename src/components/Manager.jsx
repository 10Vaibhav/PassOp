import { useRef } from "react";

const Manager = () => {

  const ref = useRef();

  const showPassword = () => {
    // alert("show the password");
    if(ref.current.src.includes("icons/hidden.png")){
      ref.current.src = "icons/eye.png"
    }else{
      ref.current.src = "icons/hidden.png"
    }
  }

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mycontainer">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">Op/ &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            className="rounded-full border border-green-500 w-full px-4 py-1"
            placeholder="Enter Website URL"
            type="text"
            name=""
            id=""
          />
          <div className="flex w-full justify-between gap-8">
            <input
              className="rounded-full border border-green-500 w-full px-4 py-1"
              placeholder="Enter Username"
              type="text"
              name=""
              id=""
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-500 w-full px-4 py-1"
                placeholder="Enter Password"
                type="text"
                name=""
                id=""
              />
              <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                <img ref={ref} className="p-1" width={26} src="/icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>
          <button className="flex gap-2 cursor-pointer justify-center items-center bg-green-400 hover:bg-green-300 hover:scale-99 rounded-full px-8 py-2 w-fit border border-green-900">
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Manager;
