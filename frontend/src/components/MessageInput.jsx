import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
// import { Image, X } from "lucide-react";
import { Send } from "lucide-react";
// import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  // const [imagePreview, setImagePreview] = useState(null);
  // const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file.type.startsWith("image/")) {
  //     toast.error("Please select an image file");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const removeImage = () => {
  //   setImagePreview(null);
  //   if (fileInputRef.current) fileInputRef.current.value = "";
  // };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({
        text: text.trim(),
        // image: imagePreview,
      });

      setText("");
      // setImagePreview(null);
      // if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full border-t border-base-300">
      {/* {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-gray-300 dark:border-zinc-600 shadow-md"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-base-300 hover:bg-base-200
                       flex items-center justify-center shadow ring-1 ring-gray-200"
            >
              <X className="size-3 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      )} */}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full input input-sm sm:input-md input-bordered rounded-xl focus:outline-none"
          />

          {/* 
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle btn-sm transition-colors duration-200 
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"} hover:bg-base-200`}
          >
            <Image size={20} />
          </button>
          */}
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle btn-primary disabled:opacity-50"
          disabled={!text.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
