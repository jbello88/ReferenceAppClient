import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { MdSave } from 'react-icons/md';
import { FileUploader } from './FileUploader';
import { Input } from '../_components';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  slug: Yup.string().required('Slug is required'),
});

export default function PageEdit({ page, setModus }) {
  const updatePageContent = useStoreActions(a => a.pStore.updatePageContent);

  const defaultValues = {
    title: page.title,
    subtitle: page.subtitle,
    slug: page.slug,
    content: page.content,
  };

  const formMethods = useForm({
    defaultValues: defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async data => {
    const para = {
      _id: page._id,
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      ownerName: page.ownerName,
      ownerId: page.ownerId,
    };

    console.log(para);
    await updatePageContent(para);
    setModus('show');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit" className="btn btn-light float-right">
          <MdSave />
        </button>
        <Input name="title" label="Title" formMethods={formMethods} />
        <Input name="slug" label="Slug" formMethods={formMethods} />
        <Input name="subtitle" label="Subtitle" formMethods={formMethods} rows={4} />
        <Input name="content" label="Content entered as markdown" formMethods={formMethods} rows={20} />
      </form>
      <FileUploader className="m-3" />
    </>
  );
}
