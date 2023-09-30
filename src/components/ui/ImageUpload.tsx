'use client';
import { CldUploadWidget } from 'next-cloudinary';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';

type ImageUploadProps = {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className={'mb-4 flex items-center gap-4'}>
        {value.map((url, index) => (
          <div
            key={url}
            className={
              'relative h-[200px] w-[200px] overflow-hidden rounded-md'
            }
          >
            <div className={'absolute right-2 top-2 z-10'}>
              <Button
                type={'button'}
                onClick={() => onRemove(url)}
                variant={'destructive'}
                size={'icon'}
              >
                <Trash className={'h-4 w-4'} />
              </Button>
            </div>
            <Image
              src={url}
              alt={'Image'}
              fill
              className={'object-cover'}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={'pzdyedvx'}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type={'button'}
              onClick={onClick}
              disabled={disabled}
              variant={'secondary'}
            >
              <ImagePlus className={'mr-2 h-4 w-4'} />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
