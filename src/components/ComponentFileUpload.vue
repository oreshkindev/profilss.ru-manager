<script lang="ts" setup>
import useFile from '@/composables/files';
// import { useUpload } from '@/stores/useUpload';
import type { File } from '@/types';

import { useApp } from '@/stores';

const store = useApp();

// getting the endpoint from our environment
const api: string = import.meta.env.VITE_HTTP;

interface Props {
  filename?: string;
  accepted: string;
  type: string;
}

interface Emits {
  (event: 'update:file', file: string): void;
}

// forming a file object
const { file, prepareFile }: { file: File; prepareFile: (event: any) => void } = useFile();

// waiting for the props
const props = defineProps<Props>();

// define the event for which we will return the generated data
const emits = defineEmits<Emits>();

// preparing the data to be sent
const prepareFormData = (file: File): FormData => {
  // define the form data
  let formData = new FormData();

  // append the file to the form data with its name and type
  formData.append('file', file.body, `${file.name}.${file.type.toLowerCase()}`);

  return formData;
};

// preparing the file
const prepareUpload = (event: any): void => {
  // pass the event to the handler to generate the file
  prepareFile(event);

  // pass the file to prepare the form data
  let formData = prepareFormData(file);

  // send the file using the store
  store.upload(formData);

  // emit an update event for the file name without the extension
  emits('update:file', file.name);
};
</script>

<template>
  <label v-on:change="prepareUpload">
    <template v-if="props.type === 'image' && file.blob">
      <img :src="file.blob" alt="" />
    </template>

    <template v-else-if="props.type === 'image' && props.filename !== ''">
      <img :src="`${api}/out/${props.filename}.webp`" alt="" />
    </template>

    <template v-else-if="props.type === 'video' && file.blob">
      <video autoplay loop :poster="file.blob">
        <source :src="file.blob" />
        Your browser does not support the video tag.
      </video>
    </template>

    <template v-else-if="props.type === 'video' && props.filename !== ''">
      <video autoplay loop>
        <source :src="`${api}/media/${props.filename}.mp4`" />
        Your browser does not support the video tag.
      </video>
    </template>

    <p v-else>Прикрепить {{ props.type === 'image' ? 'изображение' : 'видео' }}</p>

    <input name="file" type="file" :accept="props.accepted" />
  </label>
</template>

<style lang="scss" scoped>
span {
  color: #cccccc;
  display: block;
  padding: 20px 0 0;
}

label {
  border: 1px dashed #cccccc;

  cursor: pointer;

  display: grid;
  place-items: center;

  &:hover {
    background-color: #f8fafc;
  }

  img {
    height: 250px;
    object-fit: contain;
    width: 100%;
  }

  video {
    max-width: 400px;
  }

  p {
    padding: 80px;
  }

  input {
    display: none;
  }
}
</style>
