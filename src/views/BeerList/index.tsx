import Clear from '@mui/icons-material/Clear';
import SportsBar from '@mui/icons-material/SportsBar';
import {
  Avatar,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beer } from '../../types';
import styles from './BeerList.module.css';
import { IListFilter, IMetaDataResponse } from './types';
import { fetchData } from './utils';

const initialFilter: IListFilter = {
  name: '',
  city: '',
  state: '',
  postal: '',
  type: '',
  sort: 'asc',
  page: 1
};

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [metaData, setMetaData] = useState<IMetaDataResponse>({
    total: 0,
    page: 1,
    per_page: 10
  });
  const [listFilter, setListFilter] = useState<IListFilter>({...initialFilter})

  const pageCount = Math.ceil(metaData.total / 10);

  useEffect(() => {
    const handle = setTimeout(() => fetchData.bind(this, setBeerList, setMetaData, listFilter)(), 250);
    return () => clearTimeout(handle);
  }, [listFilter]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setListFilter(prevState => ({...prevState, page}));
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, key: string) => {
    setListFilter(prevState => ({...prevState, [key]: event.target.value}));
  }

  const onSelectFieldChange = (event: SelectChangeEvent, key: string) => {
    setListFilter(prevState => ({...prevState, [key]: event.target.value}))
  }

  const onFilterClear = () => {
    setListFilter({...initialFilter});
  }

  return (
    <article>
      <section>
        <header data-cy="beer-list-header">
          <h1>BeerList page</h1>
        </header>
        <main>
          <div className={styles.listHeader}>
            <TextField
              label="Name"
              variant="outlined"
              value={listFilter.name}
              onChange={(event) => onTextFieldChange(event, 'name')}
              data-cy="filter-name-input" />
            <TextField
              label="City"
              variant="outlined"
              value={listFilter.city}
              onChange={(event) => onTextFieldChange(event, 'city')}
              data-cy="filter-city-input" />
            <TextField
              label="State"
              variant="outlined"
              value={listFilter.state}
              onChange={(event) => onTextFieldChange(event, 'state')}
              data-cy="filter-state-input" />
            <TextField
              label="Postal"
              variant="outlined"
              value={listFilter.postal}
              onChange={(event) => onTextFieldChange(event, 'postal')}
              data-cy="filter-postal-input" />

            <div className={styles.typeFormControlWrapper}>
            <FormControl fullWidth>
              <InputLabel id="filter-type-select-label">Type</InputLabel>
              <Select
                labelId="filter-type-select-label"
                id="filter-type-select"
                value={listFilter.type}
                label="Type"
                onChange={(event) => onSelectFieldChange(event, 'type')}
                data-cy="filter-type-select"
              >
                <MenuItem value="micro">micro</MenuItem>
                <MenuItem value="nano">nano</MenuItem>
                <MenuItem value="regional">regional</MenuItem>
                <MenuItem value="brewpub">brewpub</MenuItem>
                <MenuItem value="large">large</MenuItem>
                <MenuItem value="planning">planning</MenuItem>
                <MenuItem value="bar">bar</MenuItem>
                <MenuItem value="contract">contract</MenuItem>
                <MenuItem value="proprietor">proprietor</MenuItem>
                <MenuItem value="closed">closed</MenuItem>
              </Select>
            </FormControl>
            </div>

            <div className={styles.sortFormControlWrapper}>
              <FormControl fullWidth>
                <InputLabel id="filter-sort-select-label">Sort</InputLabel>
                <Select
                  labelId="filter-sort-select-label"
                  id="filter-sort-select"
                  value={listFilter.sort}
                  label="Sort"
                  onChange={(event) => onSelectFieldChange(event, 'sort')}
                  data-cy="filter-sort-select"
                >
                  <MenuItem value="asc">ASC</MenuItem>
                  <MenuItem value="desc">DESC</MenuItem>
                </Select>
              </FormControl>
            </div>

            <IconButton onClick={onFilterClear} data-cy="filter-clear-btn">
              <Clear/>
            </IconButton>
          </div>
          <List>
            {beerList.map((beer) => {
              const secondaryTitle = [beer.brewery_type, beer.city, beer.state, beer.postal_code].join(' · ');
              return (
                <ListItemButton
                  key={beer.id}
                  onClick={onBeerClick.bind(this, beer.id)}
                  data-cy="beer-list-item-btn"
                >
                  <ListItemAvatar>
                    <Avatar>
                      <SportsBar/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={beer.name} secondary={secondaryTitle}/>
                </ListItemButton>
              )
            })}
          </List>
          <div className={styles.listFooter}>
            <Pagination
              count={pageCount}
              onChange={onPageChange}
              data-cy="beer-list-pagination" />
          </div>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
