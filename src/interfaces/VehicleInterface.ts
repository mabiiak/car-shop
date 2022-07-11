import { z } from 'zod';

const SchemaVehicle = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number(),
});

type Vehicle = z.infer<typeof SchemaVehicle>;

export { Vehicle, SchemaVehicle };
