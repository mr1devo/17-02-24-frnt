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
import Restra from './Restra';
import Restraedit from './Restraedit';
import Layout from '../adminpanel/Layout';

const RestraView = () => {
    var [restra,setRestra] = useState([]);
    var[selected,setSelected] = useState();
    var [update,setUpdate] =useState(false)
    useEffect(()=>{
    axios.get("http://localhost:4005/resview")
    .then(response =>{
    console.log(response.data)
    setRestra(response.data) })
    .catch(err=>console.log(err))
    },[])

    //delete
    const deleteValue=(id)=>{
        console.log("deleted",id)
        axios.delete("http://localhost:4005/Rremove/"+id)
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
    <Typography variant='h4' align='center' className="PlaceDetailsTitle">Restaurant
    Details</Typography><br></br>
    <TableContainer component={Paper}>
    <Table style={{ width: '100%' }} aria-label="simple table"
    className='Table' align='center'>
    <TableHead>
    <TableRow>
    <TableCell>Restaurant Name</TableCell>
    <TableCell>Things to see</TableCell>
    <TableCell>Location</TableCell>
    <TableCell>Photo</TableCell>
    <TableCell>Edit</TableCell>
    <TableCell >Delete</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {restra.map((value,index)=>{
    return(
    <TableRow key={index}>
    <TableCell>{value.restraname}</TableCell>
    <TableCell>{value.rtsee}</TableCell>
    <TableCell>{value.rlocation}</TableCell>
    <TableCell>  <img src={`data:image/jpeg;base64,${Buffer.from(value.restraphoto.data)}`} width="50" height="50" alt='Error' />   </TableCell>
    <TableCell><ModeEditIcon color='success' onClick={()=>updateValues(value)}/></TableCell>
    <TableCell><DeleteForeverIcon color='error' onClick={()=>deleteValue(value._id)}/></TableCell>
    </TableRow>
    )
    })}
    </TableBody>
    </Table>
    </TableContainer>
    </div>

    </Layout>
if(update){
    result=<Restraedit data={selected} method='put'/>}
  return (result)
   
}

 

export default RestraView