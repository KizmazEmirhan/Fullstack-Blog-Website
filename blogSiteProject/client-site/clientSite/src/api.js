import axios from 'axios'

const API = axios.create({
  baseURL: 'https://blogistanbul-api-production.up.railway.app/api',
})

export const getPosts = () => API.get('/blogposts')
export const getPostById = (id) => API.get(`/blogposts/${id}`)
export const getCategories = () => API.get('/categories')
