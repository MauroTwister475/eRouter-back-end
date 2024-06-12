import { prisma } from "../database/prisma";
import { Request, Response } from "express";

export class AllocationController {
  async create(req: Request, res: Response) {
    const { nameDriver, nameRoute, plateVehicle } = req.body;

    if (!nameDriver || !nameRoute || !plateVehicle) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      // const existingAllocation = await prisma.allocation.findFirst({
      //   where: {
      //     OR: [{  }],
      //   },
      // });

      // if (existingAllocation) {
      //   return res
      //     .status(400)
      //     .json({ error: "Já existe alocação com esse nome." });
      // }

      const driver = await prisma.driver.findFirstOrThrow({
        where: {
          username: nameDriver,
        },
      });

      const vehicle = await prisma.vehicle.findFirstOrThrow({
        where: {
          plate: plateVehicle,
        },
      });

      const route = await prisma.route.findFirstOrThrow({
        where: {
          name: nameRoute,
        },
      });

      const updatedallocation = await prisma.allocation.create({
        data: {
          routeId: route.id,
          vehicleId: vehicle.id,
          driverId: driver.id,
        },
      });

      return res.status(200).json(updatedallocation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar rota." });
    }
  }
  async view(req: Request, res: Response) {
    try {
      const allocations = await prisma.allocation.findMany({
        include: {
          route: {
            select: {
              name: true,
              startLat: true,
              destinyLat: true,
              startLong: true,
              destinyLong: true,
            },
          },
          vehicle: {
            select: {
              drivers: true,
              capacity: true,
              model: true,
              plate: true,
            },
          },
        },
      });
      return res.json(allocations);
    } catch (error) {
      res.sendStatus(500);
      res.json({ error: "Erro ao buscar os rotas" });
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nameDriver, nameRoute, plateVehicle } = req.body;

    try {
      const existingAllocation = await prisma.allocation.findUnique({
        where: { id },
      });

      if (!existingAllocation) {
        return res.status(404).json({ error: "veiculo não encontrado." });
      }

      const driver = await prisma.driver.findFirstOrThrow({
        where: {
          username: nameDriver,
        },
      });

      const vehicle = await prisma.vehicle.findFirstOrThrow({
        where: {
          plate: plateVehicle,
        },
      });

      const route = await prisma.route.findFirstOrThrow({
        where: {
          name: nameRoute,
        },
      });

      const updatedallocation = await prisma.allocation.update({
        where: { id },
        data: {
          routeId: route.id,
          vehicleId: vehicle.id,
          driverId: driver.id,
        },
      });

      return res.status(200).json(updatedallocation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar a rota." });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const existingAllocation = await prisma.allocation.findUnique({
        where: { id },
      });

      if (!existingAllocation) {
        return res.status(404).json({ error: "ALocação não encontrada." });
      }

      await prisma.allocation.delete({
        where: { id },
      });

      return res
        .status(200)
        .json({ message: "Alocação deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar a alocação." });
    }
  }
}
