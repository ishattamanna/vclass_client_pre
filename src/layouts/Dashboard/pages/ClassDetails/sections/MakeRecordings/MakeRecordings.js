import React, { useState } from "react";
import RecordingModes from "./RecordingModes";
import ScreenRecordingModal from "./ScreenRecordingModal";
import AudioRecordingModal from "./AudioRecordingModal";
import VideoRecordingModal from "./VideoRecordingModal";

const MakeRecordings = () => {
  const [selectedMode, setSelectedMode] = useState("");

  return (
    <div className="mt-10 my-10 lg:px-10 px-5">
      <RecordingModes setSelectedMode={setSelectedMode} />
      <ScreenRecordingModal selectedMode={selectedMode} />
    </div>
  );
};

export default MakeRecordings;
