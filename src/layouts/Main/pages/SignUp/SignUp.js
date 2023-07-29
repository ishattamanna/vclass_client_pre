import React, { useContext, useEffect, useRef, useState } from "react";
import authBanner from "../../../../assets/auth/authBanner.png";
import profileImage from "../../../../assets/auth/blank-profile-picture-973460_1280.webp";
import TextField from "../../../../tools/inputs/TextField";
import Button from "../../../../tools/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthProvider";
import useUploadImage from "../../../../hooks/useUploadImage";
import useSendUserToDb from "../../../../hooks/useSendUserToDb";

const SignUp = () => {
  const { createAccount, updateUserProfile } = useContext(AuthContext);
  const [imgFile, setImgFile] = useState(null);
  const { imgUrl } = useUploadImage(imgFile);
  const imgInputRef = useRef();
  const [recordingUserInfo, setRecordingUserInfo] = useState(null);

  useEffect(() => {
    if (imgUrl) {
      console.log(imgUrl);
    }
  }, [imgUrl]);

  const { dbConfirmation } = useSendUserToDb(recordingUserInfo);
  const navigator = useNavigate();

  useEffect(() => {
    if (dbConfirmation) {
      console.log(dbConfirmation);
      if (dbConfirmation?.acknowledged) {
        navigator("/dashboard");
      }
    }
  }, [dbConfirmation, navigator]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const userName = form.userName.value;
    const email = form.email.value;
    const password = form.password.value;
    const cPassword = form.cPassword.value;

    const userInfo = {
      userName,
      email,
      password,
      cPassword,
    };

    createAccount(email, password)
      .then((data) => {
        const user = data.user;
        console.log(user);
        handleUpdateProfile(userInfo);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpload = (event) => {
    setImgFile(event.target.files[0]);
  };

  const handleUpdateProfile = (userInfo) => {
    if (userInfo?.userName) {
      updateUserProfile(userInfo?.userName, imgUrl)
        .then(() => {
          setRecordingUserInfo({
            email: userInfo?.email,
            userName: userInfo?.userName,
            profilePic:
              imgUrl ||
              "https://i.ibb.co/fd7LvhF/blank-profile-picture-973460-1280.webp",
          });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="hero min-h-screen w-full">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="text-center lg:text-left lg:w-[50%]">
          <img className="w-full" src={authBanner} alt="" />
        </div>
        <div className="card shadow-2xl bg-base-100 lg:w-[50%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row items-center"
            action=""
          >
            <input
              onChange={handleUpload}
              ref={imgInputRef}
              className="hidden"
              type="file"
            />

            <div
              onClick={() => imgInputRef.current.click()}
              className="avatar ml-5 cursor-pointer"
            >
              <div className="lg:w-52 w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={imgUrl || profileImage} alt="" />
              </div>
            </div>

            <div className="card-body w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>
                <TextField
                  required={true}
                  type={"text"}
                  name={"userName"}
                  placeholder={"Your Name"}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <TextField
                  required={true}
                  type={"email"}
                  name={"email"}
                  placeholder={"Email"}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <TextField
                  type={"password"}
                  name={"password"}
                  required={true}
                  placeholder={"Password"}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Confirm Password</span>
                </label>
                <TextField
                  name={"cPassword"}
                  type={"password"}
                  required={true}
                  placeholder={"Confirm Password"}
                />
              </div>
              <div className="form-control mt-6">
                <Button type={"submit"}>Create Account</Button>
              </div>
            </div>
          </form>
          <Link to={"/signin"} className="btn btn-link normal-case">
            Already have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
