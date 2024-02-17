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
import Hoteledit from './Hoteledit';
import Layout from '../adminpanel/Layout';

const HotelView = () => {
    var [hotel,setHotel] = useState([]);
    var[selected,setSelected] = useState();
    var [update,setUpdate] =useState(false)


    useEffect(()=>{
    axios.get("http://localhost:4005/hview")
    .then(response =>{
    console.log(response.data)
    setHotel(response.data) })
    .catch(err=>console.log(err))
    },[])

    //delete
    const deleteValues=(id)=>{
        console.log("deleted",id)
        axios.put("http://localhost:4005/hremove/"+id)
        .then((response)=>{
            alert("Deleted")
            //to reload window
            window.location.reload(false);
        })
    }

      
    //update
    const updateValues = (value) =>{
        console.log("updated:",value)
        setSelected(value);
        setUpdate(true);
        }

var result=
<Layout>
    <div className='FloatingTableContainer'>
    <Typography variant='h3' align='center'>Hotel
    Details</Typography><br></br>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
    <TableRow>
    <TableCell>Hotel Name</TableCell>
    <TableCell>Things to see</TableCell>
    <TableCell>Location</TableCell>
    <TableCell>Photo</TableCell>
    <TableCell>Edit</TableCell>
    <TableCell >Delete</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {hotel.map((value,index)=>{
    return(
    <TableRow key={index}>
    <TableCell>{value.hotelname}</TableCell>
    <TableCell>{value.htsee}</TableCell>
    <TableCell>{value.hlocation}</TableCell>
    <TableCell>  <img src={`data:image/jpeg;base64,${Buffer.from(value.hotelphoto.data)}`} width="50" height="50" alt='Error' />   </TableCell>
    <TableCell><ModeEditIcon color='success' onClick={()=>updateValues(value)}/></TableCell>
    <TableCell><DeleteForeverIcon color='error' onClick={()=>deleteValues(value._id)}/></TableCell>
    </TableRow>
    )
    })}
    </TableBody>
    </Table>
    </TableContainer>
    </div>
    </Layout>

 
if(update){
    result=<Hoteledit data={selected} method='put'/>}
  return (result)
   
}

 

export default HotelView