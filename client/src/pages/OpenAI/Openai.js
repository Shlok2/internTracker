import React,{useState} from 'react';
import "./openai.css";
import { Button } from 'react-bootstrap';
import { openaifunc } from '../../services/Apis';
import OaOutput from '../../components/oaOutput/OaOutput';
// import Spiner from '../../components/Spiner/Spiner';

const Openai = () => {

    const [oainput,setOainput] = useState("");
    const [oaoutput,setOaoutput] = useState("");
    const [temp,setTemp] = useState(true);
    const [submitPressed,setSubmitPresses] = useState(true);

    const handleChange = async(e) => {

        setSubmitPresses(false);
        setOaoutput("");
        e.preventDefault();
        const response = await openaifunc(oainput);


        if(response.status === 200){ 
            setOaoutput(response.data.bot);
            if(response.data.bot !== ""){
                setTemp(false);
            }
        }
        else{
          console.log("error");
        }
    }

  return (
    <>
        <div>
            <h1 className='oaHeading'>Ask Questions...</h1>
        </div>  
        <div className='oabox'>
            <form className='oaform'>
                <textarea name = "prompt" rows = "1" cols="1" placeholder="Eg. What are the leetcode questions asked in ola technical round." className='oatxtArea' onChange={(e)=>{setOainput(e.target.value)}}></textarea>
                <Button className='oabutton' onClick={handleChange}>Export</Button>
            </form>

            {
                (temp && submitPressed) ? "" :
                <OaOutput output={oaoutput}/>   
            }
        </div>
    </>
  )
}

export default Openai;