// Import the CSS file
import './Places.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Table, TableContainer, TextField, Typography } from '@mui/material';
import Layout from '../adminpanel/Layout';


const Places = () => {
  var [inputs, setInputs] = useState({ "placename": '', "tsee": '', "location": '' });
  var [selectedimage, setSelectedimage] = useState(null);

  const navigate = useNavigate();
  const navigatetoHotel = () => {
    navigate('/Hotel');
  }

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    console.log(inputs);
  }

  const handleimage = (event) => {
    const file = event.target.files[0];
    setSelectedimage(file);
    inputs.placephoto = file;
  }

  const savedata = () => {
    const formdata = new FormData();
    formdata.append('placename', inputs.placename);
    formdata.append('tsee', inputs.tsee);
    formdata.append('location', inputs.location);
    formdata.append('placephoto', selectedimage);

    fetch('http://localhost:4005/photonew', {
      method: 'post',
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Place saved");
      })
      .catch((err) => {
        console.log("error");
      });
    //  navigate('/PlaceView')
  }

  return (
    <Layout>
    <div className='p'>
   
 
      <Typography variant='h5' className='h5'>Add Place</Typography><br></br>
      <TextField
        id="outlined-basic"
        label="Places"
        variant="outlined"
        className='input'
        name="placename"
        value={inputs.placename}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <TextField
      className='input'
        id="outlined-basic"
        label="Things to see"
        variant="outlined"
        name="tsee"
        value={inputs.tsee}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <input type="file" onChange={handleimage} className='input'/>
      <br></br>
      <br></br>
      <TextField
      className='input'
        id="outlined-basic"
        label="Location"
        variant="outlined"
        name="location"
        value={inputs.location}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <Button
      className='Button'
        variant='contained'
        color='success'
        onClick={() => { savedata(); navigatetoHotel() }}
      >
        NEXT
      </Button>
    </div>
    </Layout>
  );
}

export default Places;
