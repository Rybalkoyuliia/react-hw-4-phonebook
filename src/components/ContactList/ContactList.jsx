import React from 'react';
import {
  StyledButton,
  StyledContactList,
  StyledContactListItem,
  StyledContactName,
  StyledContactPhone,
  StyledEmptyIdentificatorMessage,
  StyledInfoWrapper,
} from './ContactList.styled';

export const ContactList = ({ list, deleteContact }) => {
  return (
    <StyledContactList>
      {!list?.length ? (
        <StyledEmptyIdentificatorMessage>
          Currently, no contacts in your list
        </StyledEmptyIdentificatorMessage>
      ) : (
        list.map(item => (
          <StyledContactListItem key={item.id}>
            <StyledInfoWrapper>
              <StyledContactName> {item.name}</StyledContactName>
              <StyledContactPhone> {item.number}</StyledContactPhone>
            </StyledInfoWrapper>
            <StyledButton onClick={() => deleteContact(item.id)}>
              Delete
            </StyledButton>
          </StyledContactListItem>
        ))
      )}
    </StyledContactList>
  );
};
