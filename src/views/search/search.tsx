import React, {  useEffect, useState } from 'react';
import './search.scss';
import { compareWords } from '../../bloben-package/utils/search';
import Input from '../../components/input';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EvaIcons from '../../bloben-common/components/eva-icons';
import SearchImg from 'assets/search.svg';
import { useSelector } from 'react-redux';
import EventStateEntity from '../../data/entities/state/event.entity';
import { mapEventsToDates } from '../../utils/common';
import { formatTimestampToDate } from '../../components/calendar-view/calendar-common';
import { renderAgendaEvents } from '../../components/calendar-view/agenda/agenda';
import { useCurrentHeight } from '../../bloben-common/utils/layout';
import { sendWebsocketMessage, WEBSOCKET_GET_ALL_EVENTS } from '../../api/calendar';
import { formatISO } from 'date-fns';

const SearchImage = () => (
  <div className={'search_empty__wrapper'}>
    <img className={'search__image'} src={SearchImg} alt={'empty'} />
  </div>
);


const Results = (props: any) => {
  const { results, } = props;
  const isDark: boolean = useSelector((state: any) => state.isDark);
  const height: number = useCurrentHeight() - 56;

  const emptyFunc: any = () => {};

  const renderedResults: any = renderAgendaEvents(results, isDark, emptyFunc, emptyFunc);

  return <div className={'search__container-results'} style={{height}}>{renderedResults}</div>;
};

const SearchInput = (props: any) => {
  const { typedText, onChange } = props;

  const isMobile: boolean = useSelector((state: any) => state.isMobile);
  const isDark: boolean = useSelector((state: any) => state.isDark);

  return (
    <div className={'search__input-wrapper'}>
      <Input
        className={`search__input${isDark ? '-dark' : ''}`}
        placeholder={'Search'}
        autoFocus={isMobile}
        name={'name'}
        autoComplete={'off'}
        value={typedText}
        onChange={onChange}
        multiline={false}
      />
    </div>
  );
};

const SearchHeader = (props: any) => {
  const { typedText, onSearchInput, handleClearSearch, goBack } = props;
  const isMobile: boolean = useSelector((state: any) => state.isMobile);
  const isDark: boolean = useSelector((state: any) => state.isDark);

  return (
    <div className={'search__header-container'}>
      <IconButton
          onClick={goBack}
          className={`${isMobile ? '' : 'small-icon-button'}`}
      >
        <EvaIcons.ArrowBack
            className={`icon-svg${isDark ? '-dark' : ''} ${
                !isMobile ? 'small-svg' : ''
            }`}
        />
      </IconButton>
      <SearchInput typedText={typedText} onChange={onSearchInput} />
      {typedText ? (
        <IconButton
          onClick={handleClearSearch}
          className={`${isMobile ? '' : 'small-icon-button'}`}
        >
          <EvaIcons.Cross
            className={`icon-svg${isDark ? '-dark' : ''} ${
              !isMobile ? 'small-svg' : ''
            }`}
          />
        </IconButton>
      ) : (
        <IconButton
          disabled={true}
          className={`${isMobile ? '' : 'small-icon-button'}`}
        >
          <EvaIcons.Search
            className={`icon-svg${isDark ? '-dark' : ''} ${
              !isMobile ? 'small-svg' : ''
            }`}
          />
        </IconButton>
      )}
    </div>
  );
};

const MobileView = (props: any) => {
  const { results } = props;

  const length: number = Object.keys(results).length

  return length > 0 ? (
    <Results results={results}/>
  ) : (
    <SearchImage />
  );
};
const DesktopView = (props: any) => {
  const { results, setState, mappedTags } = props;

  return results.length > 0 ? (
    <Results results={results} setState={setState} mappedTags={mappedTags} />
  ) : null;
};
const SearchView = (props: any) => {
  const {
    typedText,
    results,
    setState,
    goBack,
    onSearchInput,
    handleClearSearch,
  } = props;
  const isMobile: boolean = useSelector((state: any) => state.isMobile);

  return (
    <div className={'search__wrapper'}>
      <SearchHeader
        typedText={typedText}
        onSearchInput={onSearchInput}
        handleClearSearch={handleClearSearch}
        goBack={goBack}
      />

      {isMobile ? (
        <MobileView
          results={results}
          setState={setState}
        />
      ) : (
        <DesktopView
          results={results}
          setState={setState}
        />
      )}
    </div>
  );
};


const Search = (props: any) => {
  const {
    goBack,
  } = props;
  const allEvents: any = useSelector((state: any) => state.allEvents);
  const eventsLastSynced: Date = useSelector((state: any) => state.eventsLastSynced);

  const [typedText, setTypedText] = useState('');
  const [results, setResults]: any = useState([]);
  const [mappedEvents, setMappedEvents] = useState({});

  useEffect(() => {
    const result: any = mapEventsToDates(allEvents);

    if (result) {
      setMappedEvents(result);
    }

  },        [allEvents.toString()])

  /**
   * Get changes in allEvents on mount
   */
  useEffect(() => {
    sendWebsocketMessage(WEBSOCKET_GET_ALL_EVENTS, {lastSync: eventsLastSynced ? eventsLastSynced.toISOString() : null})
  }, [])

  const onSearchInput = (event: any) => {
    setTypedText(event.target.value)
  };

  const handleClearSearch = () => {
      setTypedText('')
      setResults([])
  };

  useEffect(() => {
    if (typedText.length < 1) {
      setResults([]);

      return;
    }
    const foundItems: any[] = search(typedText);

    setResults(foundItems);
  }, [typedText]);

  const search = (keyWord: string) => {
    const result: any = {};

    for (const [key, value] of Object.entries(mappedEvents)) {
      for (const item of value as any) {
        const {startAt, text, location, notes} = item;

        if (text.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1 ||
            location.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1 ||
            notes.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1) {

          const dateKey: string = formatTimestampToDate(startAt);

          if (result[dateKey] === undefined) {
            result[formatTimestampToDate(startAt)] = [item];
          } else {
            result[formatTimestampToDate(startAt)].push(item);
          }
        }
      }
    }

    return result;
  };

  const handleClearText = () => {
    setTypedText('');
    setResults([]);
  };



  return (
    <SearchView
      typedText={typedText}
      results={results}
      goBack={goBack}
      onSearchInput={onSearchInput}
      handleClearSearch={handleClearSearch}
      handleClearText={handleClearText}
    />
  );
};

export default Search;
