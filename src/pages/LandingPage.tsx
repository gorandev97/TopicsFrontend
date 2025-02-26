import { useState } from "react";
import LoginModal from "../components/auth/Login";
import RegisterModal from "../components/auth/Register";
import BackgroundImage from "../assets/logo/convo_cloud_transparent.png";
import BackgroundPicture from "../assets/icons/bg.jpg";
import { Button } from "../components/Button";

export const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <div className="h-screen flex items-center justify-between px-12 bg-cover bg-center bg-no-repeat  flex flex-row px-10">
      <div className="flex justify-start items-center w-1/3">
        <img
          src={BackgroundImage}
          alt="ConvoCloud Logo"
          className="w-full h-auto"
        />
      </div>
      <div className="flex flex-col  justify-center w-2/3 text-white text-left w-[600px] mr-20">
        <h1 className="text-5xl font-extrabold leading-tight mb-4 text-blue-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Welcome to ConvoCloud
        </h1>
        <p className="text-xl mb-6  text-gray-500 drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.8)]">
          A platform for meaningful conversations and insightful discussions.
        </p>
        <p className="text-lg mb-8 text-gray-500 drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.8)]">
          ConvoCloud is where ideas flow and communities thrive. Whether you're
          sharing your thoughts, exploring new topics, or joining vibrant
          conversations, our platform is designed to bring people together. Join
          now and become part of the conversation!
        </p>
        <div className="flex justify-end gap-8">
          <Button onClick={openLogin} title="Login" />
          <Button onClick={openRegister} title="Register" />
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} />
    </div>
  );
};
