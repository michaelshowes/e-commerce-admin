'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { SizeColumn, columns } from './Columns';
import { DataTable } from '@components/ui/DataTable';
import { Separator } from '@components/ui/separator';
import ApiList from '@components/ui/ApiList';

type SizeClientProps = {
  data: SizeColumn[];
};

export default function SizeClient({ data }: SizeClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Sizes (${data.length})`}
          description={'Manage the sizes for your store'}
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className={'mr-2 h-4 w-4'} />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey={'name'}
      />
      <Heading
        title={'API'}
        description={'API calls for sizes'}
      />
      <Separator />
      <ApiList
        entityName={'sizes'}
        entityIdName={'sizeId'}
      />
    </>
  );
}
