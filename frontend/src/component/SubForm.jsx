import React from "react";
import {Grid, TextField, Box, Button, MenuItem, Select} from '@mui/material';
import {useForm} from "react-hook-form"

export default function SubForm() {

  return (
    <div className="form-container">
      <Box sx={{width: "100%", maxWidth: "100%"}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="サービス名"
              variant="outlined" 
              size="small" 
             />
          </Grid>
          
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="料金"
              variant="outlined" 
              size="small" 
            />
          </Grid>
    
          <Grid item xs={4} className="period-select">
            <Select
              fullWidth
              size="small"
              defaultValue="1"
            >
              <MenuItem value={1}>/月</MenuItem>
              <MenuItem value={2}>/年</MenuItem>
            </Select>
          </Grid>
    
          <Grid item xs={12}>
            <Button variant="contained">
              登録
            </Button>
          </Grid>
    
        </Grid>
      </Box>
    </div>
  )
}