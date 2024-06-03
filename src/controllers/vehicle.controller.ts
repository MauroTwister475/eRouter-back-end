import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export class VehicleController {
  async create(req: Request, res: Response) {
    const { model, plate, capacity } = req.body;

    if (!model || !plate || !capacity) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
      const newVehicle = await prisma.vehicle.create({
        data: {
          model,
          plate,
          capacity,
        },
      });

      res.status(201).json(newVehicle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar veículo.' });
    }
  }

  async view(req: Request, res: Response) {
    try {
      const vehicles = await prisma.vehicle.findMany();
      return res.json(vehicles);
    } catch (error) {
      res.sendStatus(500).json({ error: 'Erro ao buscar os veículos' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { model, plate, capacity } = req.body;

    try {
      const updatedVehicle = await prisma.vehicle.update({
        where: { id },
        data: { model, plate, capacity },
      });

      res.json(updatedVehicle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar veículo.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.vehicle.delete({
        where: { id },
      });

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar veículo.' });
    }
  }
}
