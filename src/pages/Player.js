import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import YouTube from "react-youtube";
import "../css/player.css"
import { getAllVideos } from "../services/videos.service";
import getVideoId from "get-video-id";
import VideoCard from "../components/VideoCard";
import { useNavigate } from "react-router-dom";
import {ThumbUpOutlined, ThumbDownOutlined} from '@mui/icons-material';
import { useLocation } from "react-router-dom";
import { countView } from "../services/videos.service";

const Player = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const params = useParams()
	const [allVideos, setAllVideos] = useState([]); 
	const [liked, setLiked] = useState(false); 
	const [disliked, setDisliked] = useState(false); 

	const [totalTime, setTotalTime] = useState(0);
	const [playing, setPlaying] = useState(false);
	

	useEffect(() => {
    (async() => {
      const res = await getAllVideos();
      setAllVideos(res.data.page.data);
    })()
  }, [])

	useEffect(() => {
		const timer  = setTimeout(() => {
			playing && setTotalTime(totalTime + 1);
		}, 1000)
		if(totalTime > 10){
			clearTimeout(timer);
			(async () => {
				console.log("view count")
				await countView(params.id);
			})()
		} 
	}, [totalTime, playing])

	useEffect(() => {
		setTotalTime(0)
	}, [location])

	const like = () => {
		setLiked(!liked)
		if(!liked)setDisliked(false);
	}

	const dislike = () => {
		setDisliked(!disliked)
		if(dislike)setLiked(false)
	}

	const handleStateChange = () => {
		console.log("state change");
		
	}

	const handleEnd = () => {
	}


	const handlePLay = () => {
		console.log("play")
		setPlaying(true)
	}
	const handlePause = () => {
		console.log("pause")
		setPlaying(false)
	}
	
	return (
		<div className="player-conatiner">
			<div
				className="player"
			>
				{totalTime}
				<YouTube
					videoId={params.id}
					opts={{
						playerVars: {
							autoplay: 1,
						},
					}}
					onPlay={handlePLay}
					onPause={handlePause}
					onEnd={handleEnd}
					onStateChange={handleStateChange}
				/>
				<div
					className="info-bar"
				>
					<div className="react-container">
						<span onClick={() => like()} className={`react ${liked && 'active'}`} >
							23&nbsp; like &nbsp;
							<ThumbUpOutlined />
						</span>
						<span onClick={() => dislike()} className={`react ${disliked && 'active'}`} >
							23 &nbsp;
							<ThumbDownOutlined />
							&nbsp;dislike
						</span>
					</div>
					<span className="views">
						views&nbsp;<h4>2364287364823642834</h4>
					</span>

				</div>
			</div>
			<div className="suggestion">
				{allVideos.map((videoData, indx) => {
					const id = getVideoId(videoData.videoUrl).id;
					return (
						<div
						key={indx}
						onClick={() => navigate(`/${id}`)}
						className="video-card-container"
						>
							<VideoCard
								className="video-card"
								title={id}
							/>    
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Player;