import prisma from "../../lib/prisma";
export default async function handler(req, res) {
  const getNote = await prisma.Google_Keep.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      }
    ],
  })
  // Sends a HTTP success code
  res.status(200).json(getNote);
}