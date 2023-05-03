import { Box, Button, MenuItem, Stack } from '@mui/material';
import { Select, TextField } from 'mui-rff';
import { Form } from 'react-final-form';

enum dishType {
  pizza = 'pizza',
  soup = 'soup',
  sandwich = 'sandwich',
}

interface Dish {
  dishName: string;
  preparationTime: string;
  dishType: string;
  numberOfPizzaSlices?: number;
  diameter?: number;
  spiciness?: number;
  numberOfBreadSlices?: number;
}

const onSubmit = async (values: Dish) => {
  window.alert(JSON.stringify(values));
};

async function validate(values: Dish) {
  // if (values.dishName.length > 8) {
  //   return { dishName: 'dish name too long' };
  // }
  return;
}

const OrderForm = () => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        dishName: '',
        preparationTime: '',
        dishType: '',
        numberOfPizzaSlices: 0,
        diameter: 0,
        spiciness: 0,
        numberOfBreadSlices: 0,
      }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width="30vw" sx={{ minWidth: 300 }}>
            <TextField label="Dish Name" name="dishName" required={true} />
            <TextField
              type="time"
              label="Preparation Time"
              name="preparationTime"
              required={true}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 30,
              }}
            />

            <Select label="Dish Type" name="dishType" required={true}>
              <MenuItem value={dishType.pizza}>
                <Box textTransform="capitalize">{dishType.pizza}</Box>
              </MenuItem>
              <MenuItem value={dishType.soup}>
                <Box textTransform="capitalize">{dishType.soup}</Box>
              </MenuItem>
              <MenuItem value={dishType.sandwich}>
                <Box textTransform="capitalize">{dishType.sandwich}</Box>
              </MenuItem>
            </Select>

            {values.dishType === dishType.pizza && (
              <>
                <TextField
                  type="number"
                  label="Pizza Slices"
                  name="numberOfPizzaSlices"
                  required={true}
                  inputProps={{
                    min: 1,
                    max: 8,
                  }}
                />
                <TextField
                  type="number"
                  label="Diameter"
                  name="diameter"
                  required={true}
                  inputProps={{
                    step: 0.1,
                    min: 18,
                    max: 40,
                  }}
                />
              </>
            )}
            {values.dishType === dishType.soup && (
              <TextField
                type="number"
                label="Spiciness"
                name="spiciness"
                required={true}
                inputProps={{
                  min: 1,
                  max: 10,
                }}
              />
            )}
            {values.dishType === dishType.sandwich && (
              <TextField
                type="number"
                label="Bread Slices"
                name="numberOfBreadSlices"
                required={true}
                inputProps={{
                  min: 0,
                  max: 4,
                }}
              />
            )}
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Stack>

          <pre>{JSON.stringify(values)}</pre>
        </form>
      )}
    />
  );
};

export default OrderForm;
