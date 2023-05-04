import { Box, Button, MenuItem, Stack } from '@mui/material';
import { Select, TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import { validateDish } from './utils/dishSchema';

enum dishType {
  pizza = 'pizza',
  soup = 'soup',
  sandwich = 'sandwich',
}

export interface Dish {
  name: string;
  preparation_time: string;
  type: dishType | undefined;
  no_of_slices?: number | undefined;
  diameter?: number | undefined;
  spiciness_scale?: number | undefined;
  slices_of_bread?: number | undefined;
}

interface IProps {
  onSubmit: (values: Dish) => Promise<void>;
}

const OrderForm = ({ onSubmit }: IProps) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validateDish}
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

            {values.type === dishType.pizza && (
              <>
                <TextField
                  type="number"
                  label="Pizza Slices"
                  name="no_of_slices"
                  required={values.type === dishType.pizza && true}
                  inputProps={{
                    min: 1,
                    max: 8,
                  }}
                />
                <TextField
                  type="number"
                  label="Diameter"
                  name="diameter"
                  required={values.type === dishType.pizza && true}
                  inputProps={{
                    step: 0.1,
                    min: 18,
                    max: 40,
                  }}
                />
              </>
            )}
            {values.type === dishType.soup && (
              <TextField
                type="number"
                label="Spiciness"
                name="spiciness_scale"
                required={values.type === dishType.soup && true}
                inputProps={{
                  min: 1,
                  max: 10,
                }}
              />
            )}
            {values.type === dishType.sandwich && (
              <TextField
                type="number"
                label="Bread Slices"
                name="slices_of_bread"
                required={values.type === dishType.sandwich && true}
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
        </form>
      )}
    />
  );
};

export default OrderForm;
