import { Typography } from '@mui/material';
import axios from 'axios';
import OrderForm from './OrderForm.component';
import { IDish } from './interfaces';

const OrderFormContainer = () => {
  const onSubmit = async (values: IDish) => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/dishes/`, {
        ...values,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Typography mb={2} variant="h4">
        Dish Order
      </Typography>
      <OrderForm onSubmit={onSubmit} />
    </>
  );
};

export default OrderFormContainer;
