import React from 'react';
import { QuoteType } from '../../../backend/src/types';
import { useForm } from 'react-hook-form';
import { useStateValue, logout } from '../state';
import quoteService from '../services/quoteService';

const AddQuoteForm: React.FC = () => {
  const [state, dispatch ] = useStateValue();
  const { register, handleSubmit } = useForm<QuoteType>();

  const addQuote = async (quote: QuoteType) => {
    if (state.user === null) {
      return;
    }
    try {
      await quoteService.addQuote(quote);
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logout());
      }
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