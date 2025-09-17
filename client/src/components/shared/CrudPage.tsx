import { useState, ReactNode } from "react";
import { ViewMode, BaseEntity } from "./types";

interface CrudPageProps<T extends BaseEntity> {
  listComponent: (props: {
    onViewDetail: (item: T) => void;
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
    onAdd: () => void;
  }) => ReactNode;
  detailComponent: (props: { item: T; onBack: () => void }) => ReactNode;
  formComponent: (props: {
    item?: T;
    isEdit: boolean;
    onBack: () => void;
    onSave: (itemData: Partial<T>) => void;
  }) => ReactNode;
  deleteComponent: (props: {
    item: T;
    onBack: () => void;
    onConfirm: () => void;
  }) => ReactNode;
  onSave?: (itemData: Partial<T>) => void;
  onDelete?: (item: T) => void;
}

export default function CrudPage<T extends BaseEntity>({
  listComponent,
  detailComponent,
  formComponent,
  deleteComponent,
  onSave,
  onDelete,
}: CrudPageProps<T>) {
  const [currentView, setCurrentView] = useState<ViewMode>("list");
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleViewDetail = (item: T) => {
    setSelectedItem(item);
    setCurrentView("detail");
  };

  const handleEdit = (item: T) => {
    setSelectedItem(item);
    setCurrentView("edit");
  };

  const handleDelete = (item: T) => {
    setSelectedItem(item);
    setCurrentView("delete");
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setCurrentView("add");
  };

  const handleBack = () => {
    setCurrentView("list");
    setSelectedItem(null);
  };

  const handleSave = (itemData: Partial<T>) => {
    onSave?.(itemData);
    setCurrentView("list");
    setSelectedItem(null);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      onDelete?.(selectedItem);
    }
    setCurrentView("list");
    setSelectedItem(null);
  };

  switch (currentView) {
    case "detail":
      return selectedItem
        ? detailComponent({ item: selectedItem, onBack: handleBack })
        : null;

    case "add":
      return formComponent({
        isEdit: false,
        onBack: handleBack,
        onSave: handleSave,
      });

    case "edit":
      return selectedItem
        ? formComponent({
            item: selectedItem,
            isEdit: true,
            onBack: handleBack,
            onSave: handleSave,
          })
        : null;

    case "delete":
      return selectedItem
        ? deleteComponent({
            item: selectedItem,
            onBack: handleBack,
            onConfirm: handleConfirmDelete,
          })
        : null;

    default:
      return listComponent({
        onViewDetail: handleViewDetail,
        onEdit: handleEdit,
        onDelete: handleDelete,
        onAdd: handleAdd,
      });
  }
}
