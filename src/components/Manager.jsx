import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");

    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast.dismiss();
    toast.success('Copied to clipboard!',{ duration: 500 });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    console.log(form);
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Toaster />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absoluteLeft-0 right-0Top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
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
            value={form.site}
            onChange={handleChange}
            name="site"
            id=""
          />
          <div className="flex w-full justify-between gap-8">
            <input
              className="rounded-full border border-green-500 w-full px-4 py-1"
              placeholder="Enter Username"
              type="text"
              value={form.username}
              onChange={handleChange}
              name="username"
              id=""
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-500 w-full px-4 py-1"
                placeholder="Enter Password"
                type="password"
                value={form.password}
                onChange={handleChange}
                ref={passwordRef}
                name="password"
                id=""
              />
              <span
                className="absolute right-[3px]Top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="/icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex gap-2 cursor-pointer justify-center items-center bg-green-400 hover:bg-green-300 hover:scale-99 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords: </h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          {item.username}
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          {item.password}{" "}
                          <div
                            className="lordiconcopy cursor-pointer size-7"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
