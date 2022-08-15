import React, { useEffect, useState } from 'react'
import VideoCard from '../components/VideoCard'
import "../css/homepage.css"
import { getAllVideos } from '../services/videos.service'
import getVideoId from 'get-video-id'
import AddVideoModal from '../components/AddVideoModal'
import {useNavigate} from "react-router-dom"


function Homepage() {

  const navigate = useNavigate()

  const [allVideos, setAllVideos] = useState([]); 
  

  useEffect(() => {
    (async() =>{
      const res = await getAllVideos();
      setAllVideos(res.data.page.data);
    })()
  }, [])


  return (
    <div className="homepage-container">
      {allVideos?.map((videoData, indx) => {
        const id = getVideoId(videoData.videoUrl).id;
        return (
          <div
            key={indx}
            onClick={() => navigate(`/${id}`)}
          >
            <VideoCard
              className="video-card"
              title={id}
            />    
          </div>
        )
      })}
      
    </div>
  )
}

export default Homepage