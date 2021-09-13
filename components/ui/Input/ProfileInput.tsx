import React from 'react';

interface Props {
  size: 's' | 'm';
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

const ProfileInput: React.FC<Props> = ({ size, value, onChange }) => {
  return (
    <div>
      {size === 's' && (
        <input
          style={{
            width: '348px',
            height: '28px',
            border: '1px solid rgb(210,210,210)',
            borderRadius: '3px',
          }}
          type="text"
          value={value}
          onChange={onChange}
        />
      )}
      {size === 'm' && (
        <textarea
          style={{
            width: '348px',
            height: '56px',
            border: '1px solid rgb(210,210,210)',
            borderRadius: '3px',
          }}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default ProfileInput;
