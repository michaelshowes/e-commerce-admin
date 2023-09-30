'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { BillboardColumn, columns } from './Columns';
import { DataTable } from '@components/ui/DataTable';
import { Separator } from '@components/ui/separator';
import ApiList from '@components/ui/ApiList';

type BillboardClientProps = {
  data: BillboardColumn[];
};

export default function BillboardClient({ data }: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Billboards (${data.length})`}
          description={'Manage the billboards for your store'}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className={'mr-2 h-4 w-4'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey={'label'}
      />
      <Heading
        title={'API'}
        description={'API calls for billboards'}
      />
      <Separator />
      <ApiList
        entityName={'billboards'}
        entityIdName={'billboardId'}
      />
    </>
  );
}
