import React, { useEffect } from 'react';
import AuthenticatedLayer from 'layers/authenticated-layer';
import { useCurrentHeight, useCurrentWidth } from 'bloben-common/utils/layout';
import { useHistory } from 'react-router';
import Axios from 'bloben-common/utils/axios';
import LoadingScreen from '../bloben-common/components/loading-screen/loading-screen';
import { changeTheme } from '../bloben-package/utils/change-theme';
import AnonymView from '../bloben-package/layers/anonym-layer';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCalendarBodyHeight,
    setCalendarBodyWidth,
    setIsAppStarting,
    setIsMobile,
} from '../redux/actions';
import {
    CALENDAR_DRAWER_DESKTOP_WIDTH,
    CALENDAR_OFFSET_LEFT, HEADER_HEIGHT_BASE, HEADER_HEIGHT_BASE_DESKTOP, NAVBAR_HEIGHT_BASE
} from '../components/calendar-view/calendar-common';
import { logOut } from '../bloben-package/utils/logout';
import { logger } from '../bloben-package/utils/common';
import axios from 'axios';
import GeneralApi from '../bloben-common/api/general.api';
import { MOBILE_MAX_WIDTH } from '../bloben-common/utils/common';

const StoreLayer = (props: any) => {
    const { initPath } = props;

    // Hooks
    const height = useCurrentHeight();
    const width = useCurrentWidth();
    const dispatch: any = useDispatch();

    // Redux selectors
    const cryptoPassword: string = useSelector((state: any) => state.cryptoPassword);
    const isAppStarting: boolean = useSelector((state: any) => state.isAppStarting);
    const isDark: boolean = useSelector((state: any) => state.isDark);
    const username: string = useSelector((state: any) => state.username);
    const isLogged: boolean = useSelector((state: any) => state.isLogged);

    /**
     * Set mobile/desktop layout
     */
    useEffect(() => {
        // tslint:disable-next-line:no-magic-numbers
        if (width < MOBILE_MAX_WIDTH) {
            dispatch(setIsMobile(true))
            dispatch(setCalendarBodyWidth(width - CALENDAR_OFFSET_LEFT))
            dispatch(setCalendarBodyHeight(height - HEADER_HEIGHT_BASE - NAVBAR_HEIGHT_BASE))
        } else {
            dispatch(setIsMobile(false))
            dispatch(setCalendarBodyWidth(width - CALENDAR_OFFSET_LEFT - CALENDAR_DRAWER_DESKTOP_WIDTH))
            dispatch(setCalendarBodyHeight(height - HEADER_HEIGHT_BASE_DESKTOP))
        }
    }, [width, isAppStarting]);

    /*
     * Add listener for preferred color theme
     */
    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addListener(async (e) => {
            // First check if system settings for theme are set
            // TODO GET THEME FROM STORE

            // if (theme.value !== 'system') {
            //     return;
            // }
            if (e.matches) {
                // Dark
                await changeTheme('dark', dispatch);
            } else {
                // Light
                await changeTheme('light', dispatch);
            }
        });
    }, []);

    useEffect(() => {
        GeneralApi.sendVisit(width < MOBILE_MAX_WIDTH, (username !== null || username !== '') && username.length > 1)
    }, [])

    /*
     * First initialization of app
     * Try to load user from database or load remote with saved session
     */
    useEffect(() => {
        // Init authentication
        const initApp: any = async () => {
            dispatch(setIsAppStarting(true))

            // Username is in store
            if (username) {
                // Try to compare userData with server
                try {
                    const userData: any = (await Axios.get('/user/account')).data;

                    // TODO CHECK if while offline it doesn't delete database
                    if (
                        (userData.username && userData.username !== username) ||
                        !userData.username
                    ) {

                        // Different user, destroy prev user
                        // TODO CLEAR REDUX
                        // logOut(dispatch)
                        dispatch(setIsAppStarting(false))
                    }
                } catch (error) {
                    logger(error);
                }
            } else {
                dispatch(setIsAppStarting(false))
            }
        };

        initApp();
    }, []);


    // Verify authentication
    const isAuthenticated: boolean =
        isLogged && username.length > 1 && cryptoPassword.length > 1;

    // TODO PIN code
    const needPinCode: boolean = false;

    return (
        <div className={`root__wrapper${isDark ? '-dark' : ''}`}>
    {isAuthenticated ? (
        <AuthenticatedLayer initPath={initPath} />
    ) : needPinCode ? (
        <AuthenticatedLayer initPath={initPath} />
    ) : (
        <AnonymView />
    )}
    {isAppStarting ? <LoadingScreen /> : null}
    </div>
);
};

export default StoreLayer;
