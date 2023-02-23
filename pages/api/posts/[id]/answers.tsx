import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  //유저 post 여부 판드시 확인
  // const post = await client.post.findUnique({
  //   where: {
  //     id: Number(id),
  //   },
  //   select: {
  //     id: true,
  //   },
  // });

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: Number(id),
        },
      },
      answer,
    },
  });

  res.json({ ok: true, answer: newAnswer });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
