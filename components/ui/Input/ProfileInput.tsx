import React from 'react';

interface Props {
  area?: 'line' | 'field';
  size: 's' | 'm';
  name?: string;
  value: string;
  type?: 'text' | 'number' | 'password';
  backgroundColor?: true;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

const ProfileInput: React.FC<Props> = ({
  area = 'line',
  type = 'text',
  name,
  size,
  value,
  backgroundColor = false,
  onChange,
}) => {
  return (
    <>
      {area === 'line' && (
        <input
          style={{
            position: 'relative',
            width: `${size === 's' ? '348px' : size === 'm' ? '432px' : ''}`,
            height: `${size === 's' ? '28px' : size === 'm' ? '34px' : ''}`,
            border: '1px solid rgb(210,210,210)',
            borderRadius: `${size === 's' ? '3px' : size === 'm' ? '6px' : ''}`,
            backgroundColor: `${backgroundColor ? 'rgb(248,248,248)' : 'white'
              }`,
          }}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
      {area === 'field' && (
        <textarea
          style={{
            width: '348px',
            height: '56px',
            border: '1px solid rgb(210,210,210)',
            borderRadius: '3px',
            resize: 'none',
          }}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default ProfileInput;
