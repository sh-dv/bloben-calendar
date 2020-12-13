import React, {  useEffect, useState } from 'react';
import './notifications.scss';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';


const TaskCard = (props: any) => {
  const { data, setState, title } = props;
  const isDark: boolean = useSelector((state: any) => state.isDark);

  const result: any = []; //renderTasks(data, setState);

  return (
    <div className={'card__wrapper'}>
      <h6 className={`card__title${isDark ? '-dark' : ''}`}>{title}</h6>
      <div className={`card__container${isDark ? '-dark' : ''}`}>{result}</div>
    </div>
  );
};

const NotificationsView = (props: any) => {
  const {
    handleDeleteList,
    handleEditList,
    defaultList,
    params,
    navigateTo,
    upcomingTasks,
    pinnedTasks,
  } = props;

  const isDisabled: boolean = params.listId === defaultList;

  return (
    <div className={'home__wrapper'}>
      {upcomingTasks.length > 0 ? (
        <TaskCard title={'Upcoming'} data={upcomingTasks} />
      ) : null}
      {pinnedTasks.length > 0 ? (
        <TaskCard title={'Favourite'} data={pinnedTasks} />
      ) : null}
    </div>
  );
};

const Notifications = (props: any) => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [pinnedTasks, setPinnedTasks] = useState([]);

  const { handleDeleteList, handleEditList, handleCloseModal } = props;
  const history = useHistory();
  const params = useParams();
  const { tasks, lists, defaultList } = props;

  const navigateTo = (path: string) => {
    handleCloseModal();
    history.push(path);
  };

  useEffect(() => {}, []);

  return (
    <NotificationsView
      params={params}
      defaultList={defaultList}
      navigateTo={navigateTo}
      upcomingTasks={upcomingTasks}
      pinnedTasks={pinnedTasks}
    />
  );
};

export default Notifications;
