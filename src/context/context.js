import React, { useState, useEffect } from 'react';
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
 return <GithubContext.Provider value={{githubUser, followers, repos}}>
  {children}
  </GithubContext.Provider>
}
//exportData(GithubProvider, GithubContext)
export{GithubProvider, GithubContext}
