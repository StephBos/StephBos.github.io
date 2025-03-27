import React, { useState, useEffect } from 'react'
import { Grid, Paper, Typography, Button, CircularProgress } from '@mui/material'
// import OpenAI from "openai";
// const client = new OpenAI();

import TextField from '@mui/material/TextField';


export default function InputQuery(){
    const [input, setInputValue] = useState('')
    const [reference, setReference] = useState('')
    const [loading, setLoading] = useState(true)

    // const openai = new OpenAI({
    //     apiKey: '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',
    //   });

    useEffect(()=>{
        fetch('http://localhost:8080/extract-pdf')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setReference(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error:', error);
      setLoading(false)
    });
    }, [])

    const queryChatGpt = async () => {
    }

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            style={{ minHeight: '100vh', paddingTop: '50px' }}
        >
            {loading ? (
                <Grid container justifyContent="center" alignItems="center">
                    <CircularProgress color="secondary" />
                    <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading...this will take like a minute</Typography>
                </Grid>
            ) : (
                <>
                    <TextField
                        id="outlined-basic"
                        label="What is it you desire?"
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInputValue(e.target.value)}
                        sx={{ width: '500px' }} 
                    />
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ marginTop: '20px' }}
                        onClick={queryChatGpt}
                    >
                        Submit
                    </Button>
                </>
            )}
        </Grid>
    );
}