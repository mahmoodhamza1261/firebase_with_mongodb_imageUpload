import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { useState } from 'react';

function App() {
  var [url,setUrl]=useState()



  const [name,setName]=useState();
const [img,setImg]=useState();
 
  function someT(e){
    console.log(url)
    setName(e);
    setImg(url);
  
  fetch("http://localhost:8182/products", {
      method: "post",
      headers: {
        'Content-Type': "application/json",
        
      },
      body: JSON.stringify({ name,img})
    }).then((resp) => {
      resp.json().then((result) => {
        
        alert("Product added successfully")

      })
    })
  }




  
  let percentVal;
  const firebaseConfig = {
    apiKey: "AIzaSyBNnRaNm8LSWJcwseANwYWxXd7UNSXaoFo",
    authDomain: "fir-d7c90.firebaseapp.com",
    projectId: "fir-d7c90",
    storageBucket: "fir-d7c90.appspot.com",
    messagingSenderId: "579090468562",
    appId: "1:579090468562:web:63c369327a7dffd087a70b",
    measurementId: "G-7LBK1668RT"
  };
  const app = initializeApp(firebaseConfig);
  let fileItem;
  let fileName;

  function getFile(e){
    console.log(e.target.files[0])
     fileItem=e.target.files[0];
    fileName=fileItem.name;
  
  
    
  
  
  }
  function uploadImage(){
    console.log(app)
    const storage=getStorage(app,firebaseConfig.storageBucket);
    const storageRef=ref(
      storage,
     "images/"+fileName
    )
    const uploadTask= uploadBytesResumable(storageRef,fileItem);
    uploadTask.on("state_changed",(snapshot)=>{
      console.log(snapshot)
       percentVal=Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100)
      console.log(percentVal)
    },(error)=>{console.log(error)},()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        console.log("url",url)
        if(url!==''){
          setUrl(url)
        }
      })
    })
  
  }




  
  return (
    <div className="App">
     <input type="file" onChange={(e)=>getFile(e)}/>
     <button onClick={()=>uploadImage()}>upload</button>
     <div>{percentVal?percentVal+'%':''}</div>
     <img src={url} height={100} width={100}/>
     <br/>
     <br/>
     <input type='text' onChange={(event)=>someT(event.target.value)} />
     <img src={img} height={100} width={100}/>
    </div>
  );
}

export default App;
