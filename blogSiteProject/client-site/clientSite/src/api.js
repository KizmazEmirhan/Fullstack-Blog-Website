import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const getPosts = () => API.get('/blogposts')
export const getPostById = (id) => API.get(`/blogposts/${id}`)
export const getCategories = () => API.get('/categories')
