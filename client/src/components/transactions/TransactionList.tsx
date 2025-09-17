import { transactions } from "./data";
import { Transaction } from "./types";
import TransactionTable from "./TransactionTable";
import {
  CrudLayout,
  PageHeader,
  SearchBar,
  Button,
  Card,
} from "@/components/shared";

interface TransactionListProps {
  onViewDetail: (transaction: Transaction) => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  onAdd: () => void;
}

export default function TransactionList({
  onViewDetail,
  onEdit,
  onDelete,
  onAdd,
}: TransactionListProps) {
  // TODO: Replace with API call
  const dummyTransactions: any[] = [];

  return (
    <CrudLayout>
      <PageHeader
        title="Transaction Management"
        subtitle="Kelola semua transaksi dan riwayat penjualan."
        action={<Button onClick={onAdd}>Tambah Transaksi</Button>}
      />

      <SearchBar placeholder="Cari transaksi..." />

      <Card>
        <TransactionTable
          transactions={dummyTransactions}
          onViewDetail={onViewDetail}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Card>
    </CrudLayout>
  );
}
