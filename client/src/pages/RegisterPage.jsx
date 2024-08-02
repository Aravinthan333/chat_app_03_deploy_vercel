import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import uploadFile from "../helpers/uploadFile.js";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploaadPhoto = await uploadFile(file);

    console.log("upload photo => ", uploaadPhoto);

    setUploadPhoto(file);

    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploaadPhoto?.url,
      };
    });
  };

  const handleClearUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // eslint-disable-next-line no-undef
    const URL = `${process.env.BACKEND_URL}/api/register`;

    try {
      const response = await axios.post(URL, data);

      console.log("response", response);

      console.log(response.data);

      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });

        navigate("/email");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }

    // console.log("data ::: => ", data);
  };

  // console.log("file : ", uploadPhoto);
  // console.log(
  //   process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  //   process.env.REACT_APP_BACKEND_URL
  // );

  // console.log(import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME);

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <p className="text-center text-2xl font-semibold">
          Welcome To Chat App
        </p>

        <br />
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              className="bg-slate-100 px-2 py-1 rounded focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
              className="bg-slate-100 px-2 py-1 rounded focus:outline-primary"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter your password"
              className="bg-slate-100 px-2 py-1 rounded focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Profile Picture
              <div className="h-14 pl-2 pr-2 bg-slate-100 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p>
                  {uploadPhoto?.name
                    ? `${uploadPhoto.name} / ${(
                        uploadPhoto.size / 1024
                      ).toFixed(2)}MB`
                    : "Upload Your Profile Picture"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    className="text-xl ml-2 mr-2 border-2 rounded-2xl border-primary bg-primary text-white hover:text-2xl"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden "
              onChange={handleUploadPhoto}
            />
          </div>

          <button className="bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Register
          </button>
        </form>
        <p className="my-3 text-center">
          Already have account ?{" "}
          <Link to={"/"} className="hover:text-primary font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
