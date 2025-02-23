import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import cors from "@fastify/cors";

interface AddressParams {
  id: string;
}

interface AdressUpdateBody {
  id?: number;
  address: string;
  country: string;
  zip: string;
}

const main = async () => {
  const prisma = new PrismaClient();
  const server = Fastify({ logger: true });

  await server.register(cors);

  server.get("/", async (_request) => {
    const addresses = await prisma.address.findMany();

    return { addresses };
  });

  server.get<{ Params: AddressParams }>("/:id", async (request, reply) => {
    try {
      const address = await prisma.address.findFirst({
        where: { id: +request.params.id },
      });
      reply.status(200).send({ address });
    } catch (_err) {
      reply.status(404).send({ error: "Address not found" });
    }
  });

  server.delete<{ Params: AddressParams }>("/:id", async (request, reply) => {
    try {
      await prisma.address.delete({
        where: { id: +request.params.id },
      });
      reply.status(204).send();
    } catch (_err) {
      reply.status(404).send({ error: "Address not found" });
    }
  });

  server.patch<{ Params: AddressParams; Body: AdressUpdateBody }>(
    "/:id",
    async (request, reply) => {
      const toUpdate = request.body;

      delete toUpdate.id;

      try {
        await prisma.address.update({
          where: { id: +request.params.id },
          data: toUpdate,
        });
        reply.status(204).send();
      } catch (_err) {
        reply.status(404).send({ error: "Address not found" });
      }
    }
  );

  try {
    await server.listen({
      port: 4001,
      host: "0.0.0.0",
    });
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

main();
