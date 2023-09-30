'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

import Heading from '@components/ui/Heading';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { Input } from '@components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@components/ui/form';
import AlertModal from '@components/modals/AlertModal';

const formSchema = z.object({
  name: z.string().min(1).max(255),
  value: z.string().min(4).regex(/^#/, {
    message: 'Color value must be a valid hex code.'
  })
});

type ColorFormValues = z.infer<typeof formSchema>;

type ColorFormProps = {
  initialData: Color | null;
};

export default function ColorForm({ initialData }: ColorFormProps) {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Color' : 'Create Color';
  const description = initialData ? 'Edit a Color' : 'Add a new Color';
  const toastMsg = initialData ? 'Color Updated' : 'Color Created';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: ''
    }
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMsg);
    } catch (err) {
      toast.error('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success('Color deleted successfully.');
    } catch (err) {
      toast.error(
        'Make sure to remove all products using this color before deleting it.'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className={'flex items-center justify-between'}>
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={loading}
            variant={'destructive'}
            color={'sm'}
            onClick={() => setOpen(true)}
          >
            <Trash className={'h-4 w-4'} />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={'w-full space-y-8'}
        >
          <div className={'grid grid-cols-3 gap-8'}>
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={'Color name'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'value'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className={'flex items-center gap-x-4'}>
                      <Input
                        disabled={loading}
                        placeholder={'Color value'}
                        {...field}
                      />
                      <div
                        className={'rounded-full border p-4'}
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className={'ml-auto'}
            type={'submit'}
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
