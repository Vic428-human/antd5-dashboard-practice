import React from "react";
import { useMutation } from "@tanstack/react-query";
import { saveAPI } from "../api/colorSystemAPI.ts";
import { type savePayload } from "../types/global/save.ts";

interface saveButtonProps {
  savePayload: savePayload;
}

const SaveButton: React.FC<saveButtonProps> = ({ savePayload }) => {
  const saveMutation = useMutation({
    mutationFn: saveAPI,
    onSuccess: (data) => {
      if (data) {
      } else {
        console.error(
          "Error: data is not available in the API response.",
          data
        );
      }
    },
    onError: (err: unknown) => {
      console.error(
        "Unable to save, please try again later",
        err
      );
    },
  });

  const handleSave = () => {
    saveMutation.mutate(savePayload);
  };

  return (
    <div
      className="w-[140px] whitespace-nowrap flex flex-1 items-center justify-center gap-2 h-8 rounded-md cursor-pointer p-1 shadow-xl shadow-[#000000]/20 bg-primary hover:bg-primary-300"
      onClick={handleSave}
    >
      <span>Save</span>
    </div>
  );
};

export default SaveButton;
