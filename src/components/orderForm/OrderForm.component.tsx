import { Box, Button, MenuItem, Stack } from '@mui/material';
import axios from 'axios';
import { Select, TextField } from 'mui-rff';
import { Form } from 'react-final-form';

enum type {
  pizza = 'pizza',
  soup = 'soup',
  sandwich = 'sandwich',
}

interface Dish {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

const onSubmit = async (values: Dish) => {
  axios
    .post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
      name: values.name,
      preparation_time: values.preparation_time,
      type: values.type,
      no_of_slices: values.no_of_slices,
      diameter: values.diameter,
      spiciness_scale: values.spiciness_scale,
      slices_of_bread: values.slices_of_bread,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

async function validate(values: Dish) {
  if (values.name.length > 8) {
    return { name: 'dish name too long' };
  }
  return;
}

const OrderForm = () => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        name: '',
        preparation_time: '',
        type: '',
        no_of_slices: undefined,
        diameter: undefined,
        spiciness_scale: undefined,
        slices_of_bread: undefined,
      }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width="30vw" sx={{ minWidth: 300 }}>
            <TextField label="Dish Name" name="name" required={true} />
            <TextField
              type="time"
              label="Preparation Time"
              name="preparation_time"
              required={true}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 30,
              }}
            />

            <Select label="Dish Type" name="type" required={true}>
              <MenuItem value={type.pizza}>
                <Box textTransform="capitalize">{type.pizza}</Box>
              </MenuItem>
              <MenuItem value={type.soup}>
                <Box textTransform="capitalize">{type.soup}</Box>
              </MenuItem>
              <MenuItem value={type.sandwich}>
                <Box textTransform="capitalize">{type.sandwich}</Box>
              </MenuItem>
            </Select>

            {values.type === type.pizza && (
              <>
                <TextField
                  type="number"
                  label="Pizza Slices"
                  name="no_of_slices"
                  required={values.type === type.pizza && true}
                  inputProps={{
                    min: 1,
                    max: 8,
                  }}
                />
                <TextField
                  type="number"
                  label="Diameter"
                  name="diameter"
                  required={values.type === type.pizza && true}
                  inputProps={{
                    step: 0.1,
                    min: 18,
                    max: 40,
                  }}
                />
              </>
            )}
            {values.type === type.soup && (
              <TextField
                type="number"
                label="Spiciness"
                name="spiciness_scale"
                required={values.type === type.soup && true}
                inputProps={{
                  min: 1,
                  max: 10,
                }}
              />
            )}
            {values.type === type.sandwich && (
              <TextField
                type="number"
                label="Bread Slices"
                name="slices_of_bread"
                required={values.type === type.sandwich && true}
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
