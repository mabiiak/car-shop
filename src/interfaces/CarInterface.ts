import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

const SchemaCar = z.object({
  doorsQty: z.number().int().min(2).max(4),
  seatsQty: z.number().int().min(2).max(7),
});

type Car = z.infer<typeof SchemaCar> & Vehicle;

// Referencia: https://github.com/colinhacks/zod#extend

export { Car, SchemaCar };
