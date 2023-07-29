import React, { useEffect, useState } from "react";
import class_image_1 from "../../../../assets/classes/class_image_1.avif";
import class_image_2 from "../../../../assets/classes/class_image_2.avif";
import class_image_3 from "../../../../assets/classes/class_image_3.jpg";
import class_image_4 from "../../../../assets/classes/class_image_4.jpg";
import class_image_5 from "../../../../assets/classes/class_image_5.png";
import class_image_6 from "../../../../assets/classes/class_image_6.webp";
import class_image_7 from "../../../../assets/classes/class_image_7.jpg";
import class_image_8 from "../../../../assets/classes/class_image_8.jpg";
import class_image_9 from "../../../../assets/classes/class_image_9.jpg";
import class_image_10 from "../../../../assets/classes/class_image_10.jpg";
import useGetClasses from "../../../../hooks/useGetClasses";
import TextField from "../../../../tools/inputs/TextField";
import ClassesCard from "./sections/ClassesCard";

const MyClasses = () => {
  const { classes } = useGetClasses();

  const [requiredClasses, setRequiredClasses] = useState([]);

  useEffect(() => {
    if (classes) {
      setRequiredClasses(classes);
    }
  }, [classes]);

  const handleRequiredClasses = (event) => {
    if (event.target.value) {
      setRequiredClasses(
        classes?.filter(
          (cls) =>
            cls.className
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
            cls.subject.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    } else {
      setRequiredClasses(classes);
    }
  };

  const classImages = [
    class_image_1,
    class_image_2,
    class_image_3,
    class_image_4,
    class_image_5,
    class_image_6,
    class_image_7,
    class_image_8,
    class_image_9,
    class_image_10,
  ];

  return (
    <div className="lg:px-10 px-2 py-2">
      <TextField
        onChange={handleRequiredClasses}
        placeholder={"Search class by name or subject"}
        className={"w-full"}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 mt-2">
        {requiredClasses?.map((cls, i) => (
          <ClassesCard
            classImages={classImages}
            imgNumber={i}
            key={cls?._id}
            cls={cls}
          />
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
