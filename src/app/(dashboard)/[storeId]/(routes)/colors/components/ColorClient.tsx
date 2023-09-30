'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { ColorColumn, columns } from './Columns';
import { DataTable } from '@components/ui/DataTable';
import { Separator } from '@components/ui/separator';
import ApiList from '@components/ui/ApiList';

type ColorClientProps = {
  data: ColorColumn[];
};

export default function ColorClient({ data }: ColorClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Colors (${data.length})`}
          description={'Manage the colors for your store'}
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
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
        description={'API calls for colors'}
      />
      <Separator />
      <ApiList
        entityName={'colors'}
        entityIdName={'colorId'}
      />
    </>
  );
}
