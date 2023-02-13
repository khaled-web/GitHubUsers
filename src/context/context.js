import React, { useState, useEffect, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
//mainURL
const rootUrl = 'https://api.github.com';
//Context
const GithubContext = React.createContext();
//provider,consumer - GithubContext.Provider
const GithubProvider = ({children})=>{
 //useState
 const [githubUser, setGithubUser]=useState(mockUser)
 const [repos, setRepos]=useState(mockRepos)
 const [followers, setFollowers]=useState(mockFollowers)
 //request loading
 const [requests, setRequests]=useState(0)
 const [isLoading, setIsLoading]=useState(false)
 //error
 const [error, setError]=useState({show:false, msg:""})
 //searchGithub
 const searchGithubUser = async(user)=>{
    toggleError()
    setIsLoading(true)
    //setLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch(err=>console.log(err))
    if(response){
      setGithubUser(response.data)
      const{login, followers_url}=response.data;
      //repos
      await axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(response=>setRepos(response.data))
      
      //followers
      await axios(`${followers_url}?per_page=100`).then(response=>setFollowers(response.data))
      // await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_page=100`)]).then((result)=>{
      //   console.log(result)
      // })
    }
    else{
      toggleError(true, 'there is no user with that username')
    }
    checkRequests()
    setIsLoading(false)
 }
 //check rate
 const checkRequests = ()=>{
  axios(`${rootUrl}/rate_limit`).then(({data})=>{
    let {rate:{remaining}}=data
    setRequests(remaining)
    if(remaining===0){
      //throw an error
      toggleError(true, 'sorry, you have exceed your hourly rate limit!')
    }
  }).catch((err)=>console.log(err))
 }
 //error
 function toggleError(show = false, msg =''){
  setError({show, msg})
 }

 //useEffect
 useEffect(checkRequests,[])
 return <GithubContext.Provider value={{githubUser, followers, repos, requests, error,searchGithubUser,isLoading}}>
  {children}
  </GithubContext.Provider>
}
//export GlobalContext
export const useGlobalContext = ()=>{
  return useContext(GithubContext)
}
//exportData(GithubProvider, GithubContext)
export{GithubProvider, GithubContext}
