import prismadb from '@lib/prismadb';
import { format } from 'date-fns';

import ColorClient from './components/ColorClient';
import { ColorColumn } from './components/Columns';

export default async function ColorsPage({
  params
}: {
  params: { storeId: string };
}) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, 'MMMM do, yyyy')
  }));

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
}
