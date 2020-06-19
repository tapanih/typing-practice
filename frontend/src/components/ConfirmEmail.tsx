import React from 'react';
import { Redirect } from 'react-router-dom';
import userService from '../services/userService';

export type ConfirmEmailStatus =
  "pending" | "accepted" | "rejected"

interface ConfirmEmailProps {
  match: {
    params: {
      id: string;
    };
  };
}

const ConfirmEmail = ({ match }: ConfirmEmailProps) => {
  const id = match.params.id;
  const [ status, setStatus ] = React.useState<ConfirmEmailStatus>("pending");
  console.log(id);

  React.useEffect(() => {
    const check = async () => {
      try {
        const newStatus = await userService.confirmEmail(id);
        console.log(newStatus)
        if (newStatus === "accepted" || newStatus === "rejected") {
          setStatus(newStatus);
        }
      } catch (e) {
        console.error("Error while confirming email");
      }
    }
    check();
  }, [id]);

  switch (status) {
    case "pending":
      return <div>Loading...</div>;
    case "accepted":
      return <Redirect to="/login" />;
    case "rejected":
      return <div>Invalid confirmation link</div>;
  }
};

export default ConfirmEmail;