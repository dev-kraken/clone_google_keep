import prisma from "../../lib/prisma";
export default async function handle(req, res) {
    const postId = req.query.id
  
    if (req.method === 'DELETE') {
      handleDELETE(postId, res)
    } else {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
    }
  }
  
  // DELETE /api/post/:id
  async function handleDELETE(postId, res) {
    const post = await prisma.Google_Keep.delete({
      where: { id: String(postId) },
    })
    res.json(post)
  }