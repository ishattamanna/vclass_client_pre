import React, { useContext, useEffect, useState } from "react";
import TextField from "../../../../tools/inputs/TextField";
import Button from "../../../../tools/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import authBanner from "../../../../assets/auth/authBanner.png";
import googleIcon from "../../../../assets/auth/googleIcon.png";
import facebookIcon from "../../../../assets/auth/facebookIcon.png";
import IconOutlineButton from "../../../../tools/buttons/IconOutlineButton";
import IconButton from "../../../../tools/buttons/IconButton";
import { AuthContext } from "../../../../contexts/AuthProvider";
import useSendUserToDb from "../../../../hooks/useSendUserToDb";

const SignIn = () => {
  const { signInWithGoogle, logIn, forgetPassword } = useContext(AuthContext);
  const [recordingUserInfo, setRecordingUserInfo] = useState(null);
  const { dbConfirmation } = useSendUserToDb(recordingUserInfo);
  const [passResetingEmail, setPassResetingEmail] = useState("");
  const [displayError, setDisplayError] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    if (dbConfirmation) {
      console.log(dbConfirmation);
      if (dbConfirmation?.acknowledged) {
        navigator("/dashboard");
      } else if (dbConfirmation?.message) {
        navigator("/dashboard");
      }
    }
  }, [dbConfirmation, navigator]);

  const handleGoogleSignIn = () => {
    setDisplayError("");
    signInWithGoogle()
      .then((data) => {
        const user = data.user;
        console.log(user);
        setRecordingUserInfo({
          email: user?.email,
          userName: user?.displayName,
          profilePic: user?.photoURL,
        });
      })
      .catch((err) => {
        console.error(err);
        setDisplayError(err?.message.split("Firebase: Error ")[1]);
      });
  };

  const resetPassword = () => {
    setDisplayError("");
    if (passResetingEmail) {
      forgetPassword(passResetingEmail)
        .then(() => {})
        .catch((err) => {
          console.log(err);
          setDisplayError(err.message);
        });
    } else {
      setDisplayError("Please provide your email to reset the password");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisplayError("");
    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;

    const loginInfo = {
      email,
      password,
    };

    logIn(email, password)
      .then((data) => {
        const user = data.user;
        console.log(user);
        navigator("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setDisplayError(err?.message.split("Firebase: Error ")[1]);
      });
  };

  return (
    <div className="hero min-h-screen w-full">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="text-center lg:text-left lg:w-[50%]">
          <img className="w-full" src={authBanner} alt="" />
        </div>
        <div className="card shadow-2xl bg-base-100 lg:w-[50%]">
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <div className="px-5 lg:pt-16">
              <div>
                <IconButton
                  onClick={handleGoogleSignIn}
                  className={"my-5 w-[250px]"}
                >
                  <img className="w-6 h-6" src={googleIcon} alt="" />
                  Sign In with Google
                </IconButton>
                { /* <IconOutlineButton className={"my-5 w-[250px]"}>
                  <img className="w-6 h-6" src={facebookIcon} alt="" />
                  Sign In with Facebook
                </IconOutlineButton> */ }
              </div>
              {displayError && (
                <p className="text-start font-bold text-red-600">
                  {displayError}
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body w-full">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Email</span>
                  </label>
                  <TextField
                    onBlur={(event) => setPassResetingEmail(event.target.value)}
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
                  <button
                    onClick={resetPassword}
                    type="button"
                    className="btn btn-link normal-case text-start"
                  >
                    Forgot Password ?
                  </button>
                </div>
                <div className="form-control mt-6">
                  <Button type={"submit"}>Sign In</Button>
                </div>
              </div>
            </form>
          </div>
          <Link to={"/signup"} className="btn btn-link normal-case">
            Doesn't have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
