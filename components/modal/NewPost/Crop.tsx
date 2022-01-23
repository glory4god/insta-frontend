/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { containerClasses } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectNewPost,
  updateCroppedImage,
  updateCroppedAreaPixel
} from 'lib/redux/newPost/newPostSlice';

import s from '../CommonModal.module.scss';
import { UserInfo } from 'components/profile';
import classNames from 'classnames';

interface CropProps {
  image: string,
  id: number,
}

const Crop = ({ image, id }: CropProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [zoomButton, setZoomButton] = useState<boolean>(false);
  const newPostData = useSelector(selectNewPost);
  const zoomRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    dispatch(updateCroppedAreaPixel({ ...croppedAreaPixels, id: id }));
    showCroppedImage(croppedAreaPixels);
  }, [])

  const showCroppedImage = async (croppedAreaPixels: any) => {
    const croppedImage = await getCroppedImg(
      image,
      croppedAreaPixels
    );
    dispatch(updateCroppedImage({ id: id, croppedImage: croppedImage }));
  }

  useEffect(() => {
    // postState content => crop 으로 돌아왔을 때 cropped 상태 유지 필요
    dispatch(updateCroppedImage({ id: id, croppedImage: image }));
  }, [dispatch, id, image]);

  function clickClopEvent(event: { target: any; currentTarget: { querySelector: (arg0: string) => { (): any; new(): any; querySelectorAll: { (arg0: string): any; new(): any; }; }; }; }) {
    var target = event.target;
    console.log(target, zoomRef.current)

    if (zoomButton === false)
      return;

    if (target === zoomRef.current)
      return;
    setZoomButton(false);
  }

  // function clickClopEvent2(event: { target: any; currentTarget: { querySelector: (arg0: string) => { (): any; new(): any; querySelectorAll: { (arg0: string): any; new(): any; }; }; }; }) {
  //   var target = event.target;
  //   console.log(target, zoomRef.current)

  //   if (imageControl === false)
  //     return;

  //   if (target === zoomRef.current)
  //     return;
  //   setImageControl(false);
  // }

  return (
    <div onClick={clickClopEvent}>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={4 / 4}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        initialCroppedAreaPixels={newPostData[newPostData.findIndex((element, index, arr) => element.id === id)].exist ?
          newPostData[newPostData.findIndex((element, index, arr) => element.id === id)].croppedAreaPixel : null}
        style={{ containerStyle: containerStyle, mediaStyle: mediaStyle, cropAreaStyle: cropAreaStyle }}
      />
      <div style={{ position: 'absolute', bottom: '0', left: '0', padding: '8px' }} role="button">
        <div>
          {zoomButton &&
            <div>
              <div style={{ height: '32px', width: '132px' }}>
                <div>
                  <div style={{ width: '100%' }}>
                    <input
                      ref={zoomRef}
                      style={{ backgroundImage: 'linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%)' }}
                      type="range"
                      min={1}
                      max={2}
                      step={0.1}
                      value={zoom}
                      onChange={(e: { target: { value: string } }) => {
                        setZoom(parseFloat(e.target.value))
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          <div className={s.zoomButtonWrap} onClick={() => setZoomButton(true)}>
            <div>
              <button className={s.zoomButton} type="button">
                <div>
                  <svg aria-label="확대/축소 선택" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16">
                    <path d="M22.707 21.293l-4.825-4.825a9.519 9.519 0 10-1.414 1.414l4.825 4.825a1 1 0 001.414-1.414zM10.5 18.001a7.5 7.5 0 117.5-7.5 7.509 7.509 0 01-7.5 7.5zm3.5-8.5h-2.5v-2.5a1 1 0 10-2 0v2.5H7a1 1 0 100 2h2.5v2.5a1 1 0 002 0v-2.5H14a1 1 0 000-2z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const containerStyle = {
  height: 'calc(100% - 57px)',
  transform: 'translateY(57px)',
}

const mediaStyle: any = {
  color: 'rgba(0, 0, 0, 0)',
  // height: '100%',
  // width: '100%',
  objectFit: 'contain',
}

const cropAreaStyle = {
  color: 'rgba(0, 0, 0, 0)',
  // height: '100%',
  // width: '100%',
}

export default React.memo(Crop);