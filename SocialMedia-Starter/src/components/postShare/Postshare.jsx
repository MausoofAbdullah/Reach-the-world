import React from "react";
import ProfileImg from "../../img/profileImg.jpg";
import "./Postshare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";

const Postshare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch=useDispatch()

  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost={
      userId:user._id,
      desc:desc.current.value
    }

    if(image){
      const data=new FormData()
      const filename=Date.now()+image.name
      data.append("name",filename)
      data.append("file",image)
      newPost.image=filename
      console.log(newPost)
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(uploadPost(newPost))
  };
  return (
    <div className="Postshare">
      <img src={ProfileImg} alt="" />
      <div>
        <input ref={desc} required type="text" placeholder="whats happening?" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => {
              imageRef.current.click();
            }}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button className="button ps-button" onClick={handleSubmit}>
            share
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="priewImage">
            <UilTimes
              onClick={() => {
                setImage(null);
              }}
            />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Postshare;
