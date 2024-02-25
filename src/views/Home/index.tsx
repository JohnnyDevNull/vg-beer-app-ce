import { Button, Checkbox, Link, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Beer } from '../../types';
import styles from './Home.module.css';
import { fetchData } from './utils';

const Home = () => {
  const [loadList, setLoadList] = useState<Boolean>(true);
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [selectedBeersToAdd, setSelectedBeersToAdd] = useState<Array<Beer['id']>>([]);
  const [selectedBeersToRemove, setSelectedBeersToRemove] = useState<Array<Beer['id']>>([]);

  // eslint-disable-next-line
  useEffect(() => {
    if (loadList) {
      fetchData.bind(this, setBeerList)();
      setLoadList(false);
    }
  }, [loadList]);

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
    const beersToRemove: Beer[] = selectedBeersToRemove.map(beerId => beerList.find(beer => beer.id === beerId)).filter(Boolean) as Beer[];
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

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label="Filter..." variant="outlined"/>
                <Button variant="contained" onClick={() => setLoadList(true)}>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      onClick={onBeerCheckboxAddClick.bind(this, beer.id)}
                      checked={selectedBeersToAdd.includes(beer.id)}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className={styles.listFooter}>
                <Button variant="contained" onClick={onSaveClick.bind(this)}>Save Items</Button>
              </div>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant="contained" size="small" onClick={onRemoveAllItemsClicked}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      onClick={onBeerCheckboxRemoveClick.bind(this, beer.id)}
                      checked={selectedBeersToRemove.includes(beer.id)}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
              <div className={styles.listFooter}>
                <Button variant="contained" onClick={onRemoveClick.bind(this)}>Remove Items</Button>
              </div>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
