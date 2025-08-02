"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PortfolioItems from "./PortfolioItems";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import DeleteItemDialog from "./DeleteItemDialog";
import type { PortfolioItem } from "@/types/PortfolioItem";

type FormImage = { url: string; deleteUrl: string };

interface FormState {
  id: string;
  title: string;
  category: string;
  description: string;
  images: FormImage[];
}

const categories = [
  "Web Development",
  "Mobile Apps",
  "Blockchain",
  "AI/ML",
  "UI/UX Design",
  "E-commerce",
  "Custom Software",
  "Other",
] as const;

const emptyForm: FormState = {
  id: "",
  title: "",
  category: "",
  description: "",
  images: [],
};

export function ManagePortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState<FormState>({ ...emptyForm });
  const [loading, setLoading] = useState(false);

  // Fetch portfolio items from backend
  const fetchPortfolio = async (force = false) => {
    setLoading(true);
    const CACHE_DURATION = 120000; // 2 minutes
    const cached = sessionStorage.getItem("portfolioItems");
    const cachedAt = sessionStorage.getItem("portfolioItemsAt");
    const now = Date.now();

    if (
      !force &&
      cached &&
      cachedAt &&
      now - Number(cachedAt) < CACHE_DURATION
    ) {
      setPortfolioItems(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/portfolio", { next: { revalidate: 120 } });
      const data = await res.json();
      setPortfolioItems(data);
      sessionStorage.setItem("portfolioItems", JSON.stringify(data));
      sessionStorage.setItem("portfolioItemsAt", now.toString());
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch portfolio items.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const resetForm = () => setFormData({ ...emptyForm });

  const openAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (item: PortfolioItem) => {
    setSelectedItem(item);
    setFormData({
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      // Convert string[] to FormImage[]
      images: (item.images || []).map((url) => ({ url, deleteUrl: "" })),
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  // ADD
  const handleAddItem = async () => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      !formData.images.length
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and upload at least one image",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      // Defensive: always map images to string[]
      const payload = {
        ...formData,
        images: Array.isArray(formData.images)
          ? formData.images.map((img: any) =>
              typeof img === "string" ? img : img.url
            )
          : [],
      };
      console.log("Payload being sent to API:", payload);
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      toast({
        title: "Success!",
        description: "New portfolio item has been added successfully",
      });
      setIsAddDialogOpen(false);
      resetForm();
      await fetchPortfolio(true);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to add item.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  // EDIT
  const handleEditItem = async () => {
    if (!selectedItem) return;
    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      !formData.images.length
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and upload at least one image",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      // Map images to array of URLs before sending to backend
      const payload = {
        ...formData,
        images: formData.images.map((img) => img.url),
        id: selectedItem.id,
      };
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      toast({
        title: "Success!",
        description: "Portfolio item has been updated successfully",
      });
      setIsEditDialogOpen(false);
      setSelectedItem(null);
      resetForm();
      await fetchPortfolio(true);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update item.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  // DELETE
  const handleDeleteItem = async () => {
    if (!selectedItem) return;
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedItem.id }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast({
        title: "Success!",
        description: "Portfolio item has been deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
      await fetchPortfolio(true);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete item.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div
      className="space-y-6"
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "var(--font-primary)",
      }}
    >
      {/* Header Section */}
      <div
        className="flex items-center justify-between p-6 rounded-lg border"
        style={{
          backgroundColor: "#f8fafc",
          borderColor: "#e2e8f0",
          borderWidth: "1px",
        }}
      >
        <div>
          <h2
            className="text-2xl font-semibold mb-1"
            style={{
              color: "#000000",
              fontFamily: "var(--font-heading)",
            }}
          >
            Portfolio Management
          </h2>
          <p className="text-base" style={{ color: "#64748b" }}>
            Showcase your best work and projects
          </p>
        </div>
        <Button
          onClick={openAddDialog}
          disabled={loading}
          className="gap-2 px-6 py-3 font-medium"
          style={{
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "14px",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <PlusCircle className="h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {/* Content Section */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
          borderWidth: "1px",
        }}
      >
        {/* Portfolio Items */}
        <PortfolioItems
          openDeleteDialog={openDeleteDialog}
          openEditDialog={openEditDialog}
          portfolioItems={portfolioItems}
          loading={loading}
        />
      </div>

      {/* Add Portfolio Item Dialog */}
      <AddItem
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        handleAddItem={handleAddItem}
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        imgbbApiKey={process.env.NEXT_PUBLIC_IMGBB_API_KEY!}
        loading={loading}
      />

      {/* Edit Portfolio Item Dialog */}
      <EditItem
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        handleEditItem={handleEditItem}
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        categories={categories as unknown as string[]}
        imgbbApiKey={process.env.NEXT_PUBLIC_IMGBB_API_KEY!}
        loading={loading}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteItemDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleDeleteItem={handleDeleteItem}
        selectedItem={selectedItem}
        loading={loading}
      />
    </div>
  );
}
