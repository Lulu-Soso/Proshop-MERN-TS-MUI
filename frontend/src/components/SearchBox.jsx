import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Box
      component='form'
      onSubmit={submitHandler}
      sx={{ display: 'flex', alignItems: 'center', ml: 1, mr: 1 }}
    >
      <TextField
        variant='outlined'
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        size='small'
        sx={{
          flexGrow: 1,
          backgroundColor: 'background.paper',
          borderRadius: '5px',
        }}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ p: 1, ml: 1 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBox;
