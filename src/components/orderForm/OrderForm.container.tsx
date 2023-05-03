import { Typography } from '@mui/material';
import OrderForm from './OrderForm.component';

const OrderFormContainer = () => {
  return (
    <>
      <Typography mb={2} variant="h4">
        Dish Order
      </Typography>
      <OrderForm />
    </>
  );
};

export default OrderFormContainer;
