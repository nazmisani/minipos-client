// Shared types for CRUD operations
export type BaseEntity = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ViewMode = "list" | "detail" | "add" | "edit" | "delete";

export interface BaseListProps<T extends BaseEntity> {
  onViewDetail: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onAdd: () => void;
}

export interface BaseDetailProps<T extends BaseEntity> {
  item: T;
  onBack: () => void;
}

export interface BaseFormProps<T extends BaseEntity> {
  item?: T;
  isEdit?: boolean;
  onBack: () => void;
  onSave: (itemData: Partial<T>) => void;
}

export interface BaseDeleteProps<T extends BaseEntity> {
  item: T;
  onBack: () => void;
  onConfirm: () => void;
}

export interface TableAction<T extends BaseEntity> {
  label: string;
  onClick: (item: T) => void;
  className: string;
}
