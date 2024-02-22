import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const TopBar = (props: Props) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          V
        </Typography>
      </Toolbar>
    </AppBar>
    );
  }

export default TopBar;
