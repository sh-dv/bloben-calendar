import React, { useEffect, useState } from 'react';
import './carousel.scss';
import { useCurrentWidth } from 'bloben-common/utils/layout';

export const CAROUSEL_MAX_LENGTH: number = 5;

const CarouselTest = (props: any) => {
  const { children, onPageChange } = props;
  const baseWidth: number = useCurrentWidth();
  const [initTouchX, setInitTouchX] = useState(0);
  const [xBase, setXBase] = useState(0);
  const [touchDiff, setTouchDiff] = useState(0);

  const wrapperStyle: any = {
    // width: baseWidth * 3,
  };

  // Scroll to middle screen
  useEffect(() => {
    // @ts-ignore
    document.getElementById('carousel').scrollTo(baseWidth, 0);
  }, []);

  // Scroll to prev element on shift action
  useEffect(() => {
    // @ts-ignore
    if (props.children.length === CAROUSEL_MAX_LENGTH) {
      // @ts-ignore
      document
        .getElementById('carousel')
        .scrollTo(baseWidth * props.children.length, 0);
    }
  }, [props.children.length]);

  const handleTouchStart = (e: any) => {
    const touchEventX = e.nativeEvent.touches[0].clientX;
    // Set initial touch point
    setXBase(touchEventX);
    setInitTouchX(touchEventX);
  };
  const handleTouchEnd = () => {
    if (touchDiff > baseWidth / 2) {
      onPageChange(true);
      // @ts-ignore
      document.getElementById('carousel').scrollTo({
        left: baseWidth * 3,
        behavior: 'smooth',
      });
    } else if (touchDiff * -1 > baseWidth / 2) {
      // Going back
      onPageChange(false);
      // @ts-ignore
      document.getElementById('carousel').scrollTo({
        left: baseWidth,
        behavior: 'smooth',
      });
    } else {
      // Revert to base position
      // @ts-ignore
      document
        .getElementById('carousel')
        .scrollTo({ left: baseWidth, behavior: 'smooth' });
    }
  };
  const handleMove = (e: any) => {
    // Handle touch events
    const touchEventX: number = e.nativeEvent.touches[0].clientX;
    const newTouchEventX: number = touchEventX;
    const differenceInTouch: number = initTouchX - touchEventX;
    setTouchDiff(differenceInTouch);

    const newXValue: number = xBase + differenceInTouch;

    // Prevent scrolling over bottom 0
    // setXBase(newXValue);
  };

  return (
    <div
      onTouchMove={handleMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={wrapperStyle}
      className={`carousel__wrapper`}
      id={'carousel'}
    >
      {props.children}
    </div>
  );
};

export default CarouselTest;
