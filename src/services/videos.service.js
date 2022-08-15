import { useAxios } from "../core/axios";
import axios from "axios";
import { videoLinks } from "../mock/data";

export const getAllVideos = async () => {
    try {
      const res = await useAxios.get("video/pagination");
			// return videoLinks; //mock links 
      return res;

    } catch (error) {
      return error
    } 
} 

export const addNewVideo = async(payload) => {
  try {
    const res = await useAxios.post('video', payload)
    return res;
  } catch (error) {
    return error
  }
}

export const countView = async (videoId) => {
  try {
    const res = await useAxios.get(`video/increment-view-count/${videoId}`)
    return res;
  } catch (error) {
    return error
  }
}
