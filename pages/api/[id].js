import prisma from "../../lib/prisma";
export default async function handle(req, res) {
  const postId = req.query.id;

  if (req.method === "DELETE") {
    handleDELETE(postId, res);
  } else if (req.method === "POST") {
    const body = req.body;

    if (!body.title || !body.note) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: "Please Fill data" });
    }
    handleUPDATE(body, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// DELETE /api/post/:id
async function handleDELETE(postId, res) {
  const post = await prisma.Google_Keep.delete({
    where: { id: String(postId) },
  });
  res.json(post);
}

async function handleUPDATE(body, res) {
  const post = await prisma.Google_Keep.update({
    where: { id: String(body.id) },
    data: {
      title: body.title,
      note: body.note,
    },
  });
  res.json(post);
}
