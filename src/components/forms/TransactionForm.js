import React, { useEffect, useState, useMemo } from 'react';
import OptionsSelect from '../../sharedComponents/OptionsSelect';
import MoneyTypeFieldset from '../../sharedComponents/MoneyTypeFieldset';
import CategorySelect from '../../sharedComponents/CategorySelect';
import DateSelect from '../../sharedComponents/DateSelect';
import { useSelector } from 'react-redux';
import { transactionValidate } from '../../utils/validator';
import { format } from 'date-fns';
import { validateHelper, sanitizePayload } from '../../utils/helpers';
import TextField from '../../sharedComponents/TextField';

const TransactionForm = ({ children, onSubmit, transaction }) => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const initialFormState = useMemo(() => {
    return {
      name: transaction?.name || '',
      categoryId: transaction?.categoryId || null,
      amount: parseFloat(transaction?.amount) || 0.0,
      transactionType: transaction?.transactionType || 'negative',
      moneyPotId: transaction?.moneyPotId || moneyPots[0]?.id,
      transactionDate: transaction?.transactionDate || currentDate,
    };
  }, [transaction, moneyPots, currentDate]);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    if (transaction) {
      setFormData(initialFormState);
    }
  }, [initialFormState, transaction]);

  const handleChange = (name, value) => {
        setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {...formData}
    data.amount = parseFloat(data.amount);
    const sanitizedData = sanitizePayload(data, ['categoryId', 'name', 'description']);
    const { valid, errors } = validateHelper(transactionValidate, sanitizedData);
    if (!valid) {
      setErrors(errors);
      return;
    }
    onSubmit(sanitizedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          optional
        />
        <OptionsSelect
          required
          label="Account"
          selectedId={formData.moneyPotId}
          handleSelectedIdChange={(value) => handleChange('moneyPotId', value)}
          options={moneyPots}
          error={errors.moneyPotId}
        />
      </fieldset>
      <fieldset className="date-money-fieldset">
        <MoneyTypeFieldset
          required
          label="Transaction Amount"
          transactionType={formData.transactionType}
          handleTransactionTypeChange={(value) => handleChange('transactionType', value)}
          amount={formData.amount}
          handleAmountChange={(value) => handleChange('amount', value)}
          error={errors.amount + errors.transactionType}
        />
        <DateSelect
          label="Transaction Date"
          optional
          date={formData.transactionDate}
          handleDateChange={(value) => handleChange('transactionDate', value)}
          error={errors.transactionDate}
        />
      </fieldset>
      <fieldset className="category-picker-cont">
        <label className="form-sub-heading">
          Category <span className="info-text">(optional)</span>
        </label>
        <CategorySelect
          selectedCategoryId={formData.categoryId}
          handleCategoryIdChange={(value) => handleChange('categoryId', value)}
          error={errors.categoryId}
        />
      </fieldset>
      <div className="submit-btn-cont">{children}</div>
    </form>
  );
};

export default TransactionForm;
