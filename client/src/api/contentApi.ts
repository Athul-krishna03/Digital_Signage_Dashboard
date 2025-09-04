import axios from "axios";
import type { ContentType } from "../types/contentType";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getContent = () => API.get("/content");
export const addContent = (data: Partial<ContentType>) => API.post("/content", data);
export const updateContent = (id: number, data: Partial<ContentType>) => API.put(`/content/${id}`, data);
export const deleteContent = (id: number) => API.delete(`/content/${id}`);
