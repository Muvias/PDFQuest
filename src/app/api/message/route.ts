import { db } from "@/db";
import { SendMessageValidator } from "@/lib/validators/SendMessage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { getUser } = getKindeServerSession()

    const user = getUser()
    const body = await req.json();

    const { id: userId } = user

    if (!userId) return new Response('Unauthorized', { status: 401 })

    const { fileId, message } = SendMessageValidator.parse(body)

    const file = await db.file.findFirst({
        where: {
            id: fileId,
            userId,
        }
    })

    if (!file) return new Response('Not found', { status: 404 })

    await db.message.create({
        data: {
            text: message,
            isUserMessage: true,
            userId,
            fileId
        }
    })
}