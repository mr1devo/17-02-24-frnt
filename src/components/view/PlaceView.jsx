import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {Buffer} from 'buffer';
import { useEffect, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Placeedit from './Placeedit';
import './PlaceView.css'; 
import Layout from '../adminpanel/Layout';



const PlaceView = () => {
    var [place,setPlace] = useState([]);
    var[selected,setSelected] = useState();
    //const [data, setData] = useState({});
    var [update,setUpdate] =useState(false)


    useEffect(()=>{
    axios.get("http://localhost:4005/photoview")
    .then(response =>{
    console.log(response.data)
    setPlace(response.data) })
    .catch(err=>console.log(err))
    },[])

    //delete
    const deletevalues =(id)=>{
        console.log("deleted",id)
        axios.put("http://localhost:4005/remove/"+id)
        .then((response)=>{
            alert("Deleted")
            //to reload window
            window.location.reload(false);
        })
    }

      
    //update
    const updateValue = (value) =>{
        console.log("updated:",value)
        setSelected(value);       
        setUpdate(true);
        }

var result=
<Layout>
    <div className='FloatingTableContainer'>
    <Typography variant='h3' align='center' className="PlaceDetailsTitle">Place
    Details</Typography><br></br>
    <TableContainer component={Paper} align='center'>
    <Table style={{ width: '100%' }} aria-label="simple table"
    className='Table' align='center'>
    <TableHead>
    <TableRow>
    <TableCell >Place Name</TableCell>
    <TableCell className="TableHeadCell">Things to see</TableCell>
    <TableCell >Location</TableCell>
    <TableCell className="TableHeadCell">Photo</TableCell>
    <TableCell className="TableHeadCell">Edit</TableCell>
    <TableCell >Delete</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {place.map((value,index)=>{
    return(
    <TableRow key={index}>
    <TableCell className="TableHeadCell">{value.placename}</TableCell>
    <TableCell >{value.tsee}</TableCell>
    <TableCell className="TableHeadCell">{value.location}</TableCell>
    <TableCell> <img src={`data:image/jpeg;base64,${Buffer.from(value.placephoto.data)}`} width="50" height="50" alt='Error' />   </TableCell> 
    <TableCell ><ModeEditIcon color='success' onClick={()=>updateValue(value)}/></TableCell>
    <TableCell className="TableHeadCell"><DeleteForeverIcon color='error' onClick={()=>deletevalues(value._id)}/></TableCell>
    </TableRow>
    )
    })}
    </TableBody>
    </Table>
    </TableContainer>
    
    </div>

    </Layout>
if(update){
    result=<Placeedit data={selected} method='put'/>}
  return (result)
   
}

 

export default PlaceView