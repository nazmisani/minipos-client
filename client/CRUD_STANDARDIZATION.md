# Standardized CRUD System Documentation

## Overview

Semua halaman CRUD sekarang menggunakan design pattern yang sama dengan customers page - clean, simple, dan tidak redundant.

## Shared Components

### Layout & Structure

- **`CrudLayout`**: Layout container dengan gradient background yang konsisten
- **`PageHeader`**: Header dengan title, subtitle, dan action button
- **`SearchBar`**: Search input yang konsisten
- **`Card`**: Container untuk content
- **`BackButton`**: Tombol kembali yang konsisten

### Form Components

- **`Input`**: Text input dengan label dan error handling
- **`Select`**: Select dropdown dengan options
- **`Button`**: Button dengan variants (primary, secondary, danger, success, info)

### Table Components

- **`DataTable`**: Container untuk table
- **`TableHeader`**, **`TableHeaderCell`**: Header table
- **`TableBody`**, **`TableRow`**, **`TableCell`**: Body table
- **`EmptyState`**: Empty state message

### Page Template

- **`CrudPage`**: Template yang menghandle ViewMode switching otomatis

## Usage Pattern

### 1. Types Definition

```typescript
import { BaseEntity } from "@/components/shared/types";

export type YourEntity = BaseEntity & {
  name: string;
  // ... other properties
};

export type YourEntityViewMode = "list" | "detail" | "add" | "edit" | "delete";
```

### 2. List Component

```typescript
import {
  CrudLayout,
  PageHeader,
  SearchBar,
  Button,
  Card,
} from "@/components/shared";

export default function YourEntityList({ onViewModeChange, onSelectEntity }) {
  return (
    <CrudLayout>
      <PageHeader
        title="Entity Management"
        subtitle="Description..."
        action={
          <Button onClick={() => onViewModeChange("add")}>Add Entity</Button>
        }
      />
      <SearchBar placeholder="Search entities..." />
      <Card>
        <YourEntityTable {...props} />
      </Card>
    </CrudLayout>
  );
}
```

### 3. Table Component

```typescript
import { DataTable, TableHeader, TableHeaderCell, ... } from "@/components/shared";

export default function YourEntityTable({ entities, onViewDetail, onEdit, onDelete }) {
  return (
    <DataTable>
      <TableHeader>
        <TableHeaderCell>Column 1</TableHeaderCell>
        {/* ... */}
      </TableHeader>
      <TableBody>
        {entities.map(entity => (
          <TableRow key={entity.id}>
            <TableCell>{entity.name}</TableCell>
            <TableCell>
              <Button size="sm" variant="success" onClick={() => onViewDetail(entity)}>View</Button>
              <Button size="sm" variant="info" onClick={() => onEdit(entity)}>Edit</Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(entity)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  );
}
```

### 4. Form Component

```typescript
import {
  CrudLayout,
  BackButton,
  PageHeader,
  Card,
  Input,
  Select,
  Button,
} from "@/components/shared";

export default function YourEntityForm({ mode, entity, onViewModeChange }) {
  return (
    <CrudLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="mb-4">
            <BackButton onClick={() => onViewModeChange("list")} />
          </div>
          <PageHeader title={mode === "edit" ? "Edit Entity" : "Add Entity"} />
        </div>
        <Card className="p-6">
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {/* ... other fields */}
            <div className="flex gap-3 pt-4">
              <Button type="submit">
                {mode === "edit" ? "Update" : "Create"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => onViewModeChange("list")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </CrudLayout>
  );
}
```

## Design Consistency

### Colors & Styling

- **Primary Color**: Emerald (#059669, #047857)
- **Background**: Gradient dari slate-50 ke slate-100
- **Cards**: White background dengan border slate-200
- **Text**: slate-900 untuk primary, slate-600 untuk secondary, slate-500 untuk muted

### Button Variants

- **Primary**: Emerald background (default)
- **Secondary**: Slate background
- **Danger**: Red background
- **Success**: Green background
- **Info**: Blue background

### Size Variants

- **Small**: px-3 py-1 text-xs
- **Medium**: px-4 py-2 text-sm (default)
- **Large**: px-6 py-3 text-base

## ViewMode System

Semua CRUD page menggunakan ViewMode switching:

- **list**: Tampilan daftar dengan table
- **detail**: Tampilan detail item
- **add**: Form tambah item baru
- **edit**: Form edit item existing
- **delete**: Confirmation dialog hapus

## Benefits

1. **Consistency**: Semua CRUD page terlihat sama
2. **Maintainability**: Shared components mudah di-update
3. **Reusability**: Components bisa dipakai di page lain
4. **Clean Code**: Tidak ada duplikasi kode
5. **Scalability**: Mudah menambah CRUD page baru

## Migration Guide

Untuk migrate existing CRUD pages:

1. Import shared components
2. Replace custom styling dengan shared components
3. Update types untuk extend BaseEntity
4. Follow pattern yang sudah ada di Users atau Products component

## Examples

- ✅ **Users**: Fully migrated to new system
- ✅ **Products**: Example implementation
- 🔄 **Customers**: Original pattern (reference)
- 🔄 **Transactions**: Needs migration

## Future Improvements

- [ ] Add loading states
- [ ] Add pagination component
- [ ] Add filtering component
- [ ] Add sorting functionality
- [ ] Add bulk actions
- [ ] Add export functionality
