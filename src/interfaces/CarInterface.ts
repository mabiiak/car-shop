import { z } from 'zod';
import { SchemaVehicle } from './VehicleInterface';

const SchemaCar = SchemaVehicle.extend({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

type Car = z.infer<typeof SchemaCar>;

// Referencia: https://github.com/colinhacks/zod#extend

export { Car, SchemaCar };
