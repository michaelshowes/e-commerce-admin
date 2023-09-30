'use client';

import { useOrigin } from '@hooks/useOrigin';
import { useParams } from 'next/navigation';
import ApiAlert from './ApiAlert';

type ApiListProps = {
  entityName: string;
  entityIdName: string;
};

export default function ApiList({ entityName, entityIdName }: ApiListProps) {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title={'GET'}
        variant={'public'}
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title={'GET'}
        variant={'public'}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title={'POST'}
        variant={'admin'}
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title={'PATCH'}
        variant={'admin'}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title={'DELTE'}
        variant={'admin'}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
}
