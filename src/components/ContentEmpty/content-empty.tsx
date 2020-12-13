import React from 'react';
import TasksEmpty from 'assets/done.svg';
import './content-empty.scss';

const TasksImage = () => (
  <img className={'content_empty__image'} src={TasksEmpty} alt={'empty'} />
);

const getImage = (screen: string) => {
  switch (screen) {
    case 'tasks':
      return <TasksImage />;
  }
};

const ContentEmptyView = (props: any) => {
  const { screen, text } = props;
  const image = getImage(screen);

  return (
    <div className={'content_empty__wrapper'}>
      {image}
      <p className={'content_empty__title'}>{text}</p>
    </div>
  );
};

const ContentEmpty = (props: any) => {
  const { screen, text } = props;

  return <ContentEmptyView screen={screen} text={text} />;
};

export default ContentEmpty;
