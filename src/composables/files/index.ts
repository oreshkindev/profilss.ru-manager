import type { File } from '@/types';
import { reactive } from 'vue';

export default function () {
  const file = reactive<File>({ body: '', blob: '', name: '', size: '', type: '' });

  const prepareFile = (event: any) => {
    file.body = event.target.files[0];
    file.blob = URL.createObjectURL(file.body);

    file.name = file.blob.split('/').pop() as string;

    file.size = file.body.size;
    file.type = file.body.name.split('.').pop();

    setTimeout(() => URL.revokeObjectURL(file.blob), 1000);
  };
  return {
    file,
    prepareFile
  };
}
