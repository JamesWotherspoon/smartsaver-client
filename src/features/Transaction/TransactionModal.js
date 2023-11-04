import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomModal from '../../sharedComponents/CustomModal';
import { HorizontalFillBox } from '../../styles/SharedStyles';
import CurrencyTextField from '../../sharedComponents/CurrencyTextField';

const TransactionModal = ({ open, handleClose }) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [transactionType, setTransactionType] = useState('expense');
  const [moneyPot, setMoneyPot] = useState('');
  const [date, setDate] = useState(currentDate);

  const handleSubmit = (e) => {
    e.preDefault();
    // handle form submission here
  };

  return (
    <CustomModal isOpen={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <HorizontalFillBox>
          <TextField label="Money Pot" value={moneyPot} onChange={(e) => setMoneyPot(e.target.value)} />
          <TextField label="Category ID" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
        </HorizontalFillBox>
        <HorizontalFillBox>
          <FormControl>
            <InputLabel>Transaction Type</InputLabel>
            <Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
          <CurrencyTextField label="Amount" />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
          </LocalizationProvider>
        </HorizontalFillBox>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </CustomModal>
  );
};

export default TransactionModal;
