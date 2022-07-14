import { z } from 'zod';
import { SchemaVehicle } from './VehicleInterface';

const SchemaMotorCycle = SchemaVehicle.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().min(1).max(2500),
});

type Motorcycle = z.infer<typeof SchemaMotorCycle>;

export { Motorcycle, SchemaMotorCycle };
