import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import { MdSave } from 'react-icons/md';
import { FileUploader } from './FileUploader';
import { Input, Submit, Confirmation, UserMatchOrAdmin } from '../_components';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  slug: Yup.string().required('Slug is required'),
});

export default function PageEdit() {
  const user = useStoreState(state => state.aStore.account);
  const updatePageContent = useStoreActions(a => a.pStore.updatePageContent);
  const deletePage = useStoreActions(a => a.pStore.deletePage);
  const page = useStoreState(state => state.pStore.page);
  const history = useHistory();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const defaultValues = {
    title: page?.title,
    subtitle: page?.subtitle,
    slug: page?.slug,
    content: page?.content,
  };

  const formMethods = useForm({
    defaultValues: defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, formState } = formMethods;
  const { isDirty } = formState;
  console.log('DEBUG : PageEdit -> isDirty', isDirty);

  console.log('RERENDER');

  const onSubmit = async data => {
    console.log('Submittingh');
    const para = {
      _id: page._id,
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      ownerName: page.ownerName,
      ownerId: page.ownerId,
    };

    await updatePageContent(para);
    history.push(`/topic/show/${data.slug}`);
  };

  const handleDelete = () => {
    if (showDeleteConfirmation) return;
    setShowDeleteConfirmation(true);
  };

  const handleDeleteResponse = async resp => {
    if (resp) {
      await deletePage(page);
      history.push('/content');
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancel = () => {
    if (showCancelConfirmation) return;
    if (!isDirty) {
      history.push(`/topic/show/${page?.slug}`);
      return;
    }
    setShowCancelConfirmation(true);
  };

  const handleCancelResponse = resp => {
    console.log('DEBUG : PageEdit -> resp', resp);
    if (resp) {
      // discard changes
      history.push(`/topic/show/${page?.slug}`);
    }
    setShowCancelConfirmation(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="title" label="Title" formMethods={formMethods} />
        <Input name="slug" label="Slug" formMethods={formMethods} />
        <Input name="subtitle" label="Subtitle" formMethods={formMethods} rows={4} />
        <Input name="content" label="Content entered as markdown" formMethods={formMethods} rows={20} />
        <Submit label="Save" formMethods={formMethods}>
          <button type="button" onClick={handleCancel} className="button is-link is-light level-item">
            Cancel
          </button>
          <UserMatchOrAdmin user={user} id={page?.ownerId} posright="true">
            <button type="button" onClick={handleDelete} className="button is-link is-light level-item">
              Delete
            </button>
          </UserMatchOrAdmin>
        </Submit>
      </form>
      <FileUploader className="m-3" />

      <Confirmation isShown={showDeleteConfirmation} callback={handleDeleteResponse} title="Confirm Delete">
        <div>Do your really want do delete this page?</div>
      </Confirmation>

      <Confirmation isShown={showCancelConfirmation} callback={handleCancelResponse} title="Unsaved Changes">
        <div>
          You have made changes to this page. <br />
          These changes have not been saved yet. <br />
          Do you want to discard them?
        </div>
      </Confirmation>
    </>
  );
}
