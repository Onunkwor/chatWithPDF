"use client";
import { uploadToS3 } from "@/lib/actions/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      // console.log(file);
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb
        toast.error("Please provide a file size below 10mb");
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data.file_key || !data.file_name) {
          toast.error("Something went wrong");
        }

        mutate(data, {
          onSuccess: ({ chat_id }) => {
            // console.log(data);
            toast.success("Chat created successfully");
            router.push(`/chats/${chat_id}`);
          },
          onError: (err) => {
            console.error(err);
            toast.error("Error creating chat");
          },
        });
        //vectors and embedding cosine similarity(find how similar two vectors are)
      } catch (error) {
        console.log("Fail to upload file to amazon s3", error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
