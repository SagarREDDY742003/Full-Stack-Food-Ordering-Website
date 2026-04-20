import { Button, Card } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import React from 'react'

const AddressCard = ({item,showButton,handleSelectAddress}) => {

  return (
    <Card className='flex gap-5 w-64 p-5'>
        <HomeIcon />
        <div className='space-y-3 text-gray-500'>
            <h1 className='font-semibold text-lg text-white'>Home</h1>
            <p className='text-sm'>123, Main Street, City, State - 123456</p>
            <p className='text-sm'>9876543210</p>
            {showButton && <Button variant="outlined" fullWidth onClick={() => handleSelectAddress(item)}>select</Button>}
        </div>
    </Card>
  )
}

export default AddressCard
