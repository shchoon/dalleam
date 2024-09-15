import React from 'react';
import Image from 'next/image';
import DefaultProfile from '/public/icons/DefaultProfile.svg';
import DefaultMyProfile from '/public/icons/DefaultMyProfile.svg';

type Props = {
  image: null | string;
  usedIn: 'navbar' | 'container' | 'myPage';
};

export default function Profile({ image, usedIn }: Props) {
  const profileSettings = {
    navbar: {
      DefaultComponent: DefaultProfile,
      className: 'w-42pxr h-40pxr',
      width: 40,
      height: 40,
      testId: 'defaultProfile',
    },
    container: {
      DefaultComponent: DefaultProfile,
      className: 'size-29pxr',
      width: 29,
      height: 29,
      testId: 'defaultProfile',
    },
    myPage: {
      DefaultComponent: DefaultMyProfile,
      className: 'size-14',
      width: 56,
      height: 56,
      testId: 'myPageDefaultProfile',
    },
  };

  const { DefaultComponent, className, width, height, testId } = profileSettings[usedIn];

  return image === null ? (
    <DefaultComponent data-testid={testId} className={className} />
  ) : (
    <Image
      className={`rounded-full ${className}`}
      src={image}
      width={width}
      height={height}
      alt="profile"
    />
  );
}
