import React, {useEffect, useState } from 'react';
import './carousel.scss';
import { useCurrentWidth } from 'bloben-common/utils/layout';
import EvaIcons from 'bloben-common/components/eva-icons';

const SCREEN_PORTION: number = 6;

const Carousel = (props: any) => {
  const [swipeAnimation, setSwipeAnimation] = useState('');
  const {  onPageChange } = props;
  const baseWidth: number = useCurrentWidth();
  const [isSwiping, setSwiping] = useState(0);
  const [initTouchX, setInitTouchX] = useState(0);
  const [initTouchY, setInitTouchY] = useState(0);

  const [touchDiff, setTouchDiff] = useState(0);
  const [yPosition, setYPosition] = useState(0);

  const OFFSET_FOR_TRIGGER: number = baseWidth / SCREEN_PORTION;

  // Scroll to middle screen
  useEffect(() => {
    // @ts-ignore
    document.getElementById('carousel').scrollTo(baseWidth / 2, 0);
  }, []);

  const handleTouchStart = (e: any) => {
    const touchEventX = e.nativeEvent.touches[0].clientX;
    const touchEventY = e.nativeEvent.touches[0].clientY;

    // Set initial touch point
    // setXBase(touchEventX);
    setInitTouchX(touchEventX);
    setInitTouchY(touchEventY);
  };
  const handleTouchEnd = () => {
    // Going forward
    if (touchDiff > OFFSET_FOR_TRIGGER) {
      onPageChange(true);
      setSwipeAnimation('carousel-swipe-right');
      // scrollBack();
    } else if (touchDiff * -1 > OFFSET_FOR_TRIGGER) {
      // Going back
      setSwipeAnimation('carousel-swipe-left');
      onPageChange(false);
      // scrollBack();
    } else {
      // Revert to base position
      // scrollBack();
    }
    setTouchDiff(0);
    setSwiping(0);
    setYPosition(0);
  };
  const handleMove = (e: any) => {
    // Handle touch events
    const touchEventX: number = e.nativeEvent.touches[0].clientX;
    const touchEventY: number = e.nativeEvent.touches[0].clientY;

    const differenceInTouch: number = initTouchX - touchEventX;

    if (
      (differenceInTouch > 0 && differenceInTouch > 20) ||
      (differenceInTouch < 0 && differenceInTouch < -20)
    ) {
      setTouchDiff(differenceInTouch);
      setSwiping(differenceInTouch);
    }
  };

  const baseStyleRight: any = {
    width: '100%',
    height: '100%',
    zIndex: 9999,
    position: 'fixed',
  };

  return (
    <div
      onTouchMove={handleMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`carousel__wrapper ${swipeAnimation}`}
      id={'carousel'}
    >
      {props.children}
      {isSwiping > 0 ? (
        <div className={'carousel__control-right'} style={baseStyleRight}>
          <EvaIcons.ChevronRight className={'svg-icon'} />
        </div>
      ) : null}
      {isSwiping < 0 ? (
        <div className={'carousel__control-left'} style={baseStyleRight}>
          <EvaIcons.ChevronLeft
            className={'svg-icon'}
            style={{ width: 50, height: 50 }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Carousel;
