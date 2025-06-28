import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast.dismiss();
    toast.success("Copied to clipboard!", { duration: 1000 });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      ref.current.src = "/icons/hidden.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/icons/eye.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 && 
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      try {
        const newPassword = { ...form, id: form.id || uuidv4() };
        
        if (form.id) {
          // Update existing password
          await fetch("http://localhost:3000/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPassword),
          });
          
          // Update local state
          setPasswordArray(passwordArray.map(item => 
            item.id === form.id ? newPassword : item
          ));
        } else {
          // Add new password
          await fetch("http://localhost:3000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPassword),
          });
          
          // Update local state
          setPasswordArray([...passwordArray, newPassword]);
        }
        
        setform({ site: "", username: "", password: "" });
        toast.dismiss();
        toast.success("Password Saved!", { duration: 1000 });
      } catch (error) {
        console.error("Error saving password:", error);
        toast.error("Error saving password!", { duration: 1000 });
      }
    } else {
      toast.error("Please Enter the required fields to save password!", {
        duration: 1000,
      });
    }
  };

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password!");

    if (c) {
      try {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        
        // Update local state
        setPasswordArray(passwordArray.filter((item) => item.id !== id));
        
        // Clear form if it was the edited item
        if (form.id === id) {
          setform({ site: "", username: "", password: "" });
        }

        toast.dismiss();
        toast.success("Password Deleted Successfully!", { duration: 1000 });
      } catch (error) {
        console.error("Error deleting password:", error);
        toast.error("Error deleting password!", { duration: 1000 });
      }
    }
  };

  const editPassword = async (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    if (passwordToEdit) {
      setform({ ...passwordToEdit });
    }
  };

  const cancelEdit = () => {
    setform({ site: "", username: "", password: "" });
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

      <div className="p-2 pt-3 md:mycontainer">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">Op/ &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <h3 className="text-xl font-semibold text-green-700">
            {form.id ? "Edit Password" : "Add New Password"}
          </h3>
          <input
            className="rounded-full border border-green-500 w-full px-4 py-1"
            placeholder="Enter Website URL"
            type="text"
            value={form.site}
            onChange={handleChange}
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              className="rounded-full border border-green-500 w-full px-4 py-1"
              placeholder="Enter Username"
              type="text"
              value={form.username}
              onChange={handleChange}
              name="username"
              id="username"
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
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
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
          <div className="flex gap-4">
            <button
              onClick={savePassword}
              className="flex gap-2 cursor-pointer justify-center items-center bg-green-400 hover:bg-green-300 hover:scale-99 rounded-full px-8 py-2 w-fit border border-green-900"
            >
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover"
              ></lord-icon>
              {form.id ? "Update Password" : "Save Password"}
            </button>
            {form.id && (
              <button
                onClick={cancelEdit}
                className="flex gap-2 cursor-pointer justify-center items-center bg-red-400 hover:bg-red-300 hover:scale-99 rounded-full px-8 py-2 w-fit border border-red-900"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords: </h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
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
                      <td className="py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </span>
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
