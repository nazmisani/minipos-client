import { Transaction } from "./types";
import {
  CrudLayout,
  BackButton,
  PageHeader,
  Card,
  Input,
  Button,
} from "@/components/shared";

interface TransactionFormProps {
  transaction?: Transaction;
  isEdit: boolean;
  onBack: () => void;
  onSave: () => void;
}

export default function TransactionForm({
  transaction,
  isEdit,
  onBack,
  onSave,
}: TransactionFormProps) {
  return (
    <CrudLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="mb-4">
            <BackButton onClick={onBack} />
          </div>
          <PageHeader
            title={isEdit ? "Edit Transaction" : "Add Transaction"}
            subtitle="Manage sales transaction data."
          />
        </div>

        <Card className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="User ID"
                type="number"
                defaultValue={transaction?.userId?.toString() || ""}
                placeholder="Masukkan user ID"
              />
              <Input
                label="Customer ID (opsional)"
                type="number"
                defaultValue={transaction?.customerId?.toString() || ""}
                placeholder="Masukkan customer ID"
              />
            </div>

            <Input
              label="Total"
              type="number"
              defaultValue={transaction?.total?.toString() || ""}
              placeholder="Enter transaction total"
            />

            <div className="flex gap-3 pt-4">
              <Button type="button" onClick={onSave}>
                {isEdit ? "Update" : "Save"}
              </Button>
              <Button variant="secondary" type="button" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </CrudLayout>
  );
}
