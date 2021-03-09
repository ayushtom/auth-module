import React,{useContext,useEffect} from 'react';
import UserContext from '../../context/UserContext'
import PostForm from '../../components/PostForm/PostForm'
export default function Home() {

    var currentLoggedInStatus=useContext(UserContext)
    

    
    
  return (

    <div className="container">
    {currentLoggedInStatus.userData.loggedIn && (
      <PostForm userDetails={currentLoggedInStatus.userData}/>
    )}

    </div>
    
    
  );
}
