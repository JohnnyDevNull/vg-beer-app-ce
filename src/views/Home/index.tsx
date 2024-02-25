import { Button, Checkbox, Link, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Beer } from '../../types';
import styles from './Home.module.css';
import { fetchData, searchData } from './utils';

const Home = () => {
  const [loadList, setLoadList] = useState<Boolean>(true);
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [selectedBeersToAdd, setSelectedBeersToAdd] = useState<Array<Beer['id']>>([]);
  const [selectedBeersToRemove, setSelectedBeersToRemove] = useState<Array<Beer['id']>>([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (loadList) {
      fetchData.bind(this, setBeerList)();
      setLoadList(false);
    }
  }, [loadList]);

  useEffect(() => {
    if (!loadList && filterValue) {
      const handle = setTimeout(() => searchData.bind(this, setBeerList, filterValue)(), 250);
      return () => clearTimeout(handle);
    }
  }, [loadList, filterValue]);

  useEffect(() => {
    const savedItemsData = localStorage.getItem('savedItems');
    if (savedItemsData) {
      setSavedList(JSON.parse(savedItemsData));
    }
  }, []);

  const onBeerCheckboxAddClick = (beerId: string) => {
    setSelectedBeersToAdd(prevState => prevState.includes(beerId)
      ? prevState.filter(v => v !== beerId)
      : [...prevState, beerId]
    );
  };

  const onBeerCheckboxRemoveClick = (beerId: string) => {
    setSelectedBeersToRemove(prevState => prevState.includes(beerId)
      ? prevState.filter(v => v !== beerId)
      : [...prevState, beerId]
    );
  };

  const onSaveClick = () => {
    const beersToAdd: Beer[] = selectedBeersToAdd.map(beerId => beerList.find(beer => beer.id === beerId)).filter(Boolean) as Beer[];
    setSavedList(prevState => {
      const newState = [...prevState];
      for(const beerToAdd of beersToAdd) {
        if (newState.findIndex(beer => beer.id === beerToAdd.id)) {
          newState.push(beerToAdd);
        }
      }
      localStorage.setItem('savedItems', JSON.stringify(newState));
      return newState;
    });
    setSelectedBeersToAdd([]);
  };

  const onRemoveClick = () => {
    const beersToRemove: Beer[] = selectedBeersToRemove.map(beerId => savedList.find(beer => beer.id === beerId)).filter(Boolean) as Beer[];
    setSavedList(prevState => {
      const newState = [...prevState];
      for(const beerToRemove of beersToRemove) {
        const index = prevState.findIndex(beer => beer.id === beerToRemove.id);
        if (index !== -1) {
          newState.splice(index, 1);
        }
      }
      localStorage.setItem('savedItems', JSON.stringify(newState));
      return newState;
    });
    setSelectedBeersToRemove([]);
  };


  const onRemoveAllItemsClicked = () => {
    localStorage.removeItem('savedItems');
    setSavedList([])
  }

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  }

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField
                  label="Filter..."
                  variant="outlined"
                  value={filterValue}
                  onChange={onFilterChange}
                  data-cy="list-filter-input" />
                <Button
                  variant="contained"
                  onClick={() => setLoadList(true)}
                  data-cy="list-reload-btn"
                >
                  Reload list
                </Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      onClick={onBeerCheckboxAddClick.bind(this, beer.id)}
                      checked={selectedBeersToAdd.includes(beer.id)}
                      data-cy="beer-list-chk"
                    />
                    <Link
                      component={RouterLink}
                      to={`/beer/${beer.id}`}
                      data-cy="beer-list-link"
                    >
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className={styles.listFooter}>
                <Button
                  variant="contained"
                  onClick={onSaveClick.bind(this)}
                  data-cy="beer-list-save-btn"
                >
                  Save Items
                </Button>
              </div>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button
                  variant="contained"
                  size="small"
                  onClick={onRemoveAllItemsClicked}
                  data-cy="remove-all-items-btn"
                >
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      onClick={onBeerCheckboxRemoveClick.bind(this, beer.id)}
                      checked={selectedBeersToRemove.includes(beer.id)}
                      data-cy="favorite-list-chk"
                    />
                    <Link
                      component={RouterLink}
                      to={`/beer/${beer.id}`}
                      data-cy="favorite-list-link"
                    >
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
              <div className={styles.listFooter}>
                <Button
                  variant="contained"
                  onClick={onRemoveClick.bind(this)}
                  data-cy="remove-items-btn"
                >
                  Remove Items
                </Button>
              </div>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
