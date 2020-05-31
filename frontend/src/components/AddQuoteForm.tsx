import React from 'react';
import { QuoteType } from '../../../backend/src/types';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const AddQuoteForm: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, setValue, handleSubmit, errors } = useForm<QuoteType>();

  const addQuote = async (quote: QuoteType) => {
    try {
      await axios.post<QuoteType>(
        `${apiBaseUrl}/quotes`,
        quote
      );
    } catch (e) {
      console.log("Something went wrong!")
    }
  };

  const onSubmit = handleSubmit((props) => {
    addQuote(props)
  }); 

  return (
    <form onSubmit={onSubmit}>
      <label>Content</label>
      <input name="content" ref={register} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddQuoteForm;