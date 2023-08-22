import React, { useEffect, useState } from "react";
import useGetClassRecords from "../../../../../../hooks/useGetClassRecords";
import { useParams } from "react-router-dom";
import TextField from "../../../../../../tools/inputs/TextField";
import MediaCard from "./sections/MediaCard";
import ShareModal from "./sections/ShareModal";
import Empty from "../../../../../../Empty/Empty";

const ClassRecords = () => {
  const { id } = useParams();
  const [activeMode, setActiveMode] = useState("all");
  const [requiredMedias, setRequiredMedias] = useState([]);
  const { medias, mediasRefetch } = useGetClassRecords(id);
  const [sharingRecod, setSharingRecord] = useState(null);

  useEffect(() => {
    if (medias) {
      if (activeMode !== "all") {
        setRequiredMedias(
          medias.filter((media) => media.mediaType === activeMode)
        );
      } else {
        setRequiredMedias(medias);
      }
    }
  }, [medias, activeMode]);

  const handleSearchMedia = (event) => {
    setRequiredMedias(
      medias?.filter((media) =>
        media?.mediaTitle
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase())
      )
    );
  };

  return (
    <div className="mt-10 my-10 lg:px-10 px-5">
      <TextField
        onChange={handleSearchMedia}
        className={"w-full"}
        placeholder={"Search Media By Title"}
      />
      <div className="tabs my-2">
        <button
          onClick={() => setActiveMode("all")}
          className={`tab tab-lifted ${activeMode === "all" && "tab-active"}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveMode("video")}
          className={`tab tab-lifted ${activeMode === "video" && "tab-active"}`}
        >
          Video
        </button>
        <button
          onClick={() => setActiveMode("audio")}
          className={`tab tab-lifted ${activeMode === "audio" && "tab-active"}`}
        >
          Audio
        </button>
        <button
          onClick={() => setActiveMode("screen")}
          className={`tab tab-lifted ${
            activeMode === "screen" && "tab-active"
          }`}
        >
          Screen
        </button>
      </div>
      {requiredMedias?.length === 0 ? (
        <Empty message={"No Media available"} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          {requiredMedias?.map((media, i) => (
            <MediaCard
              key={i}
              media={media}
              mediasRefetch={mediasRefetch}
              setSharingRecord={setSharingRecord}
            />
          ))}
        </div>
      )}
      {sharingRecod && <ShareModal sharingRecod={sharingRecod} />}
    </div>
  );
};

export default ClassRecords;
