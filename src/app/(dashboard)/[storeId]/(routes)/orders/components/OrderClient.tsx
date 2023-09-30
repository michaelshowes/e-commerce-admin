'use client';

import Heading from '@/components/ui/Heading';
import { OrderColumn, columns } from './Columns';
import { DataTable } from '@components/ui/DataTable';
import { Separator } from '@components/ui/separator';

type OrderClientProps = {
  data: OrderColumn[];
};

export default function OrderClient({ data }: OrderClientProps) {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description={'Manage the orders for your store'}
      />

      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey={'products'}
      />
    </>
  );
}
