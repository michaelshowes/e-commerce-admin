import prismadb from '@lib/prismadb';
import { format } from 'date-fns';

import ProductClient from './components/ProductClient';
import { ProductColumn } from './components/Columns';
import { formatter } from '@lib/utils';

export default async function ProductsPage({
  params
}: {
  params: { storeId: string };
}) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      color: true,
      size: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, 'MMMM do, yyyy')
  }));

  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}
