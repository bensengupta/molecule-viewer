import { prisma } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";

// Returns random int in range 0 to max (exclusive)
// getRandomInt(3) is 0, 1, or 2
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const dummyValue = getRandomInt(1000000);

  await prisma.dummyTable.create({ data: { dummyValue }});

  res.status(200).json({ dummyValue })
}