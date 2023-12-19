import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as  MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';

interface DateProps {
    onDateChange: (date: Date | null) => void;
}

export default function DatePicker({onDateChange }: DateProps) {

    const handleDateChange = (date: Date | null) => {
        onDateChange(date);
        console.log(dayjs(date).format('DD/MM/YYYY')); // Console log the selected date in 'DD/MM/YYYY' format
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MuiDatePicker 
                    label="Choose Date"
                    format='DD/MM/YYYY'
                    onChange={handleDateChange}
                />
                <IconButton onClick={() => handleDateChange(null)}>
                    <ClearIcon />
                </IconButton>
            </Box>
        </LocalizationProvider>
    );
}
