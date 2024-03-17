import { loadS3IntoPinCone } from "@/lib/actions/Pinecone";
import { getS3Url } from "@/lib/actions/s3";
import { db } from "@/lib/database";
import { chats } from "@/lib/database/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    await loadS3IntoPinCone(file_key);
    // console.log({ file_key, file_name });
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId,
      })
      .returning({
        insertedId: chats.id,
      });
    return NextResponse.json(
      {
        chat_id: chat_id[0].insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Post", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
