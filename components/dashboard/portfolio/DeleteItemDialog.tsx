import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { PortfolioItem } from "@/types/PortfolioItem";
import "./AddItem.css"; // Assuming you have some styles for this component
interface DeleteItemDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteItem: () => void;
  selectedItem: PortfolioItem | null;
  loading: boolean;
}

const DeleteItemDialog: React.FC<DeleteItemDialogProps> = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  handleDeleteItem,
  selectedItem,
}) => (
  <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
    <DialogContent className="sm:max-w-md responsive-portfolio-modal">
      <DialogHeader>
        <DialogTitle>Delete Portfolio Item</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this portfolio item? This action
          cannot be undone.
        </DialogDescription>
      </DialogHeader>

      {selectedItem && (
        <div className="py-4">
          <p className="font-medium">{selectedItem.title}</p>
          <p className="text-sm text-gray-500">{selectedItem.category}</p>
        </div>
      )}

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => setIsDeleteDialogOpen(false)}
          className="mb:my-3"
        >
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDeleteItem}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteItemDialog;
