import React,{useState,useEffect} from 'react';
import "./oaoutput.css";
import Card from "react-bootstrap/Card";
import SpinerGenerate from '../Spiner/SpinerGenerate';

const OaOutput = ({output}) => {

    const [showspin,setShowSpin] = useState(true);

    useEffect(() => {    
        setTimeout(() => {
          setShowSpin(false);
        },13200)
    },[])

    return (
        <>
            <br/>
            {
                (showspin) ? <SpinerGenerate/> : 
                <Card className='shadow oaoutputCard'>
                    {output}
                </Card>
            }
            
        </>
    )
}

export default OaOutput