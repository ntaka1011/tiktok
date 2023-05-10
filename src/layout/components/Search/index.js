import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useEffect, useRef, useState } from 'react';

// tự viết
import * as searchService from '~/services/searchService';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';

//css
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Search() {
  const [sreachResult, setSearchResult] = useState([]);
  console.log('🚀 ~ file: index.js:19 ~ Search ~ sreachResult:', sreachResult);
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounceValue = useDebounce(searchValue, 500);
  const inputRef = useRef();
  const handlerChangeValue = (e) => {
    const searchValue = e.target.value;
    if (searchValue.startsWith(' ')) {
      return;
    }
    setSearchValue(e.target.value);
  };

  const handleHideResult = () => {
    setShowResult(false);
  };
  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchService.search(debounceValue);

      // console.log('🚀 ~ file: index.js:42 ~ fetchApi ~ result:', result);
      setSearchResult(result);

      setLoading(false);
    };

    fetchApi();
  }, [debounceValue]);
  return (
    <div>
      <HeadlessTippy
        interactive
        appendTo={() => document.body}
        visible={showResult && sreachResult.length > 0}
        render={(attrs) => (
          <div tabIndex="-1" {...attrs} className={cx('search-result')}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {sreachResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            placeholder="Search accounts and videos"
            spellCheck={false}
            value={searchValue}
            onChange={handlerChangeValue}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button
              className={cx('clear')}
              onClick={() => {
                inputRef.current.focus();
                setSearchValue('');
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
          <button className={cx('search-button')} onMouseDown={(e) => e.preventDefault()}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
