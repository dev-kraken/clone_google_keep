import prisma from "../../lib/prisma";
export default async function handler(req, res) {
  const body = req.body;

  if (!body.title || !body.note) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "Please Fill data" });
  }
  const addNote = await prisma.Google_Keep.create({
    data: {
      title: body.title,
      note: body.note,
    },
  });
  // Sends a HTTP success code
  res.status(200).json({ data: `${addNote}` });
}
