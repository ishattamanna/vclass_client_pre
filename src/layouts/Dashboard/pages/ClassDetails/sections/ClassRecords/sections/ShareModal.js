import React, { useRef } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import CopyIcon from "../../../../../../../tools/icons/CopyIcon";
import { toast } from "react-toastify";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const ShareModal = ({ sharingRecod }) => {
  const { author, classId, date, mediaTitle, mediaType, mediaUrl, _id } =
    sharingRecod;
  const copyRef = useRef();

  const copyMediaUrl = () => {
    if (copyRef.current) {
      const range = document.createRange();
      range.selectNode(copyRef.current);

      // Create a selection object and add the range to it
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      // Copy the selected text
      document.execCommand("copy");

      // Clear the selection to avoid any unwanted highlighting
      selection.removeAllRanges();
      toast.success("Media Link copied");
    }
  };

  return (
    <div>
      <input type="checkbox" id="shareModal" className="modal-toggle" />
      <div className="modal modal-bottom lg:modal-middle overflow-y-hidden">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Share the record</h3>
          <h3 className="text-lg font-bold">Title : {mediaTitle} </h3>
          <div className="py-4 text-start">
            <div className="flex flex-col w-full border-opacity-50">
              <p className="mb-2 font-semibold">Share the link via</p>
              <div className="grid h-20 card bg-base-300 rounded-box p-2">
                <div className="flex justify-evenly items-center mt-2">
                  <FacebookShareButton
                    url={mediaUrl}
                    className="btn btn-circle"
                  >
                    <FaFacebookSquare className="w-10 h-10 text-[steelblue] cursor-pointer" />
                  </FacebookShareButton>
                  <FacebookMessengerShareButton
                    url={mediaUrl}
                    className="btn btn-circle"
                  >
                    <FaFacebookMessenger className="w-10 h-10 text-[skyblue] cursor-pointer" />
                  </FacebookMessengerShareButton>
                  <TelegramShareButton
                    url={mediaUrl}
                    className="btn btn-circle"
                  >
                    <FaTelegram className="w-10 h-10 text-blue-500 cursor-pointer" />
                  </TelegramShareButton>
                  <WhatsappShareButton
                    url={mediaUrl}
                    className="btn btn-circle"
                  >
                    <FaWhatsappSquare className="w-10 h-10 text-[green] cursor-pointer" />
                  </WhatsappShareButton>
                  <EmailShareButton url={mediaUrl} className="btn btn-circle">
                    <FaEnvelope className="w-10 h-10 cursor-pointer text-red-500" />
                  </EmailShareButton>
                </div>
              </div>
              <div className="divider">OR</div>
              <p className="mb-2 font-semibold">Copy the record link</p>
              <div className="grid h-20 card bg-base-300 rounded-box p-2">
                <div className="flex justify-between overflow-y-scroll lg:overflow-y-hidden">
                  <p ref={copyRef} className="break-all w-[80%]">
                    {mediaUrl}
                  </p>
                  <button
                    onClick={copyMediaUrl}
                    className="btn btn-ghost btn-circle"
                  >
                    <CopyIcon className={"w-6 h-6 cursor-pointer"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="shareModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default ShareModal;
