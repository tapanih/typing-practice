import React from 'react';
import { QuoteType } from '../../../backend/src/types';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

const AddQuoteForm: React.FC = () => {
  const [state, ] = useStateValue();
  const { register, handleSubmit } = useForm<QuoteType>();

  const addQuote = async (quote: QuoteType) => {
    if (state.user === null) {
      return;
    }
    try {
      await axios.post<QuoteType>(
        `${apiBaseUrl}/quotes`,
        quote,
        { headers: { Authorization: `Bearer ${state.user.token}` }}
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